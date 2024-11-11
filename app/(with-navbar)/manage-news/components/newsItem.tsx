import Image, { StaticImageData } from "next/image";
import styles from "./newsItem.module.scss";
import Button from "@/components/button/button";
import featuresBg from "@assets/images/features_background.webp";
import { useEffect, useState } from "react";
import { deleteNews, deleteNewsPhoto, updateNewsPhoto } from "@/lib/api";
import toast from "react-hot-toast";
import ProjectImage from "../../project/[id]/components/projectImage/projectImage";

type NewsProps = {
  id: number;
  imageSrc: StaticImageData;
  newspaper: string;
  title: string;
  description: string;
  onButtonClick: () => void;
};

export default function News(news: NewsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectImage, setProfileImage] = useState(featuresBg.src);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (news && news.imageSrc) {
        setProfileImage(`https://elbucke.s3.us-east-1.amazonaws.com/news/${news.imageSrc}`);
        }
    }, [news]);

    const editModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setPreviewImage(null);
        setSelectedFile(null);
    }


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const validImageTypes = ['image/jpeg', 'image/png'];
        const maxSizeInMB = 5;

        if (file) {
            if (!validImageTypes.includes(file.type)) {
                toast('Por favor, selecciona un archivo de imagen válido (JPG, PNG).');
                return;
            }

            if (file.size > maxSizeInMB * 1024 * 1024) {
                toast('El archivo debe ser de un tamaño máximo de 5MB.');
                return;
            }

            setSelectedFile(file);
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };

    const handleConfirmImage = async (id: number) => {
        if (selectedFile) {
            const uploadURL = await updateNewsPhoto(id);
            console.log(uploadURL);
            
            if (!uploadURL) {
                console.error("Failed to get upload URL");
                return;
            }

            try {
                const response = await fetch(uploadURL, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': selectedFile.type,
                    },
                    body: selectedFile,
                });

                if (!response.ok) {
                    throw new Error('Failed to upload image');
                }


                setProfileImage(uploadURL.substring(0, uploadURL.indexOf('?')));
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
        setIsModalOpen(false);
        window.location.reload();
    };

    const handleEraseImage = async(id: number) => {
        await deleteNewsPhoto(id);
        setProfileImage("/placeholder.png");
        setIsModalOpen(false);
        setPreviewImage(null);
        setSelectedFile(null);
        window.location.reload();
    }

    const handleDelete = async (id: number) => {
        await deleteNews(id);
        window.location.reload();
    };

  const { id, imageSrc, newspaper, title, description, onButtonClick } = news;

  return (
    <div
      className={styles.container}>
      <div className={styles.topSide}>
        <Image src={projectImage} alt={"image"} className={styles.image} width={featuresBg.width} height={featuresBg.height} />
      </div>
      <div className={styles.bottomSide}>
        <div className={styles.newspaper}>
          <p>{newspaper}</p>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttonContainer}>
            <Button variant={"custom"} size={"sm"} onClick={editModal}>
                Manejo Imagen
            </Button>
            <Button variant={"custom"} size={"sm"} onClick={() => handleDelete(news.id)}>
                Borrar
            </Button>
            <Button variant={"custom"} size={"sm"} onClick={onButtonClick}>
                Leer más
            </Button>
        </div>
      </div>

      {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Editar Perfil</h3>
                        <div className={styles.profileContainer}>
                            {previewImage ? (
                                <ProjectImage src={previewImage} width={400} height={150} />
                            ) : (
                                <ProjectImage src={projectImage} width={400} height={150} />
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <div className={styles.buttonContainer}>
                            <Button onClick={(event) => handleConfirmImage(id)}>Confirmar</Button>
                            <Button variant={'tertiary'} onClick={closeModal}>Cancelar</Button>
                            <Button variant={'secondary'} onClick={(event) => handleEraseImage(id)}>Borrar Imagen</Button>
                        </div>
                    </div>
                </div>
            )}
    </div>
  );
}

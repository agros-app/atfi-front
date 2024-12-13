import Image from "next/image";
import styles from "./header.module.scss";
import projectBackgroundImage from "@assets/images/project/project_background.webp"
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Button from "@/components/button/button";
import { deleteProjectPhoto, updateProjectPhoto } from "@/lib/api";
import ProjectImage from "../projectImage/projectImage";
import Status from "@/app/(with-navbar)/project/[id]/components/status/status";

export default function Header({id, name, country, photoURL, isProducer, status}: {id: number, name: string ,country: string, photoURL?: string, isProducer: boolean, status: string}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectImage, setProfileImage] = useState(projectBackgroundImage.src);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (photoURL) {
        setProfileImage(`https://elbucke.s3.us-east-1.amazonaws.com/location/${photoURL}`);
    }
  }, [photoURL]);

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


  const handleConfirmImage = async () => {
    if (selectedFile) {
        if (photoURL) await deleteProjectPhoto(id, photoURL);
        const uploadURL = await updateProjectPhoto(id);
        
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

  const handleEraseImage = async() => {
      if (photoURL) await deleteProjectPhoto(id, photoURL);
      setProfileImage("/placeholder.png");
      setIsModalOpen(false);
      setPreviewImage(null);
      setSelectedFile(null);
      window.location.reload();
  }

    return (
      <div className={styles.header}>
          <Image className={styles.image} src={projectImage} width={projectBackgroundImage.width} height={projectBackgroundImage.height} alt="Farm Image" />
          <div className={styles.textInTitle}>
              <p className={styles.title}>{name}</p>
              <p className={styles.subtitle}>{country}</p>
              <Status status={status} />
              {isProducer && <Button onClick={editModal} className={styles.editButton}>Editar</Button>}
          </div>
          {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Editar Foto Proyecto</h3>
                        <div className={styles.profileContainer}>
                            {previewImage ? (
                                <ProjectImage src={previewImage} width={400} height={150}/>
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
                            <Button onClick={handleConfirmImage}>Confirmar</Button>
                            <Button variant={'tertiary'} onClick={closeModal}>Cancelar</Button>
                            <Button variant={'secondary'} onClick={handleEraseImage}>Borrar Imagen</Button>
                        </div>
                    </div>
                </div>
            )}
      </div>
    );
  }
import DocumentCard from '../documentCard/documentCard';
import styles from './documents.module.scss';
import TitleWithLine from "@/app/(with-navbar)/project/[id]/components/titleWithLine/titleWithLine";

export default function Documents() {
    const documents = [
        { title: "Asuntos legales", description: "Sobre asuntos legales del proyecto" },
        { title: "Asuntos legales", description: "Sobre asuntos legales del proyecto" },
        { title: "Asuntos legales", description: "Sobre asuntos legales del proyecto" },
        { title: "Asuntos legales", description: "Sobre asuntos legales del proyecto" }
    ];

    return(
        <div>
            <TitleWithLine>Documentación</TitleWithLine>
            <div className={styles.documentsContainer}>
                {documents.map((doc, index) => (
                    <DocumentCard key={index} title={doc.title} description={doc.description} />
                ))}
            </div>
        </div>
    )
}
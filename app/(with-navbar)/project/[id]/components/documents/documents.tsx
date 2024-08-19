import DocumentCard from '../documentCard/documentCard'
import styles from './documents.module.scss'

export default function Documents() {
  const documents = [
    {
      title: 'Asuntos legales',
      description: 'Sobre asuntos legales del proyecto'
    },
    {
      title: 'Asuntos legales',
      description: 'Sobre asuntos legales del proyecto'
    },
    {
      title: 'Asuntos legales',
      description: 'Sobre asuntos legales del proyecto'
    },
    {
      title: 'Asuntos legales',
      description: 'Sobre asuntos legales del proyecto'
    }
  ]

  return (
    <div>
      <h1 className={styles.title}>Documentación</h1>
      <div className={styles.documentsContainer}>
        {documents.map((doc, index) => (
          <DocumentCard
            key={index}
            title={doc.title}
            description={doc.description}
          />
        ))}
      </div>
    </div>
  )
}

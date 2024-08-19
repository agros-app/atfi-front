import styles from './hero.module.scss'
import HeroImage from '@/app/(landing)/investor/agriculture/components/hero_image/hero_image'
import Button from '@/components/button/button'

export default function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.screenDivision}>
        <div className={styles.leftHandSide}>
          <div>
            <div className={styles.tagContainer}>
              <p className={styles.tag}>INVERSORES</p>
            </div>
            <h1 className={styles.heading}>
              Financiá y participá en proyectos agro
              <span> innovadores</span>
            </h1>
            <p className={styles.text}>
              Seleccioná la oportunidad de inversión que mejor se adapte a tus
              objetivos financieros y estrategias de inversión. Con una interfaz
              intuitiva y fácil de usar, invertir en el sector agro nunca ha
              sido tan accesible.
            </p>
            <div className={styles.buttonContainer}>
              <Button className={styles.button}>Invertir</Button>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <HeroImage />
        </div>
      </div>
    </div>
  )
}

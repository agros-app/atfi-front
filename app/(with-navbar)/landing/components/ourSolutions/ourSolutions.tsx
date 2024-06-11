import Solution from '../solution/solution'
import styles from './ourSolutions.module.scss'

export default function OurSolutions(){
    return(
        <section className={styles.container}>
            <h1 className={styles.title}>Nuestras Soluciones</h1>
            <div className={styles.solutions} >
                <Solution title={"Inversores"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor, ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur."}/>
                <Solution title={"Productores"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor, ut labore et dolore magna aliqua."}/>
            </div>
        </section>
    )
}
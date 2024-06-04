import styles from './ourSolutions.module.scss'
import Solution from "@/components/solution/solution";

export default function OurSolutions(){
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Nuestras Soluciones</h1>
            <div className={styles.solutions} >
                <Solution title={"Inversores"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor, ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur."}/>
                <Solution title={"Productores"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor, ut labore et dolore magna aliqua."}/>
            </div>
        </div>
    )
}
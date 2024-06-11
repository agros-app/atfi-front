import styles from './project.module.scss';
import FarmImage from "@/app/(with-navbar)/project/components/farmImage/farmImage";
import FinancialInfo from "@/app/(with-navbar)/project/components/financialInfo/financialInfo";
import About from "@/app/(with-navbar)/project/components/about/about";
import Map from "@/app/(with-navbar)/project/components/map/map";
import Producer from "@/app/(with-navbar)/project/components/producer/producer";

export default function Project() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <span className={styles.name}>Valle Verde</span>
                <span className={styles.city}>, Montevideo</span>
            </h1>
            <div className={styles.content}>
                    <div className={styles.leftHandSide}>
                        <div className={styles.component}>
                            <FarmImage />
                        </div>
                        <div className={styles.component}>
                            <About />
                        </div>
                        <div className={styles.component}>
                            <Map />
                        </div>
                    </div>
                    <div className={styles.rightHandSide}>
                        <div className={styles.component}>
                            <FinancialInfo />
                        </div>
                        <div className={styles.component}>
                            <Producer />
                        </div>
                    </div>
            </div>
            <div>*Esto es solo un estimado hacho por ATFI que blah balh lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim
            </div>

        </div>
    );
}

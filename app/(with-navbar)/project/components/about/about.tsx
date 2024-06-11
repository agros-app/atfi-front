import styles from './about.module.scss';
import Title from "@/app/(with-navbar)/project/components/title/title";
import BulletIcon from "@/app/(with-navbar)/project/components/bulletIcon/bulletIcon";
import calendar from "../../../../../assets/icons/calendar.png";
import wheat from "../../../../../assets/icons/wheat.png";
import soy from "../../../../../assets/icons/soy.png";
import size from "../../../../../assets/icons/size.png";
import location from "../../../../../assets/icons/location.png";
import TextIndexComponent from "@/app/(with-navbar)/project/components/TextIndexComponent/textIndexComponent";


// This one should be much, much nicer
export default function About() {
  return (
    <div className={styles.container}>
        <Title>Detalles</Title>
        <div className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.</div>
        <div className={styles.dataContainer}>
            <div className={styles.leftHandSide}>
                <div className={styles.dataGroup}>
                    <BulletIcon icon={calendar.src} subtext={"20 de Marzo de 2024"}>Fecha límite: </BulletIcon>
                    <div className={styles.subdata}>
                        <TextIndexComponent text={"25 días"} percentage={"restantes"}variant={"secondary"} ></TextIndexComponent>
                    </div>
                </div>
                <div className={styles.dataGroup}>
                    <BulletIcon icon={wheat.src} subtext={"12 de Abril de 2025"}>Fin Esperado: </BulletIcon>
                    <div className={styles.subdata}>
                        <TextIndexComponent text={"350 días"} percentage={"totales"}variant={"secondary"} ></TextIndexComponent>
                    </div>
                </div>
            </div>
            <div className={styles.rightHandSide}>
                <BulletIcon icon={soy.src}>Soja</BulletIcon>
                <BulletIcon icon={size.src} subtext={"totales"}>25ha </BulletIcon>
                <BulletIcon icon={location.src}>Montevideo</BulletIcon>
            </div>
        </div>
    </div>
  );
}
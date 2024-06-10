"use client";
import Image from "next/image";
import styles from "./projectCard.module.scss";
import Button from "@/components/button/button";
import { useRouter } from "next/navigation";

export default function ProjectCard() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.leftHandSide}>
        <Image
          src={"/farm-image.png"}
          alt="Farm Image"
          fill
          priority
          sizes="100%"
        />
      </div>
      <div className={styles.rightHandSide}>
        <p className={styles.title}>Villa Verde</p>

        <ul className={styles.leaders}>
          <li>
            <span>Tipo de cosecha</span>
            <span>Soja</span>
          </li>
          <li>
            <span>Ubicación</span>
            <span>Argentina</span>
          </li>
          <li>
            <span>Finaliza en</span>
            <span>2 días</span>
          </li>
        </ul>

        <p className={styles.collected}>Recaudado: $500.000</p>
        <div className={styles.progressBarOutside}>
          <div className={styles.progressBarInside} />
        </div>
        <div className={styles.goal}>
          <div className={styles.goalLeftHandSide}>
            <p className={styles.percentage}>50%</p>
          </div>
          <div className={styles.goalRightHandSide}>
            <p className={styles.expected}>Meta: $500.000</p>
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            variant="outlined"
            size="sm"
            fill
            onClick={() => router.push("/project/1")}
          >
            Detalles
          </Button>
          {/* <Button variant="primary" size="sm" fill>
            Invertir
          </Button> */}
        </div>
      </div>
    </div>
  );
}

//import styles from './projectCard.module.scss';
// import image from '@/assets/Images/farm-image.png';
// import Button from "@/components/button/button";
// import {useEffect} from "react";
//
//
// type ProjectCardProps = {
//     // image: string;
//     title: string;
//     harvestType: string;
//     location: string;
//     endsDate?: Date;
//     collected: number;
//     goal: number;
//     width?: number;
// }
//
//
// export default function ProjectCard(
//     {
//         // image,
//         title,
//         harvestType,
//         location,
//         endsDate,
//         collected,
//         goal,
//         width = 40
//     }: ProjectCardProps){
//     // TODO: date part, correct buttons (pull Emi's changes), responsiveness correctly, the image desapeared
//
//     function formatNumber(number: number){
//         return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//     }
//
//     function persentage(){
//         return (collected/goal)*100;
//     }
//
//     // if the screen size is less than 500px, the width will be 100%
//     function calculateWidth(){
//         // if(window.innerWidth < 500){
//         //     return 100;
//         // }
//         if (width > 100 || width < 0){
//             return 100;
//         } else {
//             return width;
//         }
//     }
//
//     function calculateHeight(){
//         return width*0.48;
//     }
//     return (
//         <div className={styles.container}>
//             <div className={styles.leftHandSide}>
//                 <img src={image.src} alt="Farm Image" className={styles.image} ></img>
//             </div>
//             <div className={styles.rightHandSide}>
//                 <p className={styles.title}>{title}</p>
//
//                 <ul className={styles.leaders}>
//                     <li>
//                         <span>Tipo de cosecha</span>
//                         <span>{harvestType}</span>
//                     </li>
//                     <li>
//                         <span>Ubicación</span>
//                         <span>{location}</span>
//                     </li>
//                     <li>
//                         <span>Finaliza en</span>
//                         <span>2 días</span>
//                     </li>
//                 </ul>
//
//                 <p className={styles.collected}>Recaudado: ${formatNumber(collected)}</p>
//                 <div className={styles.progressBarOutside}>
//                     <div className={styles.progressBarInside} style={{width: `${persentage()}%`}} />
//                 </div>
//                 <div className={styles.goal}>
//                     <div className={styles.goalLeftHandSide}>
//                         <p className={styles.percentage}>{persentage()}%</p>
//                     </div>
//                     <div className={styles.goalRightHandSide}>
//                         <p className={styles.expected}>Meta: ${formatNumber(goal)}</p>
//                     </div>
//                 </div>
//                 <div className={styles.buttons}>
//                     <Button variant="outlined" >Detalles</Button>
//                     <Button variant="primary" size={"md"}>Invertir</Button>
//                 </div>
//
//             </div>
//         </div>
//     );
// }
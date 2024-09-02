"use client";  // Agrega esta línea al principio del archivo

import styles from "./sideBar.module.scss";
import CategoryButton from "@/app/(with-navbar)/profile/components/categoryButton/categoryButton";
import {useState} from "react";

export default function SideBar(){

    const [selected, setSelected] = useState("info")

    const handleButtonClick = (category: string) => {
        setSelected(category);
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.categories}>
                <CategoryButton
                    isSelected={selected === "info"}
                    imagePath={selected === "info" ? "/profile/id-card-bold.png" : "/profile/id-card.png"}
                    name={"Información Personal"}
                    onClick={() => handleButtonClick("info")}
                    iconSize={"25px"}
                />

                <CategoryButton
                    isSelected={selected === "data"}
                    imagePath={selected === "data" ? "/profile/switch-bold.png" : "/profile/switch.png"}
                    name={"Data y Privacidad"}
                    onClick={() => handleButtonClick("data")}
                    iconSize={"15px"}
                />
                <CategoryButton
                    isSelected={selected === "seguridad"}
                    imagePath={selected === "seguridad" ? "/profile/lock.png" : "/profile/lock-bold.png"}
                    name={"Seguridad"}
                    onClick={() => handleButtonClick("seguridad")}
                    iconSize={"25px"}
                />
                <CategoryButton
                    isSelected={selected === "metodos"}
                    imagePath={selected === "metodos" ? "/profile/add-card.png" : "/profile/add-card.png"}
                    name={"Métodos de Pago"}
                    onClick={() => handleButtonClick("metodos")}
                    iconSize={"25px"}
                />
            </div>
        </div>
    )
}
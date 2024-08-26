"use client";  // Agrega esta línea al principio del archivo

import styles from "./sideBar.module.scss";
import CategoryButton from "@/app/(with-navbar)/profile/[id]/components/categoryButton/categoryButton";
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
                    imagePath={"/profile/DNI_icon.png"}
                    name={"Información Personal"}
                    onClick={() => handleButtonClick("info")}
                />
                <CategoryButton
                    isSelected={selected === "data"}
                    imagePath={"/profile/on_icon.png"}
                    name={"Data y Privacidad"}
                    onClick={() => handleButtonClick("data")}
                />
                <CategoryButton
                    isSelected={selected === "seguridad"}
                    imagePath={"/profile/lock_icon.png"}
                    name={"Seguridad"}
                    onClick={() => handleButtonClick("seguridad")}
                />
                <CategoryButton
                    isSelected={selected === "metodos"}
                    imagePath={"/profile/credit_card_icon.png"}
                    name={"Métodos de Pago"}
                    onClick={() => handleButtonClick("metodos")}
                />
            </div>
        </div>
    )
}
"use client"
import ProjectCard from "@/components/projectCard/projectCard";
import styles from "./page.module.scss"
import {useState} from "react";
import useUserProjects from "@/hooks/useUserProjects";
import {useRouter} from "next/navigation";
import ProducerProjects from "@/components/producerProjects/page";

export default function ProducerPage() {

    return (
        <div className={styles.main}>
            <ProducerProjects />
        </div>
    )
}
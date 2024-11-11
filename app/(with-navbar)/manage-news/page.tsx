"use client";
import { getNews } from "@/lib/api";
import { useEffect, useState } from "react";
import News from "@/components/news/news";
import Link from "next/link";
import styles from "./page.module.scss";
import Modal from "./components/modal";
import SubmitNewsForm from "./components/submitNewsForm";
import NewsItem from "./components/newsItem";

export default function ManageNewsPage() {
    const [news, setNews] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await getNews();
                const newsData = response.map((newsItem: any) => ({
                    id: newsItem.id,
                    title: newsItem.title,
                    description: newsItem.description,
                    imageSrc: newsItem.photoURL,
                    newspaper: newsItem.resource,
                    onButtonClick: () => window.location.href = newsItem.reference,
                }));
                setNews(newsData);
            } catch (error) {
                console.error("Failed to fetch news data:", error);
            }
        };
    
        fetchNews();
    }, []);

    return (
        <main className={styles.main}>
            <section className={styles.header}>
                <h3 className={styles.section_title}>Manejo Noticias</h3>
                <button onClick={() => setIsModalOpen(true)} className={styles.postButton}>Crear Noticia</button>
            </section>
            
            <div className={styles.newsList}>
                {news.map((newsItem) => (
                    <NewsItem {...newsItem} key={newsItem.id} />
                ))}
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <SubmitNewsForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </main>
    );
}

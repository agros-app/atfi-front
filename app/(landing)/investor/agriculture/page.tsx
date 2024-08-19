import AgricultureNavBar from "@/app/(landing)/agriculture/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import ContactForm from "@/app/(landing)/investor/agriculture/components/contact_section/contact_section";
import Hero from "@/app/(landing)/investor/agriculture/components/hero/hero";
import SampleProjects from "@/app/(landing)/investor/agriculture/components/sample_projects/sample_projects";
import styles from "./page.module.scss";

export default function Page() {
    return (
        <>
            <AgricultureNavBar />
            <main className={styles.main}>
                <Hero />
                <SampleProjects />
                <ContactForm />
            </main>
            <Footer />
        </>
    );
}
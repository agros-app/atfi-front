import AgricultureNavBar from "@/app/(landing)/agriculture/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import ContactForm from "@/app/(landing)/investor/agriculture/components/contact_section/contact_section";
import Hero from "@/app/(landing)/investor/agriculture/components/hero/hero";
import SampleProjects from "@/app/(landing)/investor/agriculture/components/sample_projects/sample_projects";


export default function Page() {
    return (
        <>
            <AgricultureNavBar />
            <main>
                <Hero />
                <SampleProjects />
                <ContactForm />
            </main>
            <Footer />
        </>
    );
}
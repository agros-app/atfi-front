import LandingNavBar from "@/app/(landing)/components/navbar/landingNavbar";
import VideoSection from "@/app/(landing)/components/video_section/videoSection";
import Whatsapp from "@/components/whatsapp/whatsapp";
import Footer from "@/components/footer/footer";
import Hero from "@/app/(landing)/agriculture/components/hero/hero";
import FeatureSection from "@/app/(landing)/agriculture/components/feature_section/featureSection";
import ContactForm from "@/app/(landing)/agriculture/components/contact_section/contact_section";
import AlternativeNavbar from "@/app/(landing)/components/alternativeNavbar/navbar";

export default function Page() {
    return (
        <>
            <AlternativeNavbar />
            <main>
                <Hero />
                <FeatureSection />
                <ContactForm />
                <Whatsapp />
            </main>
            <Footer />
        </>
    );
}
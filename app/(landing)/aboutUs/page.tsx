import styles from "@/app/(landing)/investor/agriculture/page.module.scss";
import Footer from "@/components/footer/footer";
import LandingNavBar from "@/app/(landing)/components/navbar/landingNavbar";
import RotatingBanner from "@/app/(landing)/aboutUs/components/rotatingBanner/page";
import Values from "@/app/(landing)/aboutUs/components/values/values";
import AboutUs from "@/app/(landing)/aboutUs/components/about_us_section/aboutUs";

export default function AboutUsPage() {
    return (
        <>
            <LandingNavBar />
            <main className={styles.main}>
                <RotatingBanner />
                <Values />
                <AboutUs />
            </main>
            <Footer />
        </>
    );
}

import NavBar from "@/components/navbar/navbar";
import LandingImage from "@/app/landing/components/landingImage/landingImage";
import Whatsapp from "@/components/whatsapp/whatsapp";
import HowItWorks from "@/app/landing/components/howItWorks/howItWorks";
import OurSolutions from "@/app/landing/components/ourSolutions/ourSolutions";
import AboutUs from "@/app/landing/components/aboutUs/aboutUs";

export default function LandingPage() {
    return (
        <>
            <main>
                <LandingImage />
                <HowItWorks />
                <OurSolutions />
                <AboutUs />
                <Whatsapp />
                {/*<ProjectCard title={"Valle Verde"} harvestType={"Soja"} location={"Tres Arroyos"} collected={500000} goal={1000000} />*/}
            </main>
        </>
    );
}

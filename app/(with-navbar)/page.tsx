import NavBar from "@/components/navbar/navbar";
import Whatsapp from "@/components/whatsapp/whatsapp";
import LandingImage from "./landing/components/landingImage/landingImage";
import HowItWorks from "./landing/components/howItWorks/howItWorks";
import OurSolutions from "./landing/components/ourSolutions/ourSolutions";
import AboutUs from "./landing/components/aboutUs/aboutUs";

export default function Home() {
  return (
    <main>
      <LandingImage />
      <HowItWorks />
      <OurSolutions />  
      <AboutUs />
      <Whatsapp />
    </main>
  );
}

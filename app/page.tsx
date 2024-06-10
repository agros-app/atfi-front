import NavBar from "@/components/navbar/navbar";
import LandingImage from "@/components/landingImage/landingImage";
import Whatsapp from "@/components/whatsapp/whatsapp";
import HowItWorks from "@/components/howItWorks/howItWorks";
import OurSolutions from "@/components/ourSolutions/ourSolutions";
import AboutUs from "@/components/aboutUs/aboutUs";

export default function Home() {
  return (
    <>
      {/* TEMPORARY */}
      <NavBar />
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

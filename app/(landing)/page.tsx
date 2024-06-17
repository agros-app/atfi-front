import Whatsapp from "@/components/whatsapp/whatsapp";
import LandingNavBar from "./components/navbar/landingNavbar";
import VideoSection from "./components/video_section/videoSection";
import FeatureSection from "./components/feature_section/featureSection";
import HowItWorksSection from "./components/how_it_works_section/howItWorks";
import OurSolutionsSection from "./components/our_solutions_section/ourSolutions";
import AboutUs from "./components/about_us_section/aboutUs";

export default function Home() {
  return (
    <>
      <LandingNavBar />
      <main>
        <VideoSection />
        <FeatureSection />
        <HowItWorksSection />
        <OurSolutionsSection />
        <AboutUs />
        <Whatsapp />
      </main>
    </>
  );
}

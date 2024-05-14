import NavBar from "@/components/navbar/navbar";
import LandingCard from "@/components/landingCard/landingCard";
import seedling from "@/assets/iconsPng/seedling.png";
export default function Home() {
  return (
    <>
      {/* TEMPORARY */}
      <NavBar />
      <main>
        <h1>atfi</h1>
              <LandingCard
                  icon={seedling.src}
                  title={"Explorá"}
                  description={"En nuestra plataforma encontrarás diversas oportunidades de inversión disponibles."}
              ></LandingCard>
      </main>
    </>
  );
}

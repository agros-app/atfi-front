"use client";
import NavBar from "@/components/navbar/navbar";
import WalletConnect from "@/components/walletConnect/WalletConnect";
import {ProjectCard} from "@/components/projectCard/projectCard";
const image = "https://s3-alpha-sig.figma.com/img/9f59/ce21/c74ad96c0d1a61ac9fa97f6caef4341c?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yei1q7fbh8SiMNZSKFg53FuoxRBPlS2JQ8FRORX17f8wO4pfP3ykn9MtSpl7HcsagUijwckyNxywwglxMPxzhq9iZ1MRHGVHA0oM~bCxbptinX7HRSPXwb8iJGC~hFnB4bvc25IHw10cR~YSstl1qWKZ-SljxordAmfXNM8TSmLY6-IUOZv1wPmZq08-4~v2WeX1dMQ4lc5M73C1vU~ClGP06djwTIeURLtkRwOjB1PGzhRbRH231XL-huIhBpsG3u2Rk3~LAzflBRMOep8wq3y-MB-S-WsG~s6zylgNVw2KvCpVXGXizUnB3LIsLLTGKyh6f5M6DXHP3~1rJ5rdKQ__"

export default function Home() {
  return (
    <>
      {/* TEMPORARY */}
      <NavBar />
      <main style={{padding: '16px'}}>
          <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
              <ProjectCard
                    image={image}
                    title="Valle de la Luna"
                    harvestType="Maiz"
                    location="Argentina, Buenos Aires"
                    endsIn="20 días"
                    requiredAmount="1.000.000"
                    raisedAmount="500.000"
              />
          </div>
      </main>
    </>
  );
}

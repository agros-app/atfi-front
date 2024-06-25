"use client";
import GoogleLogo from "@/assets/icons/google";
import TwitterLogo from "@/assets/icons/twitter";
import Button from "@/components/button/button";
import styles from "./services.module.scss";
import { signIn } from "next-auth/react";

export default function Services() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn("google", { callbackUrl: "/home" });
  };

  return (
    <div className={styles.buttonsContainer}>
      <Button variant="custom" className={styles.google} onClick={handleClick}>
        Ingresá con <GoogleLogo />
      </Button>
      <Button variant="custom" className={styles.twitter} onClick={handleClick}>
        Ingresá con <TwitterLogo />
      </Button>
    </div>
  );
}

"use client";
import GoogleLogo from "@/assets/icons/google";
import TwitterLogo from "@/assets/icons/twitter";
import Button from "@/components/button/button";
import styles from "./services.module.scss";
import { AuthProvider } from "firebase/auth";
import { authUser, googleProvider, twitterProvider } from "@/lib/firebaseAuth";

export default function Services() {
  const signIn = async (provider: AuthProvider) => {
    const user = await authUser(provider);
    console.log(user);
  };
  return (
    <div className={styles.buttonsContainer}>
      <Button
        variant="custom"
        className={styles.google}
        onClick={(e) => {
          e.preventDefault();
          signIn(googleProvider);
        }}
      >
        Ingresá con <GoogleLogo />
      </Button>
      <Button
        variant="custom"
        className={styles.twitter}
        onClick={(e) => {
          e.preventDefault();
          signIn(twitterProvider);
        }}
      >
        Ingresá con <TwitterLogo />
      </Button>
    </div>
  );
}

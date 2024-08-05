"use client";
import GoogleLogo from "@/assets/icons/google";
import TwitterLogo from "@/assets/icons/twitter";
import Button from "@/components/button/button";
import styles from "./services.module.scss";
import { AuthProvider } from "firebase/auth";
import { authUser, googleProvider, twitterProvider } from "@/lib/firebaseAuth";

export default function Services() {
  const signIn = async (provider: AuthProvider) => {
      //TODO: Fix this to integrate with google provider
    const user = await authUser(provider);
    if (!user) return;
    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }),
    });
    if (!response.ok) {
      console.error("Failed to sign in", response);
      return;
    }
    window.location.replace("/home");
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

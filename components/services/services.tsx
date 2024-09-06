"use client";
import GoogleLogo from "@/assets/icons/google";
import Button from "@/components/button/button";
import styles from "./services.module.scss";
import {useRouter} from "next/navigation";

export default function Services() {
    const router = useRouter();
    const signInWithGoogle = async () => {
        router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/google`);
    };
    return (
        <div className={styles.buttonsContainer}>
            <Button
                variant="custom"
                className={styles.google}
                onClick={(e) => {
                    e.preventDefault();
                    signInWithGoogle();
                }}
            >
                Ingresá con <GoogleLogo />
            </Button>
            {/*<Button*/}
            {/*    variant="custom"*/}
            {/*    className={styles.twitter}*/}
            {/*    onClick={(e) => {*/}
            {/*        e.preventDefault();*/}
            {/*        signIn(twitterProvider);*/}
            {/*    }}*/}
            {/*>*/}
            {/*    Ingresá con <TwitterLogo />*/}
            {/*</Button>*/}
        </div>
    );
}

import Image from "next/image";
import styles from "./auth.module.scss";
import authBackground from "@assets/images/auth_background.webp"
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
      <section className={styles.left}>{children}</section>
      <div className={styles.right}>
        <Image
          src={authBackground}
          alt="atfi login background"
          fill
          style={{ objectFit: "cover" }}
          sizes="100%"
        />
      </div>
    </main>
  );
}

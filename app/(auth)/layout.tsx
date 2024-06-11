import Image from "next/image";
import styles from "./auth.module.scss";
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
          src={"/auth/bg_auth.jpg"}
          alt="atfi login background"
          fill
          style={{ objectFit: "cover" }}
          sizes="100%"
        />
      </div>
    </main>
  );
}

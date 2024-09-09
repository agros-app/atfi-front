import React from "react";
import styles from "./profileImage.module.scss";
import Image from "next/image";

type ProfileImageProps = {
  src: string;
  size: number; // size in pixels
  grayFilter?: boolean;
};

export default function ProfileImage({
  src,
  size,
  grayFilter = false,
}: ProfileImageProps) {
  return (
    <div
      className={styles.iconContainer}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        filter: grayFilter ? "grayscale(100%)" : "none",
      }}
    >
      <Image src={src} alt="Profile Icon" width={size} height={size}  className={styles.iconImage} />
    </div>
  );
}

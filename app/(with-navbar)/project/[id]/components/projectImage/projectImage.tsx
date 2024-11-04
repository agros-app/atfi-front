import React from "react";
import styles from "./projectImage.module.scss";
import Image from "next/image";

type ProjectImageProps = {
  src: string;
  width: number;
  height: number;
  grayFilter?: boolean;
};

export default function ProjectImage({
  src,
  width,
  height,
  grayFilter = false,
}: ProjectImageProps) {
  return (
    <div
      className={styles.iconContainer}
      style={{
        width: width,
        height: height,
        borderRadius: 0,
        filter: grayFilter ? "grayscale(100%)" : "none",
      }}
    >
      <Image
        src={src}
        alt="Project Icon"
        width={width}
        height={height}
        className={styles.iconImage}
      />
    </div>
  );
}

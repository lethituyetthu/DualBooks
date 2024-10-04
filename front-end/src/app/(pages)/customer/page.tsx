import React from "react";
import Image from "next/image";
import banner from "@/app/publics/banner/banner.png";

import styles from '@/app/(pages)/customer/style.module.css'
import Category from "./component/category/category";

export default function page() {
  return (
    <div>
      <div className={styles.bannerContainer}>
        <Image src={banner} className={styles.bannerImg} alt="banner anh" />
        <button className={`${styles.bannerBtn} bg-primary-400 hover:bg-primary-200`}>xem ngay</button>
      </div>
      <Category/>
    </div>
  );
}
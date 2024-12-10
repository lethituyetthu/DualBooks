import React from "react";
import Image from "next/image";
import banner from "@/app/publics/banner/banner.png";
import bannerHot from "@/app/publics/banner/bannerHot.png";

import styles from '@/app/(pages)/customer/style.module.css'
import Category from "./component/category";
import NewBooks from "./component/NewBooks";
import HotBooks from "./component/HotBooks";


export default function page() {
  return (
    <div>
      <div className={styles.bannerContainer}>
        <Image src={banner} className={styles.bannerImg} alt="banner anh"/>
        <button className={`${styles.bannerBtn} bg-primary-400 hover:bg-primary-200 `}>Xem Ngay</button>
      </div>
      <Category/>
      <NewBooks/>
      <div className="max-w-[1200px] m-auto py-[90px]">
      <Image src={bannerHot} className={styles.bannerImg} alt="banner anh"/>
      <HotBooks/>
      </div>
    </div>
  );
}
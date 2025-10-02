"use client";
import React, { ReactNode, useRef } from "react";

// Components
import { Swiper, SwiperRef } from "swiper/react";

// Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./Slider.module.scss";

const Slider = ({ children }: { children: ReactNode }) => {
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <Swiper
      ref={swiperRef}
      className={styles.slider}
      loop={true}
      centeredSlides={true}
      breakpoints={{
        340: {
          slidesPerView: 1,
          spaceBetween: 22,
        },
        500: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        993: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      }}
    >
      {children}
    </Swiper>
  );
};

export default Slider;

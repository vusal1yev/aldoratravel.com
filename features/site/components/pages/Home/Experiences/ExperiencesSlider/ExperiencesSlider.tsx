"use client";
import React, { useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

// Components
import Image from "next/image";

// Images
import default__card from "@/features/site/assets/images/default__card.jpg";

// Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./ExperiencesSlider.module.scss";

const ExperiencesSlider = () => {
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div className={styles.experiences__slider}>
      <Swiper
        ref={swiperRef}
        className={styles.slider}
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 32,
          },
          500: {
            slidesPerView: 1.5,
            spaceBetween: 32,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 32,
          },
          993: {
            slidesPerView: 2.5,
            spaceBetween: 32,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
          1440: {
            slidesPerView: 3.5,
            spaceBetween: 32,
          },
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <SwiperSlide>
            <article className={styles.slider__card}>
              <div className={styles.slider__card__image}>
                <Image className={styles.image} src={default__card} alt="" />
              </div>
              <div className={styles.slider__card__content}>
                <p className={styles.description}>
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system and expound the actual
                  teachings of the great explorer of the truth, the master-
                  builder of human happiness.
                </p>
                <h3 className={styles.title}>John Doe</h3>
                <span className={styles.subtitle}>Accountant</span>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ExperiencesSlider;

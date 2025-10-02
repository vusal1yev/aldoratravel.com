"use client";
import React, { useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

// Components
import Image from "next/image";

// Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./GallerySlider.module.scss";
import { GalleryModel } from "@/models/gallery.model";

const GallerySlider = ({ gallery }: { gallery: GalleryModel[] }) => {
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div className={styles.gallery__slider}>
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
        {gallery.map((img, index) => (
          <SwiperSlide key={index} className={styles.slider__card}>
            <Image
              width={300}
              height={500}
              className={styles.slider__card__image}
              src={`${process.env.NEXT_PUBLIC_API_DOMAIN}/${img.imagePath}`}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GallerySlider;

"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Components
import Image from "next/image";

// Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./DestinationsSlider.module.scss";
import { DestinationModel } from "@/models/destination.model";
import { useParams } from "next/navigation";

const DestinationsSlider = ({
  destinations,
}: {
  destinations: DestinationModel[];
}) => {
  const params = useParams();

  return (
    <div className={styles.destination__slider}>
      <Swiper
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
        {destinations?.map((destination, index) => (
          <SwiperSlide key={`travel_${index}`}>
            <article className={styles.slider__card}>
              <Image
                width={400}
                height={500}
                className={styles.slider__card__image}
                src={`${process.env.NEXT_PUBLIC_API_DOMAIN}/${destination.imagePath}`}
                alt=""
              />
              <div className={styles.slider__card__content}>
                <h5 className={styles.title}>
                  {
                    destination[
                      `title_${params.lang}` as keyof DestinationModel
                    ]
                  }
                </h5>
                <p className={styles.subtitle}>
                  {
                    destination[
                      `country_${params.lang}` as keyof DestinationModel
                    ]
                  }
                  ,{" "}
                  {destination[`city_${params.lang}` as keyof DestinationModel]}
                </p>
              </div>
              <div className={styles.slider__card__overlay}></div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DestinationsSlider;

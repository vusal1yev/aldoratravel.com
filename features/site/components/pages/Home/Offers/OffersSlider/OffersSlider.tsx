"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Components
import Image from "next/image";
import Button from "@/features/site/components/shared/Button/Button";

// Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./OffersSlider.module.scss";
import { TourModel } from "@/models/tour.model";
import { useParams } from "next/navigation";

const OffersSlider = ({ tours }: { tours: TourModel[] }) => {
  const params = useParams();

  const handleWhatsApp = (tour: TourModel, lang: "tr" | "ru" | "en") => {
    let message = "";

    switch (lang) {
      case "tr":
        message = `Merhaba, ${tour[`title_${params.lang}` as keyof TourModel]} turu hakkında bilgi almak istiyorum.

  📍 Açıklama: ${tour[`description_${params.lang}` as keyof TourModel]}
  💰 Fiyat: ${tour[`price_${params.lang}` as keyof TourModel]} USD

  Bu tur için rezervasyon yapabilir miyim?`;
        break;

      case "ru":
        message = `Здравствуйте, я хотел(а) бы получить информацию о туре "${tour[`title_${params.lang}` as keyof TourModel]}".

  📍 Описание: ${tour[`description_${params.lang}` as keyof TourModel]}
  💰 Цена: ${tour[`price_${params.lang}` as keyof TourModel]} USD

  Могу ли я забронировать этот тур?`;
        break;

      case "en":
        message = `Hello, I would like to get information about the "${tour[`title_${params.lang}` as keyof TourModel]}" tour.

  📍 Description: ${tour[`description_${params.lang}` as keyof TourModel]}
  💰 Price: ${tour[`price_${params.lang}` as keyof TourModel]} USD

  Can I book this tour?`;
        break;
    }

    const phone = "994501234567";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className={styles.offers__slider}>
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
        {tours?.map((travel, index) => (
          <SwiperSlide key={index}>
            <article className={styles.slider__card}>
              <div className={styles.slider__card__image}>
                <Image
                  className={styles.image}
                  width={400}
                  height={500}
                  src={`${process.env.NEXT_PUBLIC_API_DOMAIN}/${travel.imagePath}`}
                  alt=""
                />
              </div>
              <div className={styles.slider__card__content}>
                <div>
                  <h3 className={styles.title}>
                    {travel[`title_${params.lang}` as keyof TourModel]}
                  </h3>
                  <p className={styles.description}>
                    {travel[`description_${params.lang}` as keyof TourModel]}
                  </p>
                </div>

                <div className={styles.tools}>
                  <p className={styles.price}>
                    {travel[`price_${params.lang}` as keyof TourModel]}
                  </p>
                  <Button
                    title={"Details"}
                    onClick={() => handleWhatsApp(travel, "en")}
                  />
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OffersSlider;

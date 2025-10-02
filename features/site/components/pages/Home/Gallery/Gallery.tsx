// Reacts
import React from "react";

// Types
import { JsonDataType } from "@/features/site/locales";

// Components
import SectionHead from "@/features/site/components/shared/SectionHead/SectionHead";
import GallerySlider from "@/features/site/components/pages/Home/Gallery/GallerySlider/GallerySlider";

// Styles
import styles from "./Gallery.module.scss";
import { getPopularGalleryRequest } from "@/services/gallery.service";
import { GalleryModel } from "@/models/gallery.model";

const Gallery = async ({ translate }: { translate: JsonDataType }) => {
  const { data, status } = await getPopularGalleryRequest();
  const gallery: GalleryModel[] = status === 200 ? data : [];

  return (
    <section id={"gallery"} className={styles.gallery}>
      <SectionHead
        title={translate.gallery.head.title}
        subtitle={translate.gallery.head.subtitle}
        changeSide={false}
      />

      <GallerySlider gallery={gallery} />
    </section>
  );
};

export default Gallery;

// Destinations.tsx
import React from "react";
import { JsonDataType } from "@/features/site/locales";
import { DestinationModel } from "@/models/destination.model";

// Components
import SectionHead from "@/features/site/components/shared/SectionHead/SectionHead";
import DestinationsSlider from "@/features/site/components/pages/Home/Destinations/DestinationsSlider/DestinationsSlider";

// Styles
import styles from "./Destinations.module.scss";

// Service
import { getPopularDestinationsRequest } from "@/services/destination.service";

const Destinations = async ({ translate }: { translate: JsonDataType }) => {
  const { data, status } = await getPopularDestinationsRequest();
  const destinations: DestinationModel[] = status === 200 ? data : [];

  return (
    <section id="destinations" className={styles.destinations}>
      <SectionHead
        title={translate.destinations.head.title}
        subtitle={translate.destinations.head.subtitle}
        changeSide={false}
      />

      <DestinationsSlider destinations={destinations} />
    </section>
  );
};

export default Destinations;

// Reacts
import React from "react";

// Types
import { JsonDataType } from "@/features/site/locales";

// Components
import SectionHead from "@/features/site/components/shared/SectionHead/SectionHead";
import ExperiencesSlider from "@/features/site/components/pages/Home/Experiences/ExperiencesSlider/ExperiencesSlider";

// Styles
import styles from "./Experiences.module.scss";

const Experiences = ({ translate }: { translate: JsonDataType }) => {
  return (
    <section id={"experiences"} className={styles.experiences}>
      <SectionHead
        title="Traveler’s Experiences"
        subtitle={"Here some awesome feedback from our travelers"}
        changeSide={true}
      />

      <ExperiencesSlider />
    </section>
  );
};

export default Experiences;

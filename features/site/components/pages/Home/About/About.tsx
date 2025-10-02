import React from "react";
import { JsonDataType } from "@/features/site/locales";

import styles from "./About.module.scss";
import SectionHead from "@/features/site/components/shared/SectionHead/SectionHead";
import Image from "next/image";
import about_image from "@/assets/images/about.jpg";

const About = ({ translate }: { translate: JsonDataType }) => {
  return (
    <section className={styles.about}>
      <SectionHead
        title={translate.about.head.title}
        subtitle={translate.about.head.subtitle}
        changeSide={true}
      />

      <div className={styles.content}>
        <div className={styles.image}>
          <Image src={about_image} alt={"About Image"} />
        </div>
        <div className={styles.text}>
          <h1 className={styles.title}>Beautiful Italy Let’s travel</h1>
        </div>
      </div>
    </section>
  );
};

export default About;

// Types
import { JsonDataType } from "@/features/site/locales";
import { TourModel } from "@/models/tour.model";

// Request
import { getPopularToursRequest } from "@/services/tour.service";

// Components
import SectionHead from "@/features/site/components/shared/SectionHead/SectionHead";
import OffersSlider from "@/features/site/components/pages/Home/Offers/OffersSlider/OffersSlider";

// Styles
import styles from "./Offers.module.scss";

const Offers = async ({ translate }: { translate: JsonDataType }) => {
  const { data, status } = await getPopularToursRequest();
  const travels: TourModel[] = status === 200 ? data : [];

  return (
    <section id={"offers"} className={styles.offers}>
      <SectionHead
        title={translate.offers.head.title}
        subtitle={translate.offers.head.subtitle}
        changeSide={true}
      />

      <OffersSlider tours={travels} />

      {/*<TravelPreviewModal*/}
      {/*  modalOpen={modal}*/}
      {/*  modalClose={() => {*/}
      {/*    setModal(false);*/}
      {/*  }}*/}
      {/*/>*/}
    </section>
  );
};

export default Offers;

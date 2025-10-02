import React, { FormEvent } from "react";
import Button from "@/features/admin/components/shared/Button/Button";
import { toast } from "react-toastify";
import Modal from "@/features/admin/components/shared/Modal/Modal";
import styles from "./TourDelete.module.scss";
import { TourModel } from "@/models/tour.model";
import { deleteTourRequest } from "@/services/tour.service";

const TourDelete = ({
  tour,
  modalClose,
}: {
  tour: TourModel;
  modalClose: (isRender: boolean) => void;
}) => {
  const deleteTour = async (event: FormEvent) => {
    event.preventDefault();

    const { status } = await deleteTourRequest(tour.id);

    if (status === 200) {
      modalClose(true);
      toast.success("Destination deleted!");
    } else toast.error("Destination deleted!");
  };

  return (
    <Modal
      title={"Destination Delete"}
      subtitle={"Destination Delete Subtitle"}
      modalClose={() => modalClose(false)}
    >
      <form onSubmit={deleteTour} className={styles.tour__delete}>
        <p>{tour.title_en} Delete ?</p>

        <div className={styles.buttons}>
          <Button
            text={"Cancel"}
            type={"button"}
            onClick={() => modalClose(false)}
          />

          <Button
            style={{ backgroundColor: "red" }}
            text={"Delete"}
            type={"submit"}
          />
        </div>
      </form>
    </Modal>
  );
};

export default TourDelete;

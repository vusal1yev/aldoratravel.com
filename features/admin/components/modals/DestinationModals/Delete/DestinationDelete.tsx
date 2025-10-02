import React, { FormEvent } from "react";
import Button from "@/features/admin/components/shared/Button/Button";
import { deleteDestinationRequest } from "@/services/destination.service";
import { toast } from "react-toastify";
import Modal from "@/features/admin/components/shared/Modal/Modal";
import { DestinationModel } from "@/models/destination.model";
import styles from "./DestinationDelete.module.scss";

const DestinationDelete = ({
  destination,
  modalClose,
}: {
  destination: DestinationModel;
  modalClose: (isRender: boolean) => void;
}) => {
  const deleteDestination = async (event: FormEvent) => {
    event.preventDefault();

    const { status } = await deleteDestinationRequest(destination.id);

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
      <form onSubmit={deleteDestination} className={styles.destination__delete}>
        <p>{destination.title_en} Delete ?</p>

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

export default DestinationDelete;

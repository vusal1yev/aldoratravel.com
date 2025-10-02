import React, { FormEvent } from "react";
import Button from "@/features/admin/components/shared/Button/Button";
import { toast } from "react-toastify";
import Modal from "@/features/admin/components/shared/Modal/Modal";
import styles from "./GalleryDelete.module.scss";
import { deleteGalleryRequest } from "@/services/gallery.service";
import { GalleryModel } from "@/models/gallery.model";

const GalleryDelete = ({
  gallery,
  modalClose,
}: {
  gallery: GalleryModel;
  modalClose: (isRender: boolean) => void;
}) => {
  const deleteGallery = async (event: FormEvent) => {
    event.preventDefault();

    const { status } = await deleteGalleryRequest(gallery.id);

    if (status === 200) {
      modalClose(true);
      toast.success("Gallery deleted!");
    } else toast.error("Gallery deleted!");
  };

  return (
    <Modal
      title={"Gallery Delete"}
      subtitle={"Gallery Delete Subtitle"}
      modalClose={() => modalClose(false)}
    >
      <form onSubmit={deleteGallery} className={styles.gallery__delete}>
        <p>Image Delete ?</p>

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

export default GalleryDelete;

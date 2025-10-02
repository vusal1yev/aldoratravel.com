import Modal from "@/features/admin/components/shared/Modal/Modal";
import styles from "./GalleryUpdate.module.scss";
import FileInput from "@/features/admin/components/shared/FileInput/FileInput";
import Button from "@/features/admin/components/shared/Button/Button";
import { FormEvent, useRef } from "react";
import { formCreator } from "@/libs/form";
import { toast } from "react-toastify";
import { GalleryModel } from "@/models/gallery.model";
import { updateGalleryRequest } from "@/services/gallery.service";

const GalleryUpdate = ({
  gallery,
  modalClose,
}: {
  gallery: GalleryModel;
  modalClose: (isRender: boolean) => void;
}) => {
  const updateGallery = async (event: FormEvent) => {
    event.preventDefault();
    const formData = formCreator([
      {
        name: "image",
        data: inputRefs.image.current?.files?.[0],
      },
    ]);

    const { status } = await updateGalleryRequest(formData, gallery.id);
    if (status === 200) {
      modalClose(true);
      toast.success("Gallery update successfully.");
    } else {
      modalClose(false);
      toast.error("Gallery update failed");
    }
  };

  const inputRefs = {
    name: useRef<HTMLInputElement | null>(null),
    location: useRef<HTMLInputElement | null>(null),
    image: useRef<HTMLInputElement | null>(null),
  };

  return (
    <Modal
      title={"Update Title"}
      subtitle={"Update subtitle"}
      modalClose={() => modalClose(false)}
    >
      <form onSubmit={updateGallery} className={styles.gallery__update}>
        <FileInput inputRef={inputRefs.image} />

        <div className={styles.buttons}>
          <Button
            text={"Cancel"}
            type={"button"}
            style={{ backgroundColor: "red" }}
            onClick={() => modalClose(false)}
          />
          <Button text={"Update"} type={"submit"} />
        </div>
      </form>
    </Modal>
  );
};

export default GalleryUpdate;

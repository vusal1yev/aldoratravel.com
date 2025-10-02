import Modal from "@/features/admin/components/shared/Modal/Modal";

import FileInput from "@/features/admin/components/shared/FileInput/FileInput";
import Button from "@/features/admin/components/shared/Button/Button";
import { FormEvent, useRef } from "react";
import { formCreator } from "@/libs/form";
import { toast } from "react-toastify";
import styles from "./GalleryCreate.module.scss";
import { createGalleryRequest } from "@/services/gallery.service";

const GalleryCreate = ({
  modalClose,
}: {
  modalClose: (isRender: boolean) => void;
}) => {
  const createGallery = async (event: FormEvent) => {
    event.preventDefault();
    const formData = formCreator([
      {
        name: "image",
        data: inputRefs.image.current?.files?.[0],
      },
    ]);

    const { status } = await createGalleryRequest(formData);
    if (status === 201) {
      modalClose(true);
      toast.success("Gallery created successfully.");
    } else toast.error("Gallery created failed");
  };

  const inputRefs = {
    name: useRef<HTMLInputElement | null>(null),
    location: useRef<HTMLInputElement | null>(null),
    image: useRef<HTMLInputElement | null>(null),
  };

  return (
    <Modal
      title={"Create"}
      subtitle={"Create Subtitle"}
      modalClose={() => modalClose(false)}
    >
      <form onSubmit={createGallery} className={styles.gallery__create}>
        <FileInput inputRef={inputRefs.image} />

        <div className={styles.buttons}>
          <Button
            text={"Cancel"}
            type={"button"}
            style={{ backgroundColor: "red" }}
            onClick={() => modalClose(false)}
          />
          <Button text={"Create"} type={"submit"} />
        </div>
      </form>
    </Modal>
  );
};

export default GalleryCreate;

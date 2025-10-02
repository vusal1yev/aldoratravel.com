import Modal from "@/features/admin/components/shared/Modal/Modal";
import Input from "@/features/admin/components/shared/Input/Input";
import TextArea from "@/features/admin/components/shared/TextArea/TextArea";

import styles from "./TourUpdate.module.scss";
import FileInput from "@/features/admin/components/shared/FileInput/FileInput";
import Button from "@/features/admin/components/shared/Button/Button";
import React, { FormEvent, useRef, useState } from "react";
import { updateTourRequest } from "@/services/tour.service";
import { toast } from "react-toastify";
import { TourModel } from "@/models/tour.model";
import { formCreator } from "@/libs/form";
import Tabs from "@/features/admin/components/shared/Tabs/Tabs";

const TourUpdate = ({
  tour,
  modalClose,
}: {
  tour: TourModel;
  modalClose: (isRender: boolean) => void;
}) => {
  const [tabs, setTabs] = useState<{
    tabs: {
      tab: number;
      name: string;
      onClick: () => void;
    }[];
    active: number;
  }>({
    tabs: [
      {
        tab: 0,
        name: "English",
        onClick: () => {
          setTabs((prevState) => ({ ...prevState, active: 0 }));
        },
      },
      {
        tab: 1,
        name: "Turkish",
        onClick: () => {
          setTabs((prevState) => ({ ...prevState, active: 1 }));
        },
      },
      {
        tab: 2,
        name: "Russian",
        onClick: () => {
          setTabs((prevState) => ({ ...prevState, active: 2 }));
        },
      },
    ],
    active: 0,
  });

  const languages = [
    { key: "en", label: "English" },
    { key: "tr", label: "Türkçe" },
    { key: "ru", label: "Русский" },
  ];

  const inputRefs = {
    title_en: useRef<HTMLInputElement | null>(null),
    description_en: useRef<HTMLTextAreaElement | null>(null),

    title_tr: useRef<HTMLInputElement | null>(null),
    description_tr: useRef<HTMLTextAreaElement | null>(null),

    title_ru: useRef<HTMLInputElement | null>(null),
    description_ru: useRef<HTMLTextAreaElement | null>(null),

    price: useRef<HTMLInputElement | null>(null),
    image: useRef<HTMLInputElement | null>(null),
  };

  const updateTour = async (event: FormEvent) => {
    event.preventDefault();

    const formData = formCreator([
      { name: "Title_en", data: inputRefs.title_en.current?.value || "" },
      {
        name: "Description_en",
        data: inputRefs.description_en.current?.value || "",
      },

      { name: "Title_tr", data: inputRefs.title_tr.current?.value || "" },
      {
        name: "Description_tr",
        data: inputRefs.description_tr.current?.value || "",
      },

      { name: "Title_ru", data: inputRefs.title_ru.current?.value || "" },
      {
        name: "Description_ru",
        data: inputRefs.description_ru.current?.value || "",
      },

      { name: "Price", data: inputRefs.price.current?.value || "" },
      { name: "Image", data: inputRefs.image.current?.files?.[0] || "" },
    ]);

    const { status } = await updateTourRequest(formData, tour.id);

    if (status === 201) {
      modalClose(true);
      toast.success("Tour updated successfully.");
    } else {
      modalClose(false);
      toast.error("Tour update failed.");
    }
  };

  return (
    <Modal
      title={"Update Tour"}
      subtitle={"Update tour details"}
      modalClose={() => modalClose(false)}
    >
      <form onSubmit={updateTour} className={styles.tour__update}>
        <Tabs tabs={tabs.tabs} active={tabs.active} />

        {languages.map((lang, index) => (
          <div
            key={lang.key}
            style={{
              display: tabs.active === index ? "flex" : "none",
              gap: "16px",
              flexDirection: "column",
            }}
          >
            <Input
              type="text"
              label={`Title (${lang.label})`}
              inputRef={
                inputRefs[`title_${lang.key}` as keyof typeof inputRefs]
              }
              defaultValue={tour[`title_${lang.key}` as keyof TourModel] || ""}
              required
            />

            <Input
              type="text"
              label={"Price"}
              inputRef={
                inputRefs[`price_${lang.key}` as keyof typeof inputRefs]
              }
              defaultValue={tour[`price_${lang.key}` as keyof TourModel] || ""}
              required
            />

            <TextArea
              label={`Description (${lang.label})`}
              inputRef={
                inputRefs[`description_${lang.key}` as keyof typeof inputRefs]
              }
              defaultValue={
                tour[`description_${lang.key}` as keyof TourModel] || ""
              }
              required
            />
          </div>
        ))}

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

export default TourUpdate;

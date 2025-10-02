import Modal from "@/features/admin/components/shared/Modal/Modal";
import Input from "@/features/admin/components/shared/Input/Input";

import styles from "./DestinationCreate.module.scss";
import FileInput from "@/features/admin/components/shared/FileInput/FileInput";
import Button from "@/features/admin/components/shared/Button/Button";
import React, { FormEvent, useRef, useState } from "react";
import { createDestinationRequest } from "@/services/destination.service";
import { toast } from "react-toastify";
import { formCreator } from "@/libs/form";
import Tabs from "@/features/admin/components/shared/Tabs/Tabs";

const DestinationCreate = ({
  modalClose,
}: {
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
          setTabs((prevState) => ({
            ...prevState,
            active: 0,
          }));
        },
      },
      {
        tab: 1,
        name: "Turkish",
        onClick: () => {
          setTabs((prevState) => ({
            ...prevState,
            active: 1,
          }));
        },
      },
      {
        tab: 2,
        name: "Russian",
        onClick: () => {
          setTabs((prevState) => ({
            ...prevState,
            active: 2,
          }));
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
    country_en: useRef<HTMLInputElement | null>(null),
    city_en: useRef<HTMLInputElement | null>(null),

    title_tr: useRef<HTMLInputElement | null>(null),
    country_tr: useRef<HTMLInputElement | null>(null),
    city_tr: useRef<HTMLInputElement | null>(null),

    title_ru: useRef<HTMLInputElement | null>(null),
    country_ru: useRef<HTMLInputElement | null>(null),
    city_ru: useRef<HTMLInputElement | null>(null),

    image: useRef<HTMLInputElement | null>(null),
  };

  const createDestination = async (event: FormEvent) => {
    event.preventDefault();

    const formData = formCreator([
      {
        name: "Title_en",
        data: inputRefs.title_en.current?.value || "",
      },
      {
        name: "Country_en",
        data: inputRefs.country_en.current?.value || "",
      },
      {
        name: "City_en",
        data: inputRefs.city_en.current?.value || "",
      },

      {
        name: "Title_tr",
        data: inputRefs.title_tr.current?.value || "",
      },
      {
        name: "Country_tr",
        data: inputRefs.country_tr.current?.value || "",
      },
      {
        name: "City_tr",
        data: inputRefs.city_tr.current?.value || "",
      },

      {
        name: "Title_ru",
        data: inputRefs.title_ru.current?.value || "",
      },
      {
        name: "Country_ru",
        data: inputRefs.country_ru.current?.value || "",
      },
      {
        name: "City_ru",
        data: inputRefs.city_ru.current?.value || "",
      },

      {
        name: "Image",
        data: inputRefs.image.current?.files?.[0] || "",
      },
    ]);

    const { status } = await createDestinationRequest(formData);
    if (status === 201) {
      modalClose(true);
      toast.success("Destination created successfully.");
    } else toast.error("Destination created failed");
  };

  return (
    <Modal
      title={"Create"}
      subtitle={"Create Subtitle"}
      modalClose={() => modalClose(false)}
    >
      <form onSubmit={createDestination} className={styles.destination__create}>
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
              required
            />
            <Input
              type="text"
              label={`Country (${lang.label})`}
              inputRef={
                inputRefs[`country_${lang.key}` as keyof typeof inputRefs]
              }
              required
            />
            <Input
              type="text"
              label={`City (${lang.label})`}
              inputRef={inputRefs[`city_${lang.key}` as keyof typeof inputRefs]}
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
          <Button text={"Create"} type={"submit"} />
        </div>
      </form>
    </Modal>
  );
};

export default DestinationCreate;

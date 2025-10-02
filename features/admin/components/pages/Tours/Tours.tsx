"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "@/features/admin/components/shared/Table/Table";
import Button from "@/features/admin/components/shared/Button/Button";
import styles from "./Tours.module.scss";
import { getAllToursRequest } from "@/services/tour.service";
import { TourModel } from "@/models/tour.model";
import TourCreate from "@/features/admin/components/modals/TourModals/Create/TourCreate";
import { ToursEmptyStateIcon } from "@/features/admin/assets/icons/shared.vectors";
import Image from "next/image";
import TourUpdate from "@/features/admin/components/modals/TourModals/Update/TourUpdate";
import TourDelete from "@/features/admin/components/modals/TourModals/Delete/TourDelete";

const Tours = () => {
  const [render, setRender] = useState<number>(0);

  const [tours, setTours] = useState<{
    travels: TourModel[];
    dataCount: number;
  }>({
    travels: [],
    dataCount: 0,
  });

  const [modal, setModal] = useState<{
    create: boolean;
    update: TourModel | null;
    delete: TourModel | null;
  }>({
    create: false,
    update: null,
    delete: null,
  });

  const getAllTours = async () => {
    const { data, status } = await getAllToursRequest();

    if (status === 200) {
      setTours(data);
    } else toast.error(`Error: ${status}`);
  };

  useEffect(() => {
    getAllTours().catch((error) => {
      toast.error(`Error: ${error.message}`);
    });
  }, [render]);

  return (
    <div className={styles.tours}>
      <div className={styles.tours__bar}>
        <Button
          text={"Tours Create"}
          onClick={() => {
            setModal((prevState) => ({
              ...prevState,
              create: true,
            }));
          }}
        />
      </div>

      {tours?.dataCount > 0 ? (
        <Table
          tableRow={[
            { name: "Title" },
            { name: "Description" },
            { name: "Price" },
            { name: "Image" },
            { name: "Edit" },
            { name: "Delete" },
          ]}
          dataCount={tours.dataCount}
        >
          {tours.travels.map((tour: TourModel) => (
            <tr key={`tour_${tour.id}`} className={styles.tours__table__row}>
              <td>{tour.title_en}</td>
              <td>{tour.description_en}</td>
              <td>{tour.price_en}</td>
              <td>
                <Image
                  width={150}
                  height={100}
                  src={`${process.env.NEXT_PUBLIC_API_DOMAIN}/${tour.imagePath}`}
                  alt={"Tour Image"}
                />
              </td>
              <td>
                <span
                  onClick={() => {
                    setModal((prevState) => ({
                      ...prevState,
                      update: tour,
                    }));
                  }}
                >
                  Edit
                </span>
              </td>
              <td>
                <span
                  onClick={() => {
                    setModal((prevState) => ({
                      ...prevState,
                      delete: tour,
                    }));
                  }}
                >
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </Table>
      ) : (
        <div className={styles.empty__state}>
          <ToursEmptyStateIcon />
          <p className={styles.title}>Empty Tours</p>
        </div>
      )}

      {modal.create && (
        <TourCreate
          modalClose={(isRender) => {
            setModal((prevState) => ({
              ...prevState,
              create: false,
            }));

            if (isRender) setRender((prevState) => (prevState += 1));
          }}
        />
      )}
      {modal.update && (
        <TourUpdate
          tour={modal.update}
          modalClose={(isRender) => {
            setModal((prevState) => ({
              ...prevState,
              create: false,
            }));

            if (isRender) setRender((prevState) => (prevState += 1));
          }}
        />
      )}
      {modal.delete && (
        <TourDelete
          tour={modal.delete}
          modalClose={(isRender) => {
            setModal((prevState) => ({
              ...prevState,
              create: false,
            }));

            if (isRender) setRender((prevState) => (prevState += 1));
          }}
        />
      )}
    </div>
  );
};

export default Tours;

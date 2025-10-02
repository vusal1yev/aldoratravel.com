"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "@/features/admin/components/shared/Table/Table";
import Button from "@/features/admin/components/shared/Button/Button";
import { getAllDestinationsRequest } from "@/services/destination.service";
import styles from "./Destinations.module.scss";
import DestinationCreate from "@/features/admin/components/modals/DestinationModals/Create/DestinationCreate";
import Image from "next/image";
import { DestinationModel } from "@/models/destination.model";
import DestinationDelete from "@/features/admin/components/modals/DestinationModals/Delete/DestinationDelete";
import DestinationUpdate from "@/features/admin/components/modals/DestinationModals/Update/DestinationUpdate";
import { DestinationEmptyStateIcon } from "@/features/admin/assets/icons/shared.vectors";
import { usePageChanger } from "@//hooks/usePageChanger";

const Destinations = () => {
  const { page } = usePageChanger();

  const [render, setRender] = useState<number>(0);

  const [destinations, setDestinations] = useState<{
    dataCount: number;
    destinations: DestinationModel[];
  }>({
    dataCount: 0,
    destinations: [],
  });

  const [modal, setModal] = useState<{
    create: boolean;
    update: DestinationModel | null;
    delete: DestinationModel | null;
  }>({
    create: false,
    update: null,
    delete: null,
  });

  const getAllDestinations = async () => {
    const { data, status } = await getAllDestinationsRequest(page, 10);

    if (status === 200) {
      setDestinations(data);
    } else toast.error(`Error: ${status}`);
  };

  useEffect(() => {
    getAllDestinations().catch((error) => {
      toast.error(`Error: ${error.message}`);
    });
  }, [page, render]);

  return (
    <div className={styles.destinations}>
      <div className={styles.destinations__bar}>
        <Button
          text={"Destination Create"}
          onClick={() => {
            setModal((prevState) => ({
              ...prevState,
              create: true,
            }));
          }}
        />
      </div>

      {destinations.dataCount > 0 ? (
        <Table
          tableRow={[
            { name: "Name" },
            { name: "Location" },
            { name: "Image" },
            { name: "Edit" },
            { name: "Delete" },
          ]}
          dataCount={destinations.dataCount}
        >
          {destinations.destinations.map((destination: DestinationModel) => (
            <tr
              key={`destination_${destination.id}`}
              className={styles.destinations__table__row}
            >
              <td>{destination.title_en}</td>
              <td>
                {destination.city_en} {destination.city_en}
              </td>
              <td>
                <Image
                  width={150}
                  height={100}
                  src={`${process.env.NEXT_PUBLIC_API_DOMAIN}/${destination.imagePath}`}
                  alt={"Destination Image"}
                />
              </td>
              <td>
                <span
                  onClick={() => {
                    setModal((prevState) => ({
                      ...prevState,
                      update: destination,
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
                      delete: destination,
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
          <DestinationEmptyStateIcon />
          <p className={styles.title}>Empty Destinations</p>
        </div>
      )}

      {modal.create && (
        <DestinationCreate
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
        <DestinationUpdate
          destination={modal.update}
          modalClose={(isRender) => {
            setModal((prevState) => ({
              ...prevState,
              update: null,
            }));

            if (isRender) setRender((prevState) => (prevState += 1));
          }}
        />
      )}

      {modal.delete && (
        <DestinationDelete
          destination={modal.delete}
          modalClose={(isRender) => {
            setModal((prevState) => ({
              ...prevState,
              delete: null,
            }));

            if (isRender) setRender((prevState) => (prevState += 1));
          }}
        />
      )}
    </div>
  );
};

export default Destinations;

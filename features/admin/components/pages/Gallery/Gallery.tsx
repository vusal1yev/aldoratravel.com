"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "@/features/admin/components/shared/Table/Table";
import Button from "@/features/admin/components/shared/Button/Button";
import { GalleryModel } from "@/models/gallery.model";
import GalleryCreate from "@/features/admin/components/modals/GalleryModals/Create/GalleryCreate";
import { getAllGalleryRequest } from "@/services/gallery.service";
import GalleryDelete from "@/features/admin/components/modals/GalleryModals/Delete/GalleryDelete";
import GalleryUpdate from "@/features/admin/components/modals/GalleryModals/Update/GalleryUpdate";
import styles from "./Gallery.module.scss";
import Image from "next/image";
import { GalleryEmptyStateIcon } from "@/features/admin/assets/icons/shared.vectors";

const Gallery = () => {
  const [render, setRender] = useState<number>(0);

  const [gallery, setGallery] = useState<{
    dataCount: number;
    images: GalleryModel[];
  }>({
    dataCount: 0,
    images: [],
  });

  const [modal, setModal] = useState<{
    create: boolean;
    update: GalleryModel | null;
    delete: GalleryModel | null;
  }>({
    create: false,
    update: null,
    delete: null,
  });

  const getAllGallery = async () => {
    const { data, status } = await getAllGalleryRequest();

    if (status === 200) {
      setGallery(data);
    } else toast.error(`Error: ${status}`);
  };

  useEffect(() => {
    getAllGallery().catch((error) => {
      toast.error(`Error: ${error.message}`);
    });
  }, [render]);

  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__bar}>
        <Button
          text={"Gallery Create"}
          onClick={() => {
            setModal((prevState) => ({
              ...prevState,
              create: true,
            }));
          }}
        />
      </div>

      {gallery.dataCount > 0 ? (
        <Table
          tableRow={[{ name: "Id" }, { name: "Image" }, { name: "Delete" }]}
          dataCount={gallery.dataCount}
        >
          {gallery.images.map((img: GalleryModel) => (
            <tr
              key={`gallery_${img.id}`}
              className={styles.gallery__table__row}
            >
              <td>{img.id}</td>
              <td>
                <Image
                  width={150}
                  height={100}
                  src={`${process.env.NEXT_PUBLIC_API_DOMAIN}/${img.imagePath}`}
                  alt={"Gallery Image"}
                />
              </td>
              <td>
                <span
                  onClick={() => {
                    setModal((prevState) => ({
                      ...prevState,
                      delete: img,
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
          <GalleryEmptyStateIcon />
          <p className={styles.title}>Empty Destinations</p>
        </div>
      )}

      {/* Create modals */}
      {modal.create && (
        <GalleryCreate
          modalClose={(isRender) => {
            setModal((prevState) => ({
              ...prevState,
              create: false,
            }));

            if (isRender) setRender((prevState) => (prevState += 1));
          }}
        />
      )}

      {/* Update modals */}
      {modal.update && (
        <GalleryUpdate
          gallery={modal.update}
          modalClose={(isRender) => {
            setModal((prevState) => ({
              ...prevState,
              update: null,
            }));

            if (isRender) setRender((prevState) => (prevState += 1));
          }}
        />
      )}

      {/* Delete modals */}
      {modal.delete && (
        <GalleryDelete
          gallery={modal.delete}
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

export default Gallery;

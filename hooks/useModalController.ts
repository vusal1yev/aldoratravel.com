import { useState } from "react";

export const useModalState = () => {
  const [modal, setModal] = useState({
    create: false,
    update: null,
    delete: null,
  });

  const [render, setRender] = useState<boolean>(false);

  const openCreate = () =>
    setModal({ create: true, update: null, delete: null });

  const openUpdate = (object: any) =>
    setModal({ create: false, update: object, delete: null });

  const openDelete = (object: any) =>
    setModal({ create: false, update: null, delete: object });

  const closeAll = () =>
    setModal({ create: false, update: null, delete: null });

  const reRender = () => setRender((prev) => !prev);

  return {
    modal,
    openCreate,
    openUpdate,
    openDelete,
    closeAll,

    render,
    reRender,
  };
};

import styles from "./Modal.module.scss";

import type { ReactNode } from "react";
import { CloseIcon } from "@/features/site/assets/icons/shared.vectore";

const Modal = ({
  modalOpen,
  modalClose,
  children,
}: {
  modalOpen: boolean;
  modalClose: () => void;
  children?: ReactNode;
}) => {
  return (
    <div className={`${styles.modal} ${modalOpen && styles.open}`}>
      <button className={styles.modal__close} onClick={modalClose}>
        <CloseIcon />
      </button>
      {children}
    </div>
  );
};

export default Modal;

import React from "react";
import Modal from "@/features/site/components/modals/Modal/Modal";
import styles from "./TravelPreviewModal.module.scss";
import { useBodyOverflow } from "@/hooks/useBodyOverflow";

const TravelPreviewModal = ({
  modalOpen,
  modalClose,
}: {
  modalOpen: boolean;
  modalClose: () => void;
}) => {
  useBodyOverflow(modalOpen);

  return (
    <Modal modalOpen={modalOpen} modalClose={modalClose}>
      <div className={styles.detail}>salam</div>
    </Modal>
  );
};

export default TravelPreviewModal;

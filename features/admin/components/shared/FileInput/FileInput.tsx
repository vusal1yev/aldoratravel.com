import styles from "./FileInput.module.scss";
import { InputHTMLAttributes, useState } from "react";

const FileInput = ({
  inputRef,
  maxHeight,
  ...props
}: {
  inputRef?: any;
  maxHeight?: boolean;
} & InputHTMLAttributes<HTMLInputElement>) => {
  const [file, setFile] = useState<File | null>(null);

  function handleChange(e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }
  return (
    <label
      style={{
        height: maxHeight ? "fit-content" : "100%",
      }}
      className={styles.file__input}
    >
      <div className={styles.texts}>
        {file ? (
          <p className={styles.title}>
            <span>{file.name}</span>
          </p>
        ) : (
          <p className={styles.title}>
            Fayllarınızı bura atın və ya <span>seçin</span>
          </p>
        )}
        <p className={styles.subtitle}>
          {file
            ? `Ölçü: ${(file.size / (1024 * 1024)).toFixed(2)}MB`
            : "Maksimal ölçü: 3MB"}
        </p>
      </div>
      <input
        placeholder="fileInput"
        ref={inputRef}
        type="file"
        onChange={handleChange}
        accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
        {...props}
      />
    </label>
  );
};

export default FileInput;

import React, { useEffect, useRef, useState } from "react";
import styles from "./SelectOption.module.scss";
import useClickOutside from "@/hooks/useClickOutside";

type Option = {
  name: string;
  value?: string | number;
};

type SelectOptionProps = {
  label: string;
  options: Option[];
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange?: (options: Option) => void;
  value?: Option;
  disabled?: boolean;
  required?: boolean;
  isSearchable?: boolean;
  isSearch?: (searchValue: string) => void;
};

const SelectOption = ({
  options,
  label,
  required,
  inputRef,
  onChange,
  value,
  disabled,
  isSearchable,
  isSearch,
}: SelectOptionProps) => {
  // Contexts
  // Refs
  const boxRef = useRef<HTMLDivElement>(null);
  useClickOutside(boxRef, () => setOpen(false));

  // States
  const [selectedValue, setSelectedValue] = useState<Option | null>(null);
  const [open, setOpen] = useState(false);

  // useEffects
  useEffect(() => {
    if (value) setSelectedValue(value);
  }, []);

  return (
    <div className={styles.select__box}>
      {/* Label */}
      {label && <p>{label}</p>}

      {/* Selections */}
      <div
        onClick={() => {
          setOpen((prev) => !prev);
          if (isSearch) {
            isSearch("");
          }
        }}
        className={`${styles.select} ${disabled && styles.disabled}`}
      >
        {/* PlaceHolder */}
        <div className={styles.select__placeholder}>
          <span>
            {selectedValue?.name ? selectedValue.name : "Seçilmiş dəyər"}
          </span>
        </div>

        {/* Options */}
        {open && (
          <div ref={boxRef} className={styles.select__content}>
            {isSearchable && (
              <div
                key={`option_search`}
                className={styles.select__content__item}
                onClick={(event) => event.stopPropagation()}
              >
                <input
                  type={"text"}
                  placeholder={"Axtar"}
                  onChange={(event) => {
                    if (isSearch) {
                      isSearch(event.target.value);
                    }
                  }}
                />
              </div>
            )}

            <div
              key={`option_first`}
              className={styles.select__content__item}
              onClick={() => {
                if (onChange) {
                  onChange({
                    name: "null",
                    value: "null",
                  });
                }
                setSelectedValue(null);
              }}
            >
              {"Seçilmiş dəyər"}
            </div>

            {options?.map((option, index) => (
              <div
                key={`option_${index}`}
                className={styles.select__content__item}
                onClick={() => {
                  if (option?.value !== selectedValue?.value) {
                    if (onChange) {
                      onChange(option);
                    }
                    setSelectedValue(option);
                  }
                }}
              >
                <span>{option.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Input */}
        <input
          type="text"
          required={required}
          defaultValue={value ? value.value : selectedValue?.value}
          name={label}
          ref={inputRef}
          className={styles.select__input}
        />
      </div>
    </div>
  );
};

export default SelectOption;

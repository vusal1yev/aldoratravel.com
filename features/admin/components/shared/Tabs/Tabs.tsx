// Reacts
import React from "react";
import Link from "next/link";

// Styles
import styles from "./Tabs.module.scss";

const Tabs = ({
  tabs,
  active,
}: {
  tabs: {
    tab: number;
    name: string;
    link?: string;
    onClick: () => void;
  }[];
  active?: number;
}) => {
  return (
    <div className={styles.tabs}>
      {tabs &&
        tabs.map((tab, index) => {
          return (
            <React.Fragment key={`tab_${index}`}>
              {tab?.link ? (
                <Link
                  href={`/${tab.link}`}
                  className={`${styles.tab} ${tab.tab === active && styles.active}`}
                  onClick={() => {
                    if (tab.onClick) tab.onClick();
                  }}
                >
                  <span>{tab.name}</span>
                </Link>
              ) : (
                <>
                  <button
                    className={`${styles.tab} ${tab.tab === active && styles.active}`}
                    type="button"
                    onClick={() => {
                      if (tab.onClick) tab.onClick();
                    }}
                  >
                    <span>{tab.name}</span>
                  </button>
                </>
              )}
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default Tabs;

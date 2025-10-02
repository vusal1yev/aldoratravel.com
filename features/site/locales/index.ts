import "server-only";

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  ru: () => import("./ru.json").then((module) => module.default),
  tr: () => import("./tr.json").then((module) => module.default),
};

// JsonDataType
export type JsonDataType = Awaited<ReturnType<(typeof dictionaries)["tr"]>>;

export const getLanguage = async (locale: "en" | "ru" | "tr") =>
  dictionaries[locale]();

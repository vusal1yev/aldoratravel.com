import React from "react";

import { getLanguage, JsonDataType } from "@/features/site/locales";
import Introduction from "@/features/site/components/pages/Home/Introduction/Introduction";
// import About from "@/features/site/components/pages/Home/About/About";
import Destinations from "@/features/site/components/pages/Home/Destinations/Destinations";
import Offers from "@/features/site/components/pages/Home/Offers/Offers";
// import Experiences from "@/features/site/components/pages/Home/Experiences/Experiences";
import Gallery from "@/features/site/components/pages/Home/Gallery/Gallery";
import Footer from "@/features/site/components/shared/Footer/Footer";

const Page = async ({
  params,
}: {
  params: Promise<{ lang: "tr" | "en" | "ru" }>;
}) => {
  const translate = (await getLanguage((await params).lang)) as JsonDataType;

  return (
    <main>
      <Introduction translate={translate} />
      {/*<About translate={translate} />*/}
      <Destinations translate={translate} />
      <Offers translate={translate} />
      {/*<Experiences translate={translate} />*/}
      <Gallery translate={translate} />
      <Footer translate={translate} />
    </main>
  );
};

export default Page;

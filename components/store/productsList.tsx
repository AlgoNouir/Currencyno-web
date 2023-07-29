import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import { useRouter } from "next/router";
import { productType } from "@/store/product/slice";
import Product from "./product";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function ProductLists(props: {
  products: productType[];
  title?: { name: string; moreDir?: string };
}) {
  /*
        show the product list slider

        with title.name we can set the title of slider

        if we want to show more set the more dir in title
        more dir is a direct of string set it in router
    */

  const router = useRouter();
  return (
    <div className="relative h-[500px]">
      <div className="w-full rounded-xl absolute">
        {props.title === undefined ? (
          <></>
        ) : (
          <div className="flex flex-row justify-between items-center mb-5">
            <label className="text-lg sm:text-3xl font-bold">
              {props.title.name}
            </label>
            {props.title.moreDir === undefined ? (
              <></>
            ) : (
              <button
                onClick={() => router.push(props.title?.moreDir || "")}
                className="px-5 py-2 text-black bg-slate-300 rounded-full text-lg sm:text-xl text-sm sm:w-44 font-bold"
              >
                مشاهده بیشتر
              </button>
            )}
          </div>
        )}
        <div className="h-96">
          <Carousel
            responsive={responsive}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            autoPlay
            infinite
            renderButtonGroupOutside
          >
            {props.products.map((product, index) => (
              <div
                className="items-center justify-center flex h-full sm:pr-5
                "
                key={index}
              >
                <Product {...product} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

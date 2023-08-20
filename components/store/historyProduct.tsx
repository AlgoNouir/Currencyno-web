import { productType } from "@/store/product/slice";
import Modal from "../UI/modal";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/HOCs";
import { useState } from "react";
import {
  HiBuildingStorefront,
  HiOutlineArchiveBoxXMark,
} from "react-icons/hi2";
import Product from "./product";
import { BiCheckShield } from "react-icons/bi";
import { OrderProduct } from "@/store/account/slice";

export default function HistoryModal(props: {
  open: boolean;
  handler: any;
  products: OrderProduct[];
}) {
  const router = useRouter();
  const products = useAppSelector((store) => store.products);

  return (
    <Modal open={props.open} handler={props.handler} title="سوابق">
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        }}
        className="grid w-full gap-5"
      >
        {props.products.map((p, index) => {
          const product = products.find((pp) => pp.id === p.product);
          const select = product?.counts.find((s) => s.id === p.select);
          if (product)
            return (
              <button
                onClick={() => router.push(`product/${product.id}`)}
                className="relative bg-prime-300 rounded-xl h-fit"
              >
                <div className="absolute top-3 right-3">
                  {select !== undefined ? (
                    <div className="bg-gray-200 p-2 rounded-xl">
                      {select.name}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="h-96">
                  <Product {...product} />
                </div>
                <div className="bg-white z-0 rounded-xl p-2 border-4 border-primary-500 space-y-2">
                  <div className="flex flex-row items-center justify-start font-bold space-x-2 rtl:space-x-reverse text-primary-700">
                    <BiCheckShield className="text-xl" />
                    <label className="text-sm">{product.garanty}</label>
                  </div>
                  <div className="flex flex-row text-primary-700 font-bold space-x-2 rtl:space-x-reverse items-center">
                    <HiBuildingStorefront className="text-xl" />
                    <label className="text-sm">ارسال از انبار کارنسینو</label>
                  </div>
                  <div className="flex flex-row items-end justify-between ">
                    <label>
                      {`${Intl.NumberFormat("fa-IR").format(p.count)} عدد`}
                    </label>
                    <label>
                      {`${Intl.NumberFormat("fa-IR").format(
                        p.count * product.price
                      )} تومان`}
                    </label>
                  </div>
                </div>
              </button>
            );
        })}
      </div>
    </Modal>
  );
}

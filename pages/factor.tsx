import { axiosUser } from "@/core/axios";
import { useAppDispatch, useAppSelector } from "@/store/HOCs";
import { useRouter } from "next/router";
import Image from "next/image";
import { postPrice } from "@/core";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { setNotif } from "@/store/core/slice";

function CustomImage(props: { src: string }) {
  return (
    <Image
      alt={props.src}
      src={`https://currencyno.storage.iran.liara.space/${props.src}`}
      width="0"
      height="0"
      sizes="100vw"
      className="w-full h-auto"
    />
  );
}
export default function FactorPage() {
  // main
  const router = useRouter();

  // resdux
  const userProducts = useAppSelector((store) => store.account.cartProduct);
  const products = useAppSelector((store) => store.products);
  const dispatch = useAppDispatch();
  const [loading, loadingHandler] = useState(false);

  if (userProducts.length > 0)
    return (
      <>
        <div
          className="flex flex-col lg:flex-row items-center h-screen p-5 sm:p-14 max-lg:h-fit
            justify-between space-y-5 lg:space-y-0 lg:space-x-5 rtl:space-x-reverse"
        >
          <div className="space-y-5 w-full lg:w-1/2 h-full rounded-xl overflow-scroll">
            {userProducts.map((item) => {
              const product = products.find((p) => p.id === item.product);
              if (product)
                return (
                  <div className="bg-white rounded-xl space-y-5 p-5 flex flex-col">
                    <div className="flex flex-row space-x-5 rtl:space-x-reverse">
                      <div className="w-20 h-20">
                        <CustomImage src={product.image[0]} />
                      </div>
                      <div>
                        <p className="text-xl font-bold">
                          {product.persianName}
                        </p>
                        <p className="text-gray-700">{product.englishName}</p>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div></div>
                      <div className="flex flex-row items-center space-x-2 rtl:space-x-reverse">
                        <p className="text-2xl font-bold">
                          {Intl.NumberFormat("fa-IR").format(
                            (product.offerPrice === 0
                              ? product.price
                              : product.offerPrice) * item.count
                          )}
                        </p>
                        <small className="text-gray-700">تومان</small>
                      </div>
                    </div>
                  </div>
                );
            })}
          </div>
          <div
            className="bg-white w-full lg:w-1/2 h-full rounded-xl
          p-5 flex flex-col justify-between max-lg:space-y-5"
          >
            <div className="space-y-5">
              {[
                "مرجوع کالا صرفا تنها در زمانی مقدور است که بسته بندی کالا باز نشده باشد.",
                "جهت استفاده از خدمات جدید کارنسینو شامل آنباکس و تست محصول و ارسال ویدیو محصول شما قبل از ارسال لطفا با واحد پشتیبانی تماس بگیرید",
                "سفارش شما در اولین زمان تحویل اداره پست خواهد شد",
              ].map((data, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-start space-x-5 rtl:space-x-reverse"
                >
                  <div className="bg-amber-500 h-5 w-5 rounded-full"></div>
                  <p className="text-xl">{data}</p>
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col sm:flex-row sm:items-end sm:justify-between max-sm:space-y-5">
              <div className="flex flex-col space-y-2">
                <small>مجموع :</small>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <p className="text-2xl font-bold">
                    {Intl.NumberFormat("fa-IR").format(
                      userProducts.reduce((obj, cart) => {
                        const product = products.find(
                          (product) => product.id === cart.product
                        );
                        const price =
                          product?.offerPrice === 0
                            ? product?.price
                            : product?.offerPrice;

                        return (
                          obj + (price === undefined ? 0 : price * cart.count)
                        );
                      }, 0) +
                        (userProducts.find((p) => {
                          if (
                            [61, 56].includes(
                              products.find((pp) => pp.id === p.product)
                                ?.category || -1
                            )
                          )
                            return true;
                          return false;
                        }) === undefined
                          ? postPrice
                          : 0)
                    )}
                  </p>
                  <p className="text-gray-800">تومان</p>
                </div>
              </div>
              <div className="flex flex-row space-x-2 rtl:space-x-reverse ">
                <button
                  onClick={() => {
                    router.back();
                  }}
                  className="bg-red-600 px-7 py-2 rounded-xl text-white"
                >
                  بازگشت
                </button>
                <button
                  onClick={async () => {
                    loadingHandler(true);
                    const response = await axiosUser
                      .post("test/")
                      .then((res) => {
                        loadingHandler(false);
                        router.push(res.data.url);
                      })
                      .catch((error) => {
                        loadingHandler(false);
                        dispatch(
                          setNotif({
                            type: "error",
                            message: "مشکلی در اتصال به صفحه پرداخت وجود دارد",
                            title: "پرداخت ناموفق",
                          })
                        );
                      });
                  }}
                  className="bg-green-600 px-7 py-2 rounded-xl text-white"
                >
                  پرداخت و ثبت سفارش
                </button>
              </div>
            </div>
          </div>
        </div>
        {loading === true ? (
          <div
            className="h-full absolute w-full bg-black/20 top-0 bottom-0 left-0 right-0 
            flex items-center justify-center flex-col space-y-5 text-white font-bold text-2xl"
          >
            <CgSpinner className="text-8xl animate-spin" />
            <label unselectable="on">در حال اتصال به صفحه پرداخت</label>
          </div>
        ) : (
          <></>
        )}
      </>
    );
}

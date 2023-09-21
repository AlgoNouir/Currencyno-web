// main
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// components & icons
import { Dropdown } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import Footer from "@/components/UI/footer";
import Header from "@/components/UI/header";

// redux
import { useAppDispatch, useAppSelector } from "@/store/HOCs";
import { setNotif } from "@/store/core/slice";
import { addToCartThunk } from "@/store/account/thunk";
import { keeperCounterType } from "@/store/product/slice";
import ProductLists from "@/components/store/productsList";
import ImageCarousel from "@/components/UI/carousel";
import { addOfflineProduct } from "@/store/account/slice";
import { HiBuildingStorefront } from "react-icons/hi2";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { SERVER_URL } from "@/core";
import { axiosNoUser } from "@/core/axios";
import { NextSeo } from "next-seo";
import Head from "next/head";

function ProductDetail(props: { name: string; amount: string }) {
  return (
    <div className="p-5 flex flex-row space-x-5 rtl:space-x-reverse items-center px-10 border-b">
      <div className="w-3 h-3 bg-amber-400 rounded-full" />
      <p className="text-lg text-gray-500">{props.name}</p>
      <p className="text-2xl font-bold text-gray-600">{props.amount}</p>
    </div>
  );
}

function Offer(props: { amount: number }) {
  return (
    <div
      className="rotate-12 bg-red-700 w-24 h-24 rounded-full 
            flex items-center justify-center flex-col"
    >
      <p className="text-4xl text-white">{`${Intl.NumberFormat("fa-IR").format(
        props.amount
      )}%`}</p>
      <small className="text-white">تخفیف !</small>
    </div>
  );
}

export default function ProductPage(props: any) {
  // redux
  const account = useAppSelector((store) => store.account);
  const dispatch = useAppDispatch();
  const tmp = useAppSelector((store) => store.products);

  // main
  const router = useRouter();
  const productId = router.query.product;

  // data
  const product = tmp.find(
    (p) => p.id === (typeof productId === "string" ? parseInt(productId) : -1)
  );
  const inCart =
    product && account.cartProduct.find((p) => p.product === product.id);

  const products =
    product &&
    tmp.filter((p) => p.category === product.category && p.id !== product.id);

  const tmp_product = product?.counts.filter((p) => p.amount > 0) || [];

  // states
  const [count, countHandler] = useState(inCart?.count || 1);
  const [select, selectHandler] = useState<keeperCounterType | undefined>(
    undefined
  );

  useEffect(() => {
    const selected =
      product?.counts.find((p) => p.id === inCart?.select) || tmp_product[0];
    selectHandler(selected);
  }, [selectHandler, product, inCart]);

  return (
    <>
      <NextSeo
        additionalMetaTags={[
          {
            name: "test",
            content: "hello",
          },
        ]}
      />
      {product !== undefined ? (
        <div className="flex flex-col items-center w-full bg-storePattern">
          <Header state={0} />
          <div className="space-y-5 p-5 sm:container pt-40">
            {product.category === 61 || product.category === 56 ? (
              <div className="bg-amber-400 p-5 flex items-center justify-center rounded-xl text-2xl font-bold">
                <p>
                  شما می توانید با خرید لپتاپ از مجموعه کارنسینو از ارسال رایگان
                  بهره مند شوید !!!
                </p>
              </div>
            ) : (
              <></>
            )}
            <div
              className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:space-x-5 
            rtl:space-x-reverse rounded-xl bg-bg-200 shadow-xl"
            >
              <div className="xl:w-1/2">
                <ImageCarousel images={[product.image]} />
              </div>
              <div
                className="xl:w-1/2 p-10 flex
                            items-center justify-between flex-col space-y-7 relative"
              >
                <div className="flex flex-col space-y-5 w-full">
                  <label className="text-right space-x-5 rtl:space-x-reverse">
                    <label className="text-xl font-bold">
                      {product.persianName}
                    </label>

                    {product.original ? (
                      <></>
                    ) : (
                      <small className="m-2 text-white bg-slate-300 p-1 rounded-xl absolute top-3 left-3">
                        غیر اصل
                      </small>
                    )}
                  </label>
                  <label className="text-gray-500 font-bold">
                    {product.garanty}
                  </label>
                  <div>
                    <label>رنگ : </label>
                    {tmp_product.length > 0 ? (
                      tmp_product.map((p, index) => (
                        <button
                          key={`button-${index}`}
                          onClick={() => selectHandler(p)}
                          className={`${
                            select?.id === p.id ? "border-4" : ""
                          } px-5 py-1 rounded-xl bg-gray-300 border-primary-500`}
                        >
                          <p className="text-xl">{p.name}</p>
                        </button>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="flex flex-row text-prime-200/50 space-x-2 rtl:space-x-reverse items-center">
                    <HiBuildingStorefront className="text-xl" />
                    <label>ارسال از انبار کارنسینو</label>
                  </div>
                  <div className="flex flex-row text-prime-200/50 space-x-2 rtl:space-x-reverse items-center">
                    <BsFillBoxSeamFill className="text-xl" />
                    <label>موجود در انبار کارنسینو</label>
                  </div>
                </div>
                <div
                  className="w-full flex flex-col space-y-5 sm:space-y-0 sm:flex-row space-x-5 
                                items-center justify-center sm:justify-between"
                >
                  {select === undefined ? (
                    <div className="flex items-center justify-center w-full h-20">
                      <label className="text-5xl font-bold text-gray-300">
                        ناموجود :(
                      </label>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-row w-full justify-center items-center space-x-5 rtl:space-x-reverse">
                        {product.offerPrice > 0 ? (
                          <Offer
                            amount={Math.round(
                              (-100 * (product.offerPrice - product.price)) /
                                product.price
                            )}
                          />
                        ) : (
                          <></>
                        )}
                        <div>
                          {product.offerPrice > 0 ? (
                            <del className="text-xl text-red-700">
                              {Intl.NumberFormat("fa-IR").format(product.price)}
                            </del>
                          ) : (
                            <></>
                          )}
                          <div className="flex flex-row space-x-5 rtl:space-x-reverse items-center">
                            <p className="text-4xl font-bold">
                              {Intl.NumberFormat("fa-IR").format(
                                product.offerPrice > 0
                                  ? product.offerPrice
                                  : product.price
                              )}
                            </p>

                            <small className="text-xl">تومان</small>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-3">
                        <div
                          style={{
                            direction: "ltr",
                          }}
                          className="flex flex-rowx space-x-5"
                        >
                          <button
                            onClick={() => {
                              if (count > 0) countHandler((v) => v - 1);
                            }}
                            className="bg-prime-300 w-12 rounded-xl"
                          >
                            -
                          </button>
                          <div className="grow flex items-center justify-center text-xl font-bold">
                            <p>{Intl.NumberFormat("fa-IR").format(count)}</p>
                          </div>
                          <button
                            onClick={() => {
                              // TODO fix this and set amount to max person order
                              if ((select?.amount || 100000) > count) {
                                countHandler((v) => v + 1);
                              } else {
                                dispatch(
                                  setNotif({
                                    type: "warning",
                                    title: "اضافه نشد",
                                    message:
                                      "شما نمی توانید بیشتر از این مقدار خریداری نمایید",
                                  })
                                );
                              }
                            }}
                            className="bg-prime-300 w-12 rounded-xl"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            if (
                              product.counts.length === 0 ||
                              select !== undefined
                            ) {
                              if (
                                count > 0 ||
                                (inCart !== undefined && inCart.count !== count)
                              ) {
                                // check is online or offline
                                if (account.user !== undefined) {
                                  dispatch(
                                    addToCartThunk({
                                      product: product.id,
                                      select: select?.id || -1,
                                      count,
                                    })
                                  );

                                  dispatch(
                                    setNotif({
                                      title: "افزودن به سبد خرید",
                                      message:
                                        inCart === undefined
                                          ? `${product.persianName} با موفقیت به سبد خرید شما افزوده شد`
                                          : `${product.persianName} با موفقیت ویرایش شد`,
                                      type:
                                        inCart === undefined
                                          ? "success"
                                          : "info",
                                    })
                                  );
                                } else {
                                  dispatch(
                                    addOfflineProduct({
                                      id: -1,
                                      product: product.id,
                                      select: select?.id || -1,
                                      count,
                                    })
                                  );
                                }
                              } else {
                                dispatch(
                                  setNotif({
                                    title: "خطای تعداد",
                                    message:
                                      "مقدار محصول مورد نظر شما بایستی بیشتر از ۰ باشد",
                                    type: "error",
                                  })
                                );
                              }
                            } else {
                              dispatch(
                                setNotif({
                                  title: "انتختب نوع محصول",
                                  message:
                                    "لطفا نوع محصول خود را کنار اسم محصول انتخاب کنید",
                                  type: "error",
                                })
                              );
                            }
                          }}
                          className={`${
                            inCart === undefined ||
                            (count === 0 &&
                              inCart !== undefined &&
                              inCart.count !== count)
                              ? "bg-green-700"
                              : "bg-accent-200"
                          } p-5 w-72 rounded-xl`}
                        >
                          <p className="text-xl font-bold text-white">
                            {inCart === undefined ||
                            (count === 0 &&
                              inCart !== undefined &&
                              inCart.count !== count)
                              ? "افزودن به سبد خرید"
                              : "ثبت تغیرات سفارش"}
                          </p>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div
              className="w-full rounded-xl bg-bg-200 shadow-xl p-10
                        flex flex-col space-y-5"
            >
              <label className="text-xl font-bold">توضیحات :</label>
              <p className="text-lg text-justify">{product.desc}</p>
            </div>
            {product.data === undefined ? (
              <></>
            ) : (
              <div className="flex flex-col shadow-xl bg-white rounded-xl p-5">
                <label className="text-xl font-bold mb-5">مشخصات محصول :</label>
                {Object.entries(product.data).map(([key, value], index) => (
                  <ProductDetail
                    key={`productDetail-${index}`}
                    name={key}
                    amount={value}
                  />
                ))}
              </div>
            )}
            {products !== undefined && products?.length > 0 ? (
              <div className="bg-white p-5 shadow-xl rounded-xl">
                <ProductLists
                  products={products}
                  title={{ name: "محصولات مشابه" }}
                />
              </div>
            ) : (
              <></>
            )}
            {/* <div className="flex flex-row space-x-5 rtl:space-x-reverse">
                        <div className="w-2/3 h-96 flex flex-col items-center justify-center space-y-5">
                            <BiMessageSquareX className="text-7xl text-gray-500" />
                            <p className="text-xl text-gray-700">
                                در حال حاضر نظری برای این محصول ثبت نشده است
                            </p>
                        </div>
                        <div className="bg-bg-200 shadow-xl rounded-xl w-1/3  relative overflow-hidden space-y-5 p-5 flex flex-col items-center">
                            {user === undefined ? (
                                <div className="absolute flex-col space-y-5 backdrop-blur w-full h-full rounded-xl flex items-center justify-center">
                                    <p className="text-gray-700 text-xl">
                                        برای ارسال نظر ابتدا بایستی وارد شوید
                                    </p>
                                    <button className="px-5 py-3 bg-yellow-500 rounded-xl">
                                        <p className="">ورود به حساب کاربری</p>
                                    </button>
                                </div>
                            ) : (
                                <></>
                            )}
                            <p className="font-bold text-xl">ارسال نظر</p>

                            <div className="flex flex-col w-full space-y-2">
                                <label htmlFor="name">نظر شما :</label>
                                <textarea
                                    id="name"
                                    className="bg-gray-100 rounded-xl p-2 w-full h-64
                                    resize-none outline-none"
                                />
                            </div>
                            <button className="bg-green-400 p-3 rounded-xl w-44">
                                <p>ارسال نظر</p>
                            </button>
                        </div>
                    </div> */}
          </div>
          <Footer />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { product } = context.params;

  const response = await axiosNoUser.get("product/retreve/", {
    params: {
      ID: product,
    },
  });

  const torob: { name: string; content: string; keyOverride: string }[] = [
    {
      name: "product_id",
      content: response.data.id,
      keyOverride: "product_id",
    },
    {
      name: "product_name",
      content: response.data.persianName,
      keyOverride: "product_name",
    },
    {
      name: "product_price",
      content:
        response.data.offerPrice === 0
          ? response.data.price
          : response.data.offerPrice,
      keyOverride: "product_price",
    },
    {
      name: "product_old_price",
      content: response.data.price,
      keyOverride: "product_old_price",
    },
    {
      name: "availability",
      content:
        response.data.counts.find((c: any) => c.amount > 0) === undefined
          ? "outofstock"
          : "instock",
      keyOverride: "availability",
    },
    {
      name: "guarantee",
      content: response.data.garanty,
      keyOverride: "guarantee",
    },
    {
      name: "image",
      content: `https://currencyno.storage.iran.liara.space/${response.data.image[0]}`,
      keyOverride: "image",
    },
  ];

  return {
    props: { torob },
    notFound: response.status !== 200,
  };
}

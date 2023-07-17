// main
import React, { useState } from "react";
import { useRouter } from "next/router";

// components & icons
import { Dropdown } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import Footer from "@/components/UI/footer";
import Header from "@/components/UI/header";
import Product from "@/components/store/product";
import Carousel from "@/components/UI/carousel";
import { BiMessageSquareX } from "react-icons/bi";

// redux
import { useAppDispatch, useAppSelector } from "@/store/HOCs";
import { setNotif } from "@/store/core/slice";
import { addToCartThunk } from "@/store/account/thunk";
import { keeperCounterType } from "@/store/product/slice";
import ProductLists from "@/components/store/productsList";
import Banner from "@/components/UI/banner";

function ProductDetail(props: { name: string; amount: string }) {
    return (
        <div className="h-44 bg-accent-100/70 rounded-xl flex items-center justify-center relative">
            <p className="text-xl font-bold">{props.amount}</p>
            <p className="absolute bottom-5 text-white text-lg">{props.name}</p>
        </div>
    );
}

function Offer(props: { amount: number }) {
    return (
        <div
            className="rotate-12 bg-red-700 w-24 h-24 rounded-full 
            flex items-center justify-center flex-col"
        >
            <p className="text-4xl text-white">{`${Intl.NumberFormat(
                "fa-IR"
            ).format(props.amount)}%`}</p>
            <small className="text-white">تخفیف !</small>
        </div>
    );
}

export default function ProductPage() {
    // redux
    const user = useAppSelector((store) => store.account.user);
    const dispatch = useAppDispatch();
    const tmp = useAppSelector((store) => store.products);

    // main
    const router = useRouter();
    const productId = router.query.product;

    // data
    const product = tmp.find(
        (p) =>
            p.id === (typeof productId === "string" ? parseInt(productId) : -1)
    );
    const inCart =
        product && user?.products.find((p) => p.product === product.id);

    const products =
        product &&
        tmp.filter(
            (p) => p.category === product.category && p.id !== product.id
        );

    // states
    const [count, countHandler] = useState(inCart?.count || 0);
    const [select, selectHandler] = useState<keeperCounterType | undefined>();

    if (product !== undefined) {
        return (
            <div className="flex flex-col items-center w-full">
                <Header state={0} />
                <div className="space-y-5 p-5 container pt-40">
                    <div className="flex flex-row space-x- rtl:space-x-reverse h-96 rounded-xl bg-bg-200">
                        <div className="w-1/2">
                            <Banner images={[product.image]} />
                        </div>
                        <div
                            className="w-1/2 p-10 flex
                            items-center justify-between flex-col space-y-7 relative"
                        >
                            <div className="flex flex-col space-y-5 w-full">
                                <label className="text-right space-x-5 rtl:space-x-reverse">
                                    <label className="text-xl font-bold">
                                        {product.persianName}
                                    </label>
                                    {product.counts.length > 0 ? (
                                        <Dropdown
                                            menu={{
                                                items: product.counts.map(
                                                    (p): ItemType => ({
                                                        key: p.id,
                                                        label: (
                                                            <button
                                                                onClick={() => {
                                                                    if (
                                                                        p.amount <
                                                                        count
                                                                    )
                                                                        countHandler(
                                                                            p.amount
                                                                        );
                                                                    selectHandler(
                                                                        p
                                                                    );
                                                                }}
                                                            >
                                                                {`${
                                                                    p.name
                                                                } - ${Intl.NumberFormat(
                                                                    "fa-IR"
                                                                ).format(
                                                                    p.amount
                                                                )}
                                                    عدد`}
                                                            </button>
                                                        ),
                                                    })
                                                ),
                                            }}
                                        >
                                            <button
                                                className={`${
                                                    select === undefined
                                                        ? "bg-gray-300"
                                                        : "bg-prime-300"
                                                } px-5 py-1 rounded-xl`}
                                            >
                                                <small>
                                                    {select === undefined
                                                        ? "انتخاب کنید"
                                                        : select.name}
                                                </small>
                                            </button>
                                        </Dropdown>
                                    ) : (
                                        <></>
                                    )}

                                    {product.orginal ? (
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
                            </div>
                            <div className="w-full flex flex-row space-x-5 items-center justify-between">
                                <div className="flex flex-row w-full items-center space-x-5 rtl:space-x-reverse">
                                    {product.offerPrice > 0 ? (
                                        <Offer
                                            amount={
                                                Math.round(
                                                    (-1000 *
                                                        (product.offerPrice -
                                                            product.price)) /
                                                        product.price
                                                ) / 10
                                            }
                                        />
                                    ) : (
                                        <></>
                                    )}
                                    <div>
                                        {product.offerPrice > 0 ? (
                                            <del className="text-xl text-red-700">
                                                {Intl.NumberFormat(
                                                    "fa-IR"
                                                ).format(product.price)}
                                            </del>
                                        ) : (
                                            <></>
                                        )}
                                        <div className="flex flex-row space-x-5 rtl:space-x-reverse items-center">
                                            <p className="text-4xl font-bold">
                                                {Intl.NumberFormat(
                                                    "fa-IR"
                                                ).format(
                                                    product.offerPrice > 0
                                                        ? product.offerPrice
                                                        : product.price
                                                )}
                                            </p>

                                            <small className="text-xl">
                                                تومان
                                            </small>
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
                                                if (count > 0)
                                                    countHandler((v) => v - 1);
                                            }}
                                            className="bg-prime-300 w-12 rounded-xl"
                                        >
                                            -
                                        </button>
                                        <div className="grow flex items-center justify-center">
                                            <p>
                                                {Intl.NumberFormat(
                                                    "fa-IR"
                                                ).format(count)}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                // TODO fix this and set amount to max person order
                                                if (
                                                    (select?.amount || 100000) >
                                                    count
                                                ) {
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
                                            if (user !== undefined) {
                                                if (
                                                    product.counts.length ===
                                                        0 ||
                                                    select !== undefined
                                                ) {
                                                    if (
                                                        count > 0 ||
                                                        (inCart !== undefined &&
                                                            inCart.count !==
                                                                count)
                                                    ) {
                                                        dispatch(
                                                            addToCartThunk({
                                                                product:
                                                                    product.id,
                                                                select:
                                                                    select?.id ||
                                                                    -1,
                                                                count,
                                                            })
                                                        );

                                                        dispatch(
                                                            setNotif({
                                                                title: "افزودن به سبد خرید",
                                                                message:
                                                                    inCart ===
                                                                    undefined
                                                                        ? `${product.persianName} با موفقیت به سبد خرید شما افزوده شد`
                                                                        : `${product.persianName} با موفقیت ویرایش شد`,
                                                                type:
                                                                    inCart ===
                                                                    undefined
                                                                        ? "success"
                                                                        : "info",
                                                            })
                                                        );
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
                                            } else {
                                                dispatch(
                                                    setNotif({
                                                        title: "احراز هویت",
                                                        message:
                                                            "برای افزودن کالای مورد نظر خود به سبد خرید ابتدا وارد شوید یا ثبت نام کنید",
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
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-full rounded-xl bg-bg-200 p-10
                        flex flex-col space-y-5"
                    >
                        <label>توضیحات : </label>
                        <label className="text-lg">{product.desc}</label>
                    </div>
                    <div
                        style={{
                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(200px, 1fr))",
                        }}
                        className="grid gap-5 mb-10"
                    >
                        {product.data === undefined ? (
                            <></>
                        ) : (
                            Object.entries(product.data).map(
                                ([key, value], index) => (
                                    <ProductDetail
                                        key={`productDetail-${index}`}
                                        name={key}
                                        amount={value}
                                    />
                                )
                            )
                        )}
                    </div>
                    {products && <ProductLists products={products} />}
                    <div className="flex flex-row space-x-5 rtl:space-x-reverse">
                        <div className="w-2/3 h-96 flex flex-col items-center justify-center space-y-5">
                            <BiMessageSquareX className="text-7xl text-gray-500" />
                            <p className="text-xl text-gray-700">
                                در حال حاضر نظری برای این محصول ثبت نشده است
                            </p>
                        </div>
                        <div className="bg-bg-200 rounded-xl w-1/3  relative overflow-hidden space-y-5 p-5 flex flex-col items-center">
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
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

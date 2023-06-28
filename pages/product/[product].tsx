import Footer from "@/components/footer";
import Header from "@/components/header";
import Product from "@/components/product";
import { useAppSelector } from "@/store/HOCs";
import { useRouter } from "next/router";
import { BiMessageSquareX } from "react-icons/bi";

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
    const router = useRouter();
    const user = useAppSelector((store) => store.account.user);
    const productId = router.query.product;

    const tmp = useAppSelector((store) => store.products);
    const product = tmp.find(
        (p) =>
            p.id === (typeof productId === "string" ? parseInt(productId) : -1)
    );

    if (product !== undefined) {
        const products = tmp.filter(
            (p) => p.category === product.category && p.id !== product.id
        );
        return (
            <div className="flex flex-col items-center w-full">
                <Header />
                <div className="space-y-5 p-5 container">
                    <div className="flex flex-row space-x- rtl:space-x-reverse h-96 rounded-xl bg-bg-200">
                        <div className="w-1/2"></div>
                        <div
                            className="w-1/2 p-10 flex
                            items-center justify-between flex-col space-y-7 relative"
                        >
                            <div className="flex flex-col space-y-5 w-full">
                                <label className="text-xl font-bold text-right">
                                    {product.persianName}
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
                                <button className="bg-green-700 p-5 w-72 rounded-xl">
                                    <p className="text-xl font-bold text-white">
                                        افزودن به سبد خرید
                                    </p>
                                </button>
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
                        {Object.entries(product.data).map(
                            ([key, value], index) => (
                                <ProductDetail
                                    key={`productDetail-${index}`}
                                    name={key}
                                    amount={value}
                                />
                            )
                        )}
                    </div>
                    <div
                        className="bg-prime-200 w-full rounded-xl h-96 relative
                        justify-end items-end p-5 flex flex-row space-x-5 rtl:space-x-reverse"
                    >
                        <label className="absolute top-10 right-10 z-10 text-white text-xl">
                            محصولات مشابه
                        </label>
                        {products.map((item) => (
                            <div className="w-64 h-96 -mt-32">
                                <Product {...item} />
                            </div>
                        ))}
                    </div>
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

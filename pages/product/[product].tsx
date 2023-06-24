import Footer from "@/components/footer";
import Header from "@/components/header";
import { useAppSelector } from "@/store/HOCs";
import { useRouter } from "next/router";

function ProductDetail(props: { name: string; amount: string }) {
    return (
        <div className="h-44 bg-white rounded-xl flex items-center justify-center relative">
            <p className="text-xl font-bold">{props.amount}</p>
            <p className="absolute bottom-5 text-gray-500 text-lg">
                {props.name}
            </p>
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
    const productId = router.query.product;

    const product = useAppSelector((store) => store.products).find(
        (p) =>
            p.id === (typeof productId === "string" ? parseInt(productId) : -1)
    );

    if (product !== undefined) {
        return (
            <div className="space-y-5">
                <Header />
                <div className="flex flex-row space-x-5 rtl:space-x-reverse px-5">
                    <div className="h-96 w-1/2 bg-white rounded-xl"></div>
                    <div
                        className="h-96 w-1/2 bg-white rounded-xl p-10 flex
                            items-center justify-between flex-col space-y-7 relative"
                    >
                        <div className="flex flex-col space-y-5 w-full">
                            <label className="text-xl font-bold text-right">
                                {product.persianName}
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
                                            {Intl.NumberFormat("fa-IR").format(
                                                product.price
                                            )}
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
                            <button className="bg-green-700 p-5 w-72 rounded-xl">
                                <p className="text-xl font-bold text-white">
                                    افزودن به سبد خرید
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="px-5">
                    <div
                        className="w-full h-44 rounded-xl bg-white p-5
                        flex flex-row justify-evenly items-center"
                    >
                        <label>{product.desc}</label>
                    </div>
                </div>
                <div
                    style={{
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(200px, 1fr))",
                    }}
                    className="grid gap-5 px-5"
                >
                    {Object.entries(product.data).map(([key, value], index) => (
                        <ProductDetail
                            key={`productDetail-${index}`}
                            name={key}
                            amount={value}
                        />
                    ))}
                </div>
                <div className="p-5">
                    <div className="bg-white w-full rounded-xl h-72 p-5">
                        <label>محصولات مشابه</label>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

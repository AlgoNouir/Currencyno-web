import Header from "@/components/header";
import ProductMenu from "@/components/menu";
import Product from "@/components/product";
import { useAppSelector } from "@/store/HOCs";
import { categoryType } from "@/store/core/slice";
import { Dispatch, SetStateAction, useState } from "react";

export default function ListsPage() {
    const products = useAppSelector((store) => store.products);
    const category = useAppSelector((store) => store.core.category);
    const [filter, filterHandler] = useState(-1);
    return (
        <div className="flex flex-col space-y-5 h-screen">
            <Header />
            <div className="flex flex-row space-x-5 rtl:space-x-reverse grow p-5">
                <div className="bg-bg-200 h-full w-96 rounded-xl overflow-scroll relative scrollbar-hide">
                    <div className=" absolute top-0 left-0 right-0 bottom-0">
                        <ProductMenu />
                    </div>
                </div>
                <div
                    style={{
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(250px, 1fr))",
                    }}
                    className="grid w-full gap-5"
                >
                    {products.map((item, index) => (
                        <div className="h-96">
                            <Product {...item} key={index} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

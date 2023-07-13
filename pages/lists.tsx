import Header from "@/components/UI/header";
import { menuDirector } from "@/components/menu";
import Product from "@/components/store/product";
import { useAppSelector } from "@/store/HOCs";
import { Menu } from "antd";
import { useCallback, useState } from "react";

// TODO get all data in init
export default function ListsPage() {
    const products = useAppSelector((store) => store.products);
    const category = useAppSelector((store) => store.core.category);
    const test = useCallback(() => menuDirector(category), [category]);

    const [filter, filterHandler] = useState(-1);
    return (
        <div className="flex flex-col space-y-5 h-screen">
            <Header />
            <div className="flex flex-row space-x-5 rtl:space-x-reverse grow p-5 pt-36">
                <div className="bg-bg-200 h-[80vh] w-96 rounded-xl overflow-scroll relative scrollbar-hide">
                    <div className=" absolute top-0 left-0 right-0 bottom-0">
                        <div className="w-full items-center justify-center flex">
                            <button
                                onClick={() => filterHandler(-1)}
                                disabled={filter === -1}
                                className={`m-2 bg-prime-200 disabled:bg-gray-300 w-44 px-5 py-2 rounded-xl`}
                            >
                                <p className="text-white">حذف فیلتر</p>
                            </button>
                        </div>
                        <Menu
                            onClick={(e) => filterHandler(parseInt(e.key))}
                            mode="inline"
                            items={test()}
                        />
                    </div>
                </div>
                <div
                    style={{
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(250px, 1fr))",
                    }}
                    className="grid w-full gap-5 overflow-scroll overflow-x-hidden h-[80vh] scrollbar-hide"
                >
                    {products
                        .filter(
                            (item) =>
                                !(filter !== -1 && item.category !== filter)
                        )
                        .map((item, index) => (
                            <div key={index} className="max-h-[450px]">
                                <Product {...item} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

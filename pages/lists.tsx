import Header from "@/components/header";
import Product from "@/components/product";
import { useAppSelector } from "@/store/HOCs";
import { categoryType } from "@/store/core/slice";
import { Dispatch, SetStateAction, useState } from "react";

function Category(props: {
    title: string;
    section: categoryType | number;
    depth: number;
    handler: Dispatch<SetStateAction<number>>;
}) {
    return (
        <ul className="w-full rounded-xl flex items-start flex-col">
            {typeof props.section === "number" ? (
                <button
                    onClick={() => props.handler(props.section)}
                    style={{
                        backgroundColor: props.depth === 0 ? "red" : "",
                        color: props.depth === 0 ? "white" : "",
                        borderBottom:
                            props.depth === 0 ? "" : "1px solid #0002",
                        borderTopWidth:
                            props.depth === 0 ? "" : "1px solid #0002",
                    }}
                    className="mb-5 w-full px-5 py-2 flex items-start"
                >
                    <p>{props.title}</p>
                </button>
            ) : (
                <div className="mx-5 bg-white w-full">
                    {Object.entries(props.section).map(([title, section]) => (
                        <Category
                            title={title}
                            section={section}
                            depth={props.depth + 1}
                        />
                    ))}
                </div>
            )}
        </ul>
    );
}

export default function ListsPage() {
    const products = useAppSelector((store) => store.products);
    const category = useAppSelector((store) => store.core.category);
    const [filter, filterHandler] = useState(-1);
    return (
        <div className="flex flex-col space-y-5 h-screen">
            <Header />
            <div className="flex flex-row space-x-5 rtl:space-x-reverse grow p-5">
                <div className="bg-bg-200 h-full w-96 rounded-xl p-5 overflow-scroll">
                    {Object.entries(category).map(([name, data]) => (
                        <Category
                            title={name}
                            section={data}
                            depth={0}
                            handler={filterHandler}
                        />
                    ))}
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

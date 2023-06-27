import Header from "@/components/header";
import Product from "@/components/product";
import { useAppSelector } from "@/store/HOCs";

export default function ListsPage() {
    const products = useAppSelector((store) => store.products);
    return (
        <div className="flex flex-col space-y-5 h-screen">
            <Header />
            <div className="flex flex-row space-x-5 rtl:space-x-reverse grow p-5">
                <div className="bg-bg-200 h-full w-96 rounded-xl p-5">
                    <p>فیلتر انجام کار</p>
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

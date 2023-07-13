import Footer from "@/components/UI/footer";
import Header from "@/components/UI/header";
import Banner from "@/components/UI/banner";
import ProductLists from "@/components/store/productsList";
import { useAppSelector } from "@/store/HOCs";

export default function MainPage() {
    const products = useAppSelector((store) => store.products);
    return (
        <div className="flex flex-col items-center pt-36">
            <Header />
            <div className="container p-5 space-y-5">
                <Banner images={[["full", ""]]} />
                <ProductLists
                    products={products}
                    title={{ name: "انتخاب هوش مصنوعی" }}
                />
                <Banner
                    images={[
                        ["1/2", ["", "", ""]],
                        ["1/2", ""],
                    ]}
                />
                <Banner images={[["full", ["", "", ""]]]} />
                <Banner
                    images={[
                        ["1/2", ["", "", ""]],
                        ["1/2", ""],
                    ]}
                />
                <Banner
                    images={[
                        ["1/2", ["", "", ""]],
                        ["1/2", ""],
                    ]}
                />
            </div>
            <Footer />
        </div>
    );
}

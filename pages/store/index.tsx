import Header from "@/components/header";
import Banner from "@/components/store/banner";
import ProductLists from "@/components/store/productsList";

export default function MainPage() {
    return (
        <div className="flex flex-col items-center pt-36">
            <Header />
            <div className="container p-5 space-y-5">
                <ProductLists
                    products={[1, 2, 4, 5, 6]}
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
        </div>
    );
}

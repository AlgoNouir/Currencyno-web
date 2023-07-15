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
                <Banner images={[["1", "2", "3"]]} />
                <ProductLists
                    products={products.filter(
                        (product) =>
                            product.counts.reduce(
                                (obj, p) => p.amount + obj,
                                0
                            ) < 4
                    )}
                    title={{ name: "پرفروش ترین ها", moreDir: "lists" }}
                />
                <Banner images={["2", "3"]} />
                <ProductLists
                    products={products
                        .filter((product) => product.offerPrice !== 0)
                        .sort((product) => product.offerPrice - product.price)
                        .reverse()}
                    title={{ name: "بیشترین تخفیفات", moreDir: "lists" }}
                />
                <Banner images={[["1", "1", "1"]]} />
                <ProductLists
                    products={products.filter(
                        (product) => product.category === 39
                    )}
                    title={{ name: "لپتاب استوک", moreDir: "lists" }}
                />
            </div>
            <Footer />
        </div>
    );
}

import Footer from "@/components/UI/footer";
import Header from "@/components/UI/header";
import Banner from "@/components/UI/banner";
import ProductLists from "@/components/store/productsList";
import { useAppSelector } from "@/store/HOCs";

export default function MainPage() {
  const products = useAppSelector((store) => store.products);
  return (
    <div className="flex flex-col items-center pt-36 bg-storePattern">
      <Header state={0} />
      <div className="sm:container p-5 space-y-2 sm:space-y-5">
        <Banner
          images={[
            [
              { src: "store/1.jpg" },
              { src: "store/4.jpg" },
              { src: "store/5.png" },
            ],
          ]}
        />
        <ProductLists
          products={products.filter(
            (product) =>
              product.counts.reduce((obj, p) => p.amount + obj, 0) < 4
          )}
          title={{ name: "پرفروش ترین ها", moreDir: "lists/all" }}
        />
        <Banner images={[{ src: "store/2.jpg" }]} />
        <ProductLists
          products={products
            .filter((product) => product.offerPrice !== 0)
            .sort((product) => product.offerPrice - product.price)
            .reverse()}
          title={{ name: "بیشترین تخفیفات", moreDir: "lists/all" }}
        />
        <Banner images={[[{ src: "store/3.jpg" }, { src: "store/6.png" }]]} />
        <ProductLists
          products={products.filter((product) => product.category === 61)}
          title={{ name: "لبتاپ استوک", moreDir: "lists/61" }}
        />
      </div>
      <Footer />
    </div>
  );
}

import Footer from "@/components/UI/footer";
import Header from "@/components/UI/header";
import Banner from "@/components/UI/banner";
import ProductLists from "@/components/store/productsList";
import { useAppSelector } from "@/store/HOCs";
import { NextSeo } from "next-seo";

export default function MainPage() {
  const products = useAppSelector((store) => store.products);
  return (
    <>
      <NextSeo description="Home page description of the page" />
      <div className="flex flex-col items-center pt-36 bg-storePattern">
        <Header state={0} />
        <div className="sm:container p-5 space-y-2 sm:space-y-5">
          <Banner
            images={[
              [
                { src: "store/1.jpg", url: "/lists/51" },
                { src: "store/4.jpg", url: "/lists/61" },
                { src: "store/5.png", url: "/lists/11" },
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
          <Banner images={[{ src: "store/2.jpg", url: "/lists/52" }]} />
          <ProductLists
            products={products
              .filter((product) => product.offerPrice !== 0)
              .sort((product) => product.offerPrice - product.price)
              .reverse()}
            title={{ name: "بیشترین تخفیفات", moreDir: "lists/all" }}
          />
          <Banner
            images={[
              [
                { src: "store/3.jpg", url: "/lists/30" },
                { src: "store/6.png", url: "/lists/53" },
              ],
            ]}
          />
          <ProductLists
            products={products.filter((product) => product.category === 61)}
            title={{ name: "لپتاپ استوک", moreDir: "lists/61" }}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

import Footer from "@/components/UI/footer";
import Header from "@/components/UI/header";
import Banner from "@/components/UI/banner";
import ProductLists from "@/components/store/productsList";
import { useAppSelector } from "@/store/HOCs";

export default function MainPage() {
    const products = useAppSelector((store) => store.products);
    return (
        <div className="flex flex-col items-center pt-36 space-y-5">
            <Header />
            <div className="container w-full space-y-5">
                <div className="grid grid-cols-3 gap-5">
                    <button className="bg-amber-400 h-24 rounded-xl">
                        <label className="text-2xl font-bold">
                            خرید کتاب های اقتصادی و بازار های مالی
                        </label>
                    </button>
                    <button className="bg-amber-400 h-24 rounded-xl">
                        <label className="text-2xl font-bold">
                            ویدیو های آموزشی بازار های مالی
                        </label>
                    </button>
                    <button className="bg-amber-400 h-24 rounded-xl">
                        <label className="text-2xl font-bold">
                            رزرو خدمات فضای اشتراکی
                        </label>
                    </button>
                </div>
                <Banner images={["academy/2.png"]} />
                <ProductLists
                    products={products.filter(
                        (product) => product.category === 42
                    )}
                    title={{
                        name: "کتاب های بازار های مالی و اقتصادی",
                        moreDir: "/lists",
                    }}
                />
            </div>
            <div className="bg-amber-400 p-5 w-screen flex items-center justify-center">
                <div className="container">
                    <label className="text-center text-4xl leading-relaxed line-clamp-3">
                        آکادمی اقتصادی کارنسینو با بهره گیری از اساتید مجرب در
                        حوزه آموزشی بازار های مالی و ایجاد فضای اشتراکی کاری
                        آماده ارائه خدمات به همشهریان عزیز می باشد.
                    </label>
                </div>
            </div>
            <div className="container w-full space-y-5">
                <Banner
                    images={[
                        ["academy/3.jpg", "academy/4.jpg", "academy/5.jpg"],
                    ]}
                />
                <ProductLists
                    products={products.filter(
                        (product) => product.category === 42
                    )}
                    title={{
                        name: "فیلم های آموزشی بازار های مالی",
                        moreDir: "/lists",
                    }}
                />
            </div>
            <Footer />
        </div>
    );
}

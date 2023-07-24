import Footer from "@/components/UI/footer";
import Header from "@/components/UI/header";
import Banner from "@/components/UI/banner";
import ProductLists from "@/components/store/productsList";
import { useAppSelector } from "@/store/HOCs";
import ReserveModal from "@/components/academy/reserve";
import { useState } from "react";

export default function MainPage() {
    const products = useAppSelector((store) => store.products);
    const [reserveModal, reserveModalHandler] = useState(false);
    return (
        <>
            <div className="flex flex-col items-center pt-36 space-y-5 bg-academyPattern">
                <Header state={1} />
                <div className="sm:container p-5 w-full space-y-5">
                    <div className="grid sm:grid-cols-3 gap-5">
                        <button className="bg-amber-400 h-24 rounded-xl">
                            <label className="text-lg sm:text-2xl font-bold">
                                خرید کتاب های اقتصادی و بازار های مالی
                            </label>
                        </button>
                        <button className="bg-amber-400 h-24 rounded-xl">
                            <label className="text-lg sm:text-2xl font-bold">
                                ویدیو های آموزشی بازار های مالی
                            </label>
                        </button>
                        <button
                            onClick={() => reserveModalHandler(true)}
                            className="bg-amber-400 h-24 rounded-xl"
                        >
                            <label className="text-lg sm:text-2xl font-bold">
                                رزرو خدمات فضای اشتراکی
                            </label>
                        </button>
                    </div>
                    <Banner
                        images={[
                            [
                                "academy/8.jpg",
                                "academy/9.jpg",
                                "academy/10.jpg",
                            ],
                        ]}
                    />
                    <ProductLists
                        products={products.filter(
                            (product) => product.category === 42
                        )}
                        title={{
                            name: "کتاب های بازار های مالی و اقتصادی",
                            moreDir: "/lists",
                        }}
                    />
                    <div className="bg-amber-300 rounded-xl p-5">
                        <p className="sm:text-2xl text-lg leading-loose text-justify">
                            آیا به دنبال افزایش دانش و مهارت‌های خود در زمینه
                            اقتصاد و مالی هستید؟ آیا به دنبال بهبود عملکرد
                            شرکت‌تان و افزایش راندمان کاری همکارانتان می‌باشید؟
                            اگر پاسخ شما بله است، آکادمی اقتصادی و مالی کارنسینو
                            می‌تواند بهتان کمک کند. آکادمی اقتصادی و مالی یک
                            موسسه آموزشی است که به ارائه دوره‌های آموزشی در
                            زمینه‌های مرتبط با اقتصاد و مالی برای کارآفرینان،
                            مدیران و علاقمندان می‌پردازد. این موسسه با هدف
                            افزایش دانش و مهارت‌های افراد در زمینه اقتصادی و
                            مالی تاسیس شده است.
                        </p>
                    </div>
                    <Banner
                        images={[
                            ["academy/3.jpg", "academy/4.jpg", "academy/5.jpg"],
                        ]}
                    />
                    <div className="bg-amber-300 rounded-xl p-5">
                        <p className="sm:text-2xl text-lg leading-loose text-justify">
                            در آکادمی اقتصادی و مالی کارنسینو ، دوره‌های متنوعی
                            از جمله دوره‌های مدیریت مالی، تحلیل و برنامه‌ریزی
                            مالی، مدیریت ریسک، بازاریابی و فروش، مدیریت منابع
                            انسانی و دیگر زمینه‌های مرتبط با اقتصاد و مالی ارائه
                            می‌شود. این دوره‌ها به صورت حضوری و آنلاین برگزار
                            می‌شوند و با توجه به نیاز و سطح دانش شرکت‌کنندگان،
                            در سطوح مختلفی از مقدماتی تا پیشرفته برگزار می‌شوند.
                            آکادمی اقتصادی و مالی کارنسینو از متخصصان مجرب و
                            متعهد در زمینه اقتصاد و مالی استفاده می‌کند که به
                            شما کمک می‌کنند تا بهترین روش‌ها و راهکارهای اقتصادی
                            و مالی را برای کسب و کارتان پیاده کنید. با شرکت در
                            دوره‌های آموزشی آکادمی اقتصادی و مالی، شما قادر
                            خواهید بود تا دانش و مهارت‌های خود را در زمینه
                            اقتصاد و مالی بهبود دهید و به بهبود عملکرد شرکت خود
                            کمک کنید.
                        </p>
                    </div>
                    {/* <ProductLists
                        products={products.filter(
                            (product) => product.category === 42
                        )}
                        title={{
                            name: "فیلم های آموزشی بازار های مالی",
                            moreDir: "/lists",
                        }}
                    /> */}
                    <div className="bg-amber-300 rounded-xl p-5">
                        <p className="text-2xl text-center leading-loose">
                            بنابراین، اگر به دنبال ارتقای دانش و مهارت‌های خود
                            در زمینه اقتصاد و مالی هستید و به دنبال بهبود عملکرد
                            شرکت‌تان می‌باشید، آکادمی اقتصادی و مالی می‌تواند
                            گزینه مناسبی برای شما باشد.
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
            <ReserveModal open={reserveModal} handler={reserveModalHandler} />
        </>
    );
}

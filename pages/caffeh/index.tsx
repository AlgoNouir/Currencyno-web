import Banner from "@/components/UI/banner";
import Banner2 from "@/components/UI/banner";
import Footer from "@/components/UI/footer";
import Header from "@/components/UI/header";
import Image from "next/image";
import { AiFillCheckCircle } from "react-icons/ai";

function ImageBaner(props: { image: string }) {
    return (
        <Image
            src={`https://currencyno.storage.iran.liara.space/Banners/caffeh/${props.image}`}
            width="0"
            height="0"
            alt={props.image}
            sizes="100wv"
            className="w-full h-full rounded-xl"
        />
    );
}

export default function MainPage() {
    return (
        <div className="flex flex-col items-center pt-36">
            <div className=" opacity-pattern bg-caffeePateren absolute w-full h-full -z-20"></div>
            <Header />
            <div className="container w-full p-5 space-y-5">
                <Banner images={[""]} />
                <div className="bg-white p-10 text-3xl leading-relaxed flex flex-col space-y-5 items-center justify-center">
                    <label className="text-4xl font-bold">کافه کارآفرینی</label>
                    <label className="text-center">
                        مجموعه کافه کارآفرینی دارای محیطی آرام و دنج جهت مطالعه
                        و استفاده به عنوان فضای اشتراکی کاری و انواع نوشیدنی های
                        سرد و گرم ، غذا های گرم (فیله،اسنک،پاستا) ، آماده ارائه
                        خدمات به شهروندان عزیز میباشد. این محیط اغلب میزبان
                        اساتید موسیقی استان میباشد که موسیقی زنده سولو نواخته
                        میشود
                    </label>
                </div>
                <div className="grid grid-cols-4 w-full h-full gap-5">
                    {[
                        "1.jpg",
                        "2.jpg",
                        "3.jpg",
                        "4.jpg",
                        "5.jpg",
                        "6.jpg",
                        "10.jpg",
                        "8.jpg",
                    ].map((image, index) => (
                        <ImageBaner key={index} image={image} />
                    ))}
                </div>
                <div className="bg-white p-10 space-y-5 rounded-xl text-3xl">
                    {[
                        "سرو تخصصی انواع نوشیدنی سرد و گرم و انواع غذا",
                        "محیطی آرام و خاطره انگیز برای ایده پردازی کار آفرینان",
                        "دارای فضای اختصاصی  برای جلسات کاری کار آفرینان",
                        "رزور و پذیرایی برای انواع جشن و تولد ها به خصوص کارآفرینان",
                        "امکان ثبت سفارش آنلاین غذا و نوشیدنی برای ارگان ها",
                        "تشکیل event های مختلف بعد از ساعت 6 عصر (بازی مافیا و ...)",
                        "حضور هنرمندان در کافه کارآفرینی در روز های معین با امکان مشاوره برای عموم.",
                        "حضور کارآفرینان استانی در کافه و مشاوره و راهنمایی عزیزان",
                        "حضور صاحبان کسب و کار موفق در کافه کارآفرین",
                    ].map((d, index) => (
                        <div
                            className="flex flex-row items-center space-x-5 rtl:space-x-reverse"
                            key={`data_${index}`}
                        >
                            <AiFillCheckCircle className="text-5xl text-green-400" />
                            <label>{d}</label>
                        </div>
                    ))}
                </div>
                <div className="bg-amber-300 p-10 space-y-5 rounded-xl text-3xl items-center justify-center flex">
                    <label className="text-center">
                        همه روزه از ساعت 10 صبح تا 11 شب می تونید تو کافه تون
                        باشین و لذت ببرین!
                    </label>
                </div>
                <Banner images={[["", "", "", ""]]} />
            </div>
            <Footer />
        </div>
    );
}

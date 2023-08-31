import Banner from "@/components/UI/banner";
import { FaRegHandPointLeft, FaRegHandPointRight } from "react-icons/fa";
import Footer from "@/components/UI/footer";
import Header from "@/components/UI/header";
import Image from "next/image";
import { AiFillCheckCircle } from "react-icons/ai";
import ReserveModal from "@/components/caffee/reserve";
import { useState } from "react";

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
  const [reserve, reserveHandler] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center pt-36 bg-caffeePateren">
        <Header state={2} />
        <div className="sm:container w-full  p-5 space-y-5">
          <Banner
            images={[
              [
                { src: "caffeh/topBanners/2.jpg" },
                { src: "caffeh/topBanners/1.jpg" },
                { src: "caffeh/topBanners/3.jpg" },
              ],
            ]}
          />
          <div
            className="bg-white p-10 leading-relaxed flex flex-col space-y-5 items-center justify-center
                        sm:text-2xl lg:text-3xl"
          >
            <label className="sm:text-4xl font-bold">کافه کارآفرینی</label>
            <label className="text-center">
              مجموعه کافه کارآفرینی دارای محیطی آرام و دنج جهت مطالعه و استفاده
              به عنوان فضای اشتراکی کاری و انواع نوشیدنی های سرد و گرم ، غذا های
              گرم (فیله،اسنک،پاستا) ، آماده ارائه خدمات به شهروندان عزیز میباشد.
              این محیط اغلب میزبان اساتید موسیقی استان میباشد که موسیقی زنده
              سولو نواخته میشود
            </label>
            <div className="flex flex-row justify-between text-2xl sm:text-3xl lg:text-5xl items-center space-x-5 rtl:space-x-reverse">
              <FaRegHandPointLeft />
              <button
                onClick={() => reserveHandler(true)}
                className="bg-amber-400 p-5 rounded-xl text-xs xl:text-xl font-bold"
              >
                برای مراسمات رزور کنید
              </button>
              <FaRegHandPointRight />
            </div>
          </div>
          <div className="grid grid-cols-4 w-full h-full gap-2 sm:gap-5">
            {[
              "1.jpg",
              "2.jpg",
              "3.jpg",
              "4.jpg",
              "5.jpg",
              "6.jpg",
              "10.jpg",
              "8.jpg",
              "9.jpg",
              "11.jpg",
              "7.jpg",
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
                className="flex flex-row items-center space-x-5 rtl:space-x-reverse text-sm sm:text-xl"
                key={`data_${index}`}
              >
                <AiFillCheckCircle className="sm:text-5xl text-green-400" />
                <label>{d}</label>
              </div>
            ))}
          </div>
          <div className="bg-amber-300 p-10 space-y-5 rounded-xl text-3xl items-center justify-center flex">
            <label className="text-center text-xs sm:text-lg ">
              همه روزه از ساعت 10 صبح تا 11 شب می تونید تو کافه تون باشین و لذت
              ببرین!
            </label>
          </div>
          <Banner images={[{ src: "caffeh/topBanners/5.jpg" }]} />
          <Banner
            images={[
              [
                { src: "caffeh/topBanners/6.jpg" },
                { src: "caffeh/topBanners/4.jpg" },
              ],
            ]}
          />
        </div>
        <Footer />
      </div>
      <ReserveModal open={reserve} handler={reserveHandler} />
    </>
  );
}

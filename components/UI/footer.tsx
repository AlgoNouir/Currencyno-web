import { BsFillTelephoneFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function Icon(props: { text: string; icon: any; url?: string }) {
  const router = useRouter();
  return (
    <button
      disabled={props?.url === undefined}
      onClick={
        props?.url === undefined
          ? () => {}
          : () => window.open(props.url, "_blank")
      }
      className="flex flex-row space-x-5 rtl:space-x-reverse items-center"
    >
      <div className="lg:w-16 w-9 lg:h-16 h-9 items-center justify-center flex text-3xl">
        {props.icon}
      </div>
      <label className="text-xs sm:text-sm xl:text-xl font-bold">
        {props.text}
      </label>
    </button>
  );
}

export default function Footer() {
  return (
    <div
      className="bg-bg-300 rounded-t-xl w-screen flex overflow-hidden
            items-center justify-end flex-col p-5 pt-16 space-y-5"
    >
      <div className="flex flex-col lg:flex-row w-full items-center justify-between lg:px-10 max-lg:space-y-5 lg:space-x-5 rtl:space-x-reverse">
        <div className="lg:w-1/3 w-full space-y-5 flex flex-col">
          <p className="text-xs sm:text-sm xl:text-xl text-justify">
            مجموعه کارنسینو با بیش از یک دهه فعالیت و تجربه در ارائه خدمات فروش
            لوازم جانبی کامپیوتر و موبایل ، فروش لپ تاپ استوک و تعمیرات انواع
            کامپیوتر، لپ تاپ،موبایل، و کنسول های بازی می باشد. این فروشگاه با
            پایبندی به اصل های ارائه هر چه سریعتر خدمات ، تضمین اصالت کالا و تست
            هر نوع محصول خریداری شده قبل از ارسال و ارائه فیلم محصول در صورت
            درخواست مشتری راه اندازی شده است . کارشناسان ما آماده پاسخگویی و
            مشاوره خرید قبل از خرید میباشند. تمام روز های هفته به جز روز های
            تعطیل از ساعت 10 صبح الی 20 پاسخگوی شما هستیم .
          </p>
        </div>
        <div className="flex flex-col items-center xl:justify-evenly xl:w-2/3 justify-center sm:flex-row space-y-5 sm:space-y-0 sm:space-x-5 rtl:space-x-reverse">
          <div className="flex flex-col space-y-5">
            <Icon
              text="نماد اعتماد"
              icon={
                <div className="lg:w-16 w-9 lg:h-16 h-9 items-center justify-center flex rounded-xl bg-white text-lg lg:text-3xl">
                  <a
                    referrerPolicy="origin"
                    target="_blank"
                    href="https://trustseal.enamad.ir/?id=284371&amp;Code=gBjq7O5O8goWmRHZYK1Y"
                  >
                    <img
                      referrerPolicy="origin"
                      src="https://Trustseal.eNamad.ir/logo.aspx?id=284371&amp;Code=gBjq7O5O8goWmRHZYK1Y"
                      alt=""
                      style={{ cursor: "pointer" }}
                      id="gBjq7O5O8goWmRHZYK1Y"
                    />
                  </a>
                </div>
              }
            />
            <Icon
              text="۰۹۳۹۶۵۵۴۳۷۰ - ۰۹۱۴۹۵۲۰۶۰۸"
              icon={<Image src={require("@/public/eita.png")} alt="ایتا" />}
            />
            <Icon
              text="۰۹۳۹۶۵۵۴۳۷۰ - ۰۹۱۴۹۵۲۰۶۰۸"
              url="tel:09396554370"
              icon={
                <div className="lg:w-16 w-9 lg:h-16 h-9 items-center justify-center flex rounded-xl bg-green-400 text-lg lg:text-3xl text-white">
                  <BsFillTelephoneFill />
                </div>
              }
            />
            <Icon
              text="currencyno_plus"
              url="https://instagram.com/currencyno_plus"
              icon={
                <Image src={require("@/public/instaLogo.png")} alt="اینستاگرام" />
              }
            />
          </div>
          <div className="h-96 rounded-xl w-96 overflow-hidden">
            <div
              style={{
                overflow: "hidden",
                maxWidth: "100%",
                width: "500px",
                height: "500px",
              }}
            >
              <div
                id="g-mapdisplay"
                style={{
                  height: "100%",
                  width: "100%",
                  maxWidth: "100%",
                }}
              >
                <iframe
                  style={{
                    height: "100%",
                    width: "100%",
                    border: "0",
                  }}
                  src="https://www.google.com/maps/embed/v1/search?q=38.24185415827948,48.29008340835571&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                ></iframe>
              </div>
              <a
                className="google-map-code-enabler"
                href="https://www.bootstrapskins.com/themes"
                id="enable-map-data"
              >
                premium bootstrap themes
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col items-center justify-center max-lg:space-y-2 lg:space-x-2 rtl:space-x-reverse">
        <p className="text-center">
          تمام حقوق این وبسایت متعلق به شرکت تحلیلگران نگرش نو تجارت است. ۱۴۰۳
        </p>
      </div>
    </div>
  );
}

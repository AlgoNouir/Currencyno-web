import { BsFillTelephoneFill, BsInstagram } from "react-icons/bs";
import Image from "next/image";

function Icon(props: { text: string; icon: any }) {
    return (
        <div className="flex flex-row space-x-5 rtl:space-x-reverse items-center">
            <div className="w-16 h-16 items-center justify-center flex text-3xl">
                {props.icon}
            </div>
            <label className="text-2xl font-bold">{props.text}</label>
        </div>
    );
}

export default function Footer() {
    return (
        <div
            className="bg-bg-300 rounded-t-xl w-screen flex 
            items-center justify-end flex-col p-5 pt-16 space-y-5"
        >
            <div className="flex flex-row w-full items-center justify-between px-24">
                <div className="w-1/3 space-y-5 flex flex-col">
                    <p className="text-2xl text-justify">
                        مجموعه کارنسینو با بیش از یک دهه فعالیت و تجربه در ارائه
                        خدمات فروش لوازم جانبی کامپیوتر و موبایل ، فروش لپ تاپ
                        استوک و تعمیرات انواع کامپیوتر، لپ تاپ،موبایل، و کنسول
                        های بازی می باشد. این فروشگاه با پایبندی به اصل های
                        ارائه هر چه سریعتر خدمات ، تضمین اصالت کالا و تست هر نوع
                        محصول خریداری شده قبل از ارسال و ارائه فیلم محصول در
                        صورت درخواست مشتری راه اندازی شده است . کارشناسان ما
                        آماده پاسخگویی و مشاوره خرید قبل از خرید میباشند. تمام
                        روز های هفته به جز روز های تعطیل از ساعت 10 صبح الی 20
                        پاسخگوی شما هستیم .
                    </p>
                </div>
                <div className="flex flex-col space-y-5">
                    <Icon
                        text="۰۹۳۹۶۵۵۴۳۷۰ - ۰۹۱۴۹۵۲۰۶۰۸"
                        icon={
                            <Image
                                src={require("@/public/eita.png")}
                                alt="ایتا"
                            />
                        }
                    />
                    <Icon
                        text="۰۹۳۹۶۵۵۴۳۷۰ - ۰۹۱۴۹۵۲۰۶۰۸"
                        icon={
                            <div className="h-16 w-16 items-center justify-center flex rounded-xl bg-green-400 text-3xl text-white">
                                <BsFillTelephoneFill />
                            </div>
                        }
                    />
                    <Icon
                        text="currencyno_plus"
                        icon={
                            <Image
                                src={require("@/public/instaLogo.png")}
                                alt="اینیستاگرام"
                            />
                        }
                    />
                </div>
                <div className="h-96 rounded-xl w-96/run/media/nora/06BA7C38BA7C2679/متن تعمیرات.docx overflow-hidden">
                    {/* <a
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
                    </a> */}
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
            <p>
                تمام حقوق این وبسایت متعلق به شرکت تحلیلگران نگرش نو تجارت است.
                ۱۴۰۳
            </p>
        </div>
    );
}

import Banner from "@/components/UI/banner";
import Footer from "@/components/UI/footer";
import Header from "@/components/UI/header";
import AddWorkModal from "@/components/work/requestWork";
import { useState } from "react";

export default function MainPage() {
    const [addWork, addWorkHandler] = useState(false);
    const [requestWork, requestWorkHandler] = useState(false);
    return (
        <>
            <div className="flex flex-col items-center pt-36 bg-workPattern">
                <Header state={3} />
                <div className="p-5 space-y-5 container">
                    <div className="flex flex-row space-x-5 rtl:space-x-reverse">
                        <button
                            onClick={() => addWorkHandler(true)}
                            className="bg-amber-400 grow text-3xl p-5 rounded-xl"
                        >
                            درج آگهی استخدام
                        </button>
                        <button
                            onClick={() => requestWorkHandler(true)}
                            className="bg-amber-400 grow text-3xl p-5 rounded-xl"
                        >
                            ثبت نام کارجو
                        </button>
                    </div>
                    <Banner images={[""]} />
                    <Banner images={[""]} />
                    <Banner images={[""]} />
                    <Banner images={[""]} />
                    <Banner images={[""]} />
                </div>
                <Footer />
            </div>
            <AddWorkModal open={addWork} handler={addWorkHandler} />
            <AddWorkModal open={requestWork} handler={requestWorkHandler} />
        </>
    );
}

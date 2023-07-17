// main
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

// components & icons
import { MdOutlineTask, MdOutlineWorkOutline } from "react-icons/md";
import Banner from "@/components/UI/banner";
import Footer from "@/components/UI/footer";
import Header from "@/components/UI/header";
import AddWorkModal from "@/components/work/addWork";
import RequestWorkModal from "@/components/work/requestWork";

function ActionButton(props: {
    handler: Dispatch<SetStateAction<boolean>>;
    title: string;
    icon: ReactNode;
}) {
    return (
        <button
            className="bg-amber-400 grow text-3xl p-5 rounded-xl flex items-center 
            justify-center space-x-5 rtl:space-x-reverse"
            onClick={() => props.handler(true)}
        >
            <label>{props.title}</label>
            {props.icon}
        </button>
    );
}

export default function MainPage() {
    const [addWork, addWorkHandler] = useState(false);
    const [requestWork, requestWorkHandler] = useState(false);
    return (
        <>
            <div className="flex flex-col items-center pt-36 bg-workPattern">
                <Header state={3} />
                <div className="p-5 space-y-5 container">
                    <Banner images={[["", "", "", ""]]} />
                    <div className="flex flex-row space-x-5 rtl:space-x-reverse">
                        <ActionButton
                            icon={<MdOutlineWorkOutline />}
                            title="درج آگهی استخدام"
                            handler={addWorkHandler}
                        />
                        <ActionButton
                            icon={<MdOutlineTask />}
                            title="ثبت نام کارجو"
                            handler={requestWorkHandler}
                        />
                    </div>
                    <Banner images={[""]} />
                    <Banner images={[""]} />
                    <Banner images={[""]} />
                    <Banner images={[""]} />
                </div>
                <Footer />
            </div>
            <RequestWorkModal open={addWork} handler={addWorkHandler} />
            <AddWorkModal open={requestWork} handler={requestWorkHandler} />
        </>
    );
}

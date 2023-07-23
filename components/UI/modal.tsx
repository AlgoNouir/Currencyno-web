import { ReactNode } from "react";
import { GrClose } from "react-icons/gr";

export default function Modal(props: {
    handler: any;
    open: boolean;
    children: ReactNode;
    title: string;
}) {
    return props.open ? (
        <div
            className="fixed z-30 h-screen top-0 w-screen
            backdrop-blur flex items-center justify-center bg-black/10"
        >
            <div
                className="bg-bg-200 rounded-xl relative xl:w-1/2 max-lg:h-full
                space-y-5 flex flex-col items-center px-5 pb-10 overflow-scroll"
            >
                <div className="flex flex-row items-center justify-center p-5 w-full">
                    <button
                        onClick={() => {
                            props.handler(false);
                        }}
                        className="absolute left-5"
                    >
                        <GrClose className="text-xl" />
                    </button>
                    <p className="text-xl">{props.title}</p>
                </div>
                {props.children}
            </div>
        </div>
    ) : (
        <></>
    );
}

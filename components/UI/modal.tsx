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
            className="absolute z-[9999999] h-screen top-0 w-screen
            backdrop-blur flex items-center justify-center bg-black/10"
        >
            <div
                className="bg-bg-200 rounded-xl relative w-1/2
                space-y-5 flex flex-col items-center px-5 pb-10"
            >
                <div className="flex flex-row items-center justify-center p-5">
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

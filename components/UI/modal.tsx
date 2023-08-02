import { ReactNode } from "react";
import { GrClose } from "react-icons/gr";

export default function Modal(props: {
  handler: any;
  open: any;
  children: ReactNode;
  title: string;
}) {
  return props.open ? (
    <div
      className="fixed z-30 h-screen top-0 w-screen left-0 right-0 bottom-0
            backdrop-blur flex items-center justify-center bg-black/10"
    >
      <div
        className="bg-bg-200 rounded-xl relative xl:w-fit max-lg:h-full w-full max-h-screen
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

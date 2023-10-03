import Image from "next/image";

export default function TextBanner(props: {
  images: string;
  text: string;
  reverse?: boolean;
}) {
  return (
    <div
      className="flex xl:flex-row flex-col items-center justify-center space-y-5 
            xl:space-y-0 xl:space-x-5 rtl:space-x-reverse h-full"
    >
      <div className="xl:w-1/2 w-full bg-amber-300 p-6  rounded-xl flex h-96">
        <label className="xl:text-2xl text-justify rounded-xl xl:leading-10">
          {props.text}
        </label>
      </div>
      <div className="w-full xl:w-1/2 h-full">
        <div className="grow bg-primary-700 rounded-xl h-96 overflow-hidden flex items-center justify-center">
          {props.images === "" ? (
            <div className="h-96"></div>
          ) : (
            <Image
              alt={props.images}
              src={`https://currencyno.storage.iran.liara.space/Banners/${props.images}`}
              width="0"
              height="0"
              sizes="100vw"
              className="h-full w-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
}

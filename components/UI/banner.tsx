import { Carousel } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";

function CustomImage(props: { src: string; url?: string }) {
  const router = useRouter();
  return props.url === undefined ? (
    <Image
      alt={props.src}
      src={`https://currencyno.storage.iran.liara.space/Banners/${props.src}`}
      width="0"
      height="0"
      sizes="100vw"
      className="w-full h-auto"
    />
  ) : (
    <button onClick={() => router.push(props.url || "")}>
      <Image
        alt={props.src}
        src={`https://currencyno.storage.iran.liara.space/Banners/${props.src}`}
        width="0"
        height="0"
        sizes="100vw"
        className="w-full h-auto"
      />
    </button>
  );
}

type imageType = {
  src: string;
  url?: string;
};

export default function Banner(props: { images: (imageType | imageType[])[] }) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-${props.images.length} gap-5`}
    >
      {props.images.map((img, index) =>
        !Array.isArray(img) ? (
          <div
            key={`banner_${index}`}
            className="grow bg-primary-700 rounded-xl overflow-hidden flex items-center justify-center"
          >
            <CustomImage {...img} />
          </div>
        ) : (
          <div key={`banner_${index}`} className="rounded-xl overflow-hidden">
            <Carousel autoplay dots={{ className: "p-5" }}>
              {img.map((image, index) => (
                <div
                  className="items-center justify-center flex h-full"
                  key={index}
                >
                  <div
                    className="bg-primary-500 items-center rounded-xl text-5xl
                                        font-bold justify-center flex text-white overflow-hidden"
                  >
                    <CustomImage {...image} />
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        )
      )}
    </div>
  );
}

import Image from "next/image";

export default function CustomImage(props: { name: string }) {
  return (
    <Image
      alt={props.name}
      src={`https://currencyno.storage.iran.liara.space/${props.name}`}
      width={300}
      height={700}
      className="h-64 object-contain"
    />
  );
}

import { useAppSelector } from "@/store/HOCs";
import { categoryType } from "@/store/account/slice";
import { useRouter } from "next/router";

function Section(props: { title: string; data: categoryType[] }) {
  const router = useRouter();
  return props.data.length > 0 ? (
    <div className="flex flex-col space-y-2 w-44">
      <p className="border-b-2 pb-2">{props.title}</p>
      {props.data.map((cat, index) => (
        <button
          key={`item-${index}`}
          className="bg-primary-200 p-2 rounded-xl hover:bg-primary-100 transition-all"
          onClick={() => router.push(`/lists/${cat.id}`)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  ) : (
    <></>
  );
}

export default function MegaMenu() {
  const category = useAppSelector((store) => store.account.category);

  return (
    <div className="items-center justify-center top-36 border fixed w-screen xl:group-hover:flex hidden left-0">
      <div
        className=" shadow-xl rounded-xl p-5 flex flex-row
       bg-white space-x-5 rtl:space-x-reverse"
      >
        {category
          .filter((cat) => cat.parent === null)
          .map((cat, index) => (
            <Section
              key={`section-${index}`}
              title={cat.name}
              data={category.filter((catcat) => cat.id === catcat.parent)}
            />
          ))}
      </div>
    </div>
  );
}

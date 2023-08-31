import Footer from "@/components/UI/footer";
import Header from "@/components/UI/header";
import { menuDirector } from "@/components/menu";
import Product from "@/components/store/product";
import { useAppSelector } from "@/store/HOCs";
import { Menu } from "antd";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

// TODO get all data in init
export default function ListsPage() {
  const products = useAppSelector((store) => store.products);
  const category = useAppSelector((store) => store.account.category);
  const test = useCallback(() => menuDirector(category), [category]);

  const router = useRouter();
  const { cat } = router.query;

  const [filter, filterHandler] = useState(-1);

  useEffect(() => {
    const tmp =
      typeof cat !== "string" || (typeof cat === "string" && cat === "all")
        ? -1
        : parseInt(cat);
    filterHandler(tmp);
  }, [filterHandler, cat]);

  return (
    <div className="flex flex-col xl:space-y-5">
      <Header state={0} />
      <div className="flex flex-row xl:space-x-5 rtl:space-x-reverse grow p-5 pt-36">
        <div className="bg-bg-200 h-[80vh] w-96 rounded-xl overflow-scroll relative scrollbar-hide max-xl:hidden">
          <div className=" absolute top-0 left-0 right-0 bottom-0">
            <div className="w-full items-center justify-center flex">
              <button
                onClick={() => filterHandler(-1)}
                disabled={filter === -1}
                className={`m-2 bg-prime-200 disabled:bg-gray-300 w-44 px-5 py-2 rounded-xl`}
              >
                <p className="text-white">حذف فیلتر</p>
              </button>
            </div>
            <Menu
              onClick={(e) => filterHandler(parseInt(e.key))}
              mode="inline"
              items={test()}
            />
          </div>
        </div>
        <div
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
          className="grid w-full gap-5 overflow-scroll overflow-x-hidden xl:h-[80vh] scrollbar-hide"
        >
          {products
            .filter((item) => !(filter !== -1 && item.category !== filter))
            .map((item, index) => (
              <div key={index} className="max-h-[450px]">
                <Product {...item} />
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

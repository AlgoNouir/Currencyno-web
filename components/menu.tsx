import type { MenuProps } from "antd";
import { categoryType } from "@/store/account/slice";

type MenuItem = Required<MenuProps>["items"][number];

export function menuDirector(array: categoryType[]): MenuItem[] {

  console.log(array);
  
  const result: MenuItem[] = array.filter(c => c.parent === null).map(c => {
    let tmp =array.filter(cc => cc.parent == c.id).map(cc => ({
      label:cc.name,
      key:cc.id
    }))

    return({
    label: c.name,
    key: c.id,
    children: tmp.length ===0?undefined:tmp
  })})

  return result;
}

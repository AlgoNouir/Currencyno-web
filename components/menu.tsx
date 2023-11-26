import type { MenuProps } from "antd";
import { categoryType } from "@/store/account/slice";

type MenuItem = Required<MenuProps>["items"][number];

export function menuDirector(array: categoryType[]): MenuItem[] {
  const result: MenuItem[] = [];

  array.forEach((c) => {
    const children = array.filter((child) => child.parent === c.id);
    if (!result.map((r) => r?.key).includes(c.parent))
      result.push({
        label: c.name,
        key: c.id,
        children: children.length === 0 ? undefined : menuDirector(children),
      });
  });
  return result;
}

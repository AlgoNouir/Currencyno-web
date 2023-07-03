import React, { useCallback } from "react";
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useAppSelector } from "@/store/HOCs";
import { categoryType } from "@/store/core/slice";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

function menuDirector(array: categoryType, depth: number): MenuItem[] {
    var result: MenuItem[] = [];
    Object.entries(array).forEach(([name, data]) => {
        let a = Object.entries(array).filter(
            ([_, d]) =>
                d.depth === depth + 1 &&
                d.parent === data.id &&
                d.id !== data.id
        );

        if (data.depth === depth) {
            console.log(a);
            result.push(
                getItem(
                    name,
                    data.id,
                    data.icon,
                    a.length === 0
                        ? undefined
                        : menuDirector(
                              a.reduce(
                                  (obj, [key, value]) => ({
                                      ...obj,
                                      [key]: value,
                                  }),
                                  {}
                              ),
                              depth + 1
                          )
                )
            );
        }
    });
    return result;
}

export default function ProductMenu() {
    const menu = useAppSelector((store) => store.core.category);
    const onClick: MenuProps["onClick"] = (e) => {
        console.log("click ", e);
    };
    const test = useCallback(() => menuDirector(menu, 0), []);
    const items: MenuProps["items"] = test();

    return (
        <Menu
            onClick={onClick}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
        />
    );
}

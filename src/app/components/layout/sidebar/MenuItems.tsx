import {
    IconAperture,
    IconCopy,
    IconLayoutDashboard,
    IconLogin,
    IconMoodHappy,
    IconTypography,
    IconUserPlus,
    IconChartBubble,
    IconMessage
} from "@tabler/icons-react";

import {uniqueId} from "lodash";

const Menuitems = [
    {
        navlabel: true,
        subheader: "Products",
    },
    {
        id: uniqueId(),
        title: "Products",
        icon: IconLayoutDashboard,
        href: "/products",
    },
    {
        navlabel: true,
        subheader: "Message",
    },
    {
        id: uniqueId(),
        title: "Message",
        icon: IconMessage,
        href: "/messages",
    },
    // {
    //     id: uniqueId(),
    //     title: "Dashboard",
    //     icon: IconLayoutDashboard,
    //     href: "/",
    // },
];

export default Menuitems;

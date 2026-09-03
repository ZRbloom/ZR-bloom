import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tu carrito",
    robots: {
        index: false,
        follow: false,
    },
};

export default function CartLayout(props: LayoutProps<"/cart">) {
    return props.children;
}

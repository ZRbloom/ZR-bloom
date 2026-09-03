import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Finalizar compra",
    robots: {
        index: false,
        follow: false,
    },
};

export default function CheckoutLayout(props: LayoutProps<"/checkout">) {
    return props.children;
}

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
};

type CartItem = Product & {
    quantity: number;
};

type CartStore = {
    items: CartItem[];

    addToCart: (product: Product) => void;

    increaseQuantity: (id: number) => void;

    decreaseQuantity: (id: number) => void;

    removeFromCart: (id: number) => void;

    clearCart: () => void;
};

export const useCart = create<CartStore>()(
    persist(
        (set) => ({
            items: [],

            addToCart: (product) =>
                set((state) => {
                    const existing = state.items.find(
                        (item) => item.id === product.id
                    );

                    if (existing) {
                        return {
                            items: state.items.map((item) =>
                                item.id === product.id
                                    ? {
                                          ...item,
                                          quantity: item.quantity + 1,
                                      }
                                    : item
                            ),
                        };
                    }

                    return {
                        items: [
                            ...state.items,
                            {
                                ...product,
                                quantity: 1,
                            },
                        ],
                    };
                }),

            increaseQuantity: (id) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id
                            ? {
                                  ...item,
                                  quantity: item.quantity + 1,
                              }
                            : item
                    ),
                })),

            decreaseQuantity: (id) =>
                set((state) => ({
                    items: state.items
                        .map((item) =>
                            item.id === id
                                ? {
                                      ...item,
                                      quantity: item.quantity - 1,
                                  }
                                : item
                        )
                        .filter((item) => item.quantity > 0),
                })),

            removeFromCart: (id) =>
                set((state) => ({
                    items: state.items.filter(
                        (item) => item.id !== id
                    ),
                })),

            clearCart: () =>
                set({
                    items: [],
                }),
        }),
        {
            name: "zr-bloom-cart",
        }
    )
);
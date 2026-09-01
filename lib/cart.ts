import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SelectedPersonalization } from "@/lib/products";

type AddToCartInput = {
    id: number;
    name: string;
    image: string;
    price: number;
    unitPrice?: number;
    quantity?: number;
    selections?: SelectedPersonalization;
    selectionsLabel?: string;
};

export type CartItem = {
    lineId: string;
    id: number;
    name: string;
    image: string;
    price: number;
    unitPrice: number;
    quantity: number;
    selections?: SelectedPersonalization;
    selectionsLabel?: string;
};

type CartStore = {
    items: CartItem[];

    addToCart: (input: AddToCartInput) => void;

    increaseQuantity: (lineId: string) => void;

    decreaseQuantity: (lineId: string) => void;

    removeFromCart: (lineId: string) => void;

    clearCart: () => void;
};

function buildLineId(id: number, selections?: SelectedPersonalization) {
    if (!selections || Object.keys(selections).length === 0) {
        return `${id}`;
    }

    const sorted = Object.keys(selections)
        .sort()
        .map((key) => `${key}:${selections[key]}`)
        .join("|");

    return `${id}::${sorted}`;
}

export const useCart = create<CartStore>()(
    persist(
        (set) => ({
            items: [],

            addToCart: (input) =>
                set((state) => {
                    const lineId = buildLineId(input.id, input.selections);
                    const addQuantity = input.quantity ?? 1;
                    const existing = state.items.find(
                        (item) => item.lineId === lineId
                    );

                    if (existing) {
                        return {
                            items: state.items.map((item) =>
                                item.lineId === lineId
                                    ? {
                                          ...item,
                                          quantity: item.quantity + addQuantity,
                                      }
                                    : item
                            ),
                        };
                    }

                    return {
                        items: [
                            ...state.items,
                            {
                                lineId,
                                id: input.id,
                                name: input.name,
                                image: input.image,
                                price: input.price,
                                unitPrice: input.unitPrice ?? input.price,
                                quantity: addQuantity,
                                selections: input.selections,
                                selectionsLabel: input.selectionsLabel,
                            },
                        ],
                    };
                }),

            increaseQuantity: (lineId) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.lineId === lineId
                            ? {
                                  ...item,
                                  quantity: item.quantity + 1,
                              }
                            : item
                    ),
                })),

            decreaseQuantity: (lineId) =>
                set((state) => ({
                    items: state.items
                        .map((item) =>
                            item.lineId === lineId
                                ? {
                                      ...item,
                                      quantity: item.quantity - 1,
                                  }
                                : item
                        )
                        .filter((item) => item.quantity > 0),
                })),

            removeFromCart: (lineId) =>
                set((state) => ({
                    items: state.items.filter(
                        (item) => item.lineId !== lineId
                    ),
                })),

            clearCart: () =>
                set({
                    items: [],
                }),
        }),
        {
            name: "zr-bloom-cart",
            version: 1,
            migrate: (persistedState, version) => {
                if (version < 1) {
                    return { items: [] };
                }
                return persistedState as CartStore;
            },
        }
    )
);

import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesStore = {
    ids: number[];
    toggleFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
};

export const useFavorites = create<FavoritesStore>()(
    persist(
        (set, get) => ({
            ids: [],

            toggleFavorite: (id) =>
                set((state) => ({
                    ids: state.ids.includes(id)
                        ? state.ids.filter((favId) => favId !== id)
                        : [...state.ids, id],
                })),

            isFavorite: (id) => get().ids.includes(id),
        }),
        {
            name: "zr-bloom-favorites",
        }
    )
);

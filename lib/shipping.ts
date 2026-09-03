export const FREE_SHIPPING_THRESHOLD = 30;
export const STANDARD_SHIPPING_PRICE = 4.95;

export function getFreeShippingProgress(total: number) {
    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
    const qualifies = remaining === 0;
    const progress = qualifies
        ? 100
        : Math.min(100, Math.round((total / FREE_SHIPPING_THRESHOLD) * 100));

    return { remaining, qualifies, progress };
}

export function getShippingCost(subtotal: number): number {
    return getFreeShippingProgress(subtotal).qualifies ? 0 : STANDARD_SHIPPING_PRICE;
}

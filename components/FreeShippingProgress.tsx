import { getFreeShippingProgress } from "@/lib/shipping";

export default function FreeShippingProgress({ total }: { total: number }) {
    const { remaining, qualifies, progress } = getFreeShippingProgress(total);

    return (
        <div className="mb-6">
            <p className="text-sm font-medium mb-2">
                {qualifies ? (
                    <span className="text-green-600">
                        🎉 ¡Envío gratis conseguido!
                    </span>
                ) : (
                    <span className="text-gray-600">
                        Añade{" "}
                        <span className="font-bold text-violet-500">
                            {remaining.toFixed(2)} €
                        </span>{" "}
                        más y consigue el envío gratis 🚚
                    </span>
                )}
            </p>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-[#A7A6FF] transition-all"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

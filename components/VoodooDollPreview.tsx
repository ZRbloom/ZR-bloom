const VOODOO_COLOR_HEXES: Record<string, [string, string]> = {
    rojo_negro: ["#D64545", "#1F1F1F"],
    blanco_negro: ["#FAFAFA", "#1F1F1F"],
    rojo_azul: ["#D64545", "#3B5FCB"],
    azul: ["#3B5FCB", "#3B5FCB"],
    rosa: ["#F4A6C9", "#F4A6C9"],
    rojo: ["#D64545", "#D64545"],
    morado: ["#8B5CF6", "#F5D948"],
    naranja: ["#F2994A", "#F2994A"],
    verde: ["#6FCF6F", "#6FCF6F"],
    beige_marron: ["#D9BFA0", "#8B5E3C"],
    marron_brilla: ["#8B5E3C", "#8B5E3C"],
};

export default function VoodooDollPreview({
    colorValue,
}: {
    colorValue?: string;
}) {
    const [left, right] = colorValue
        ? (VOODOO_COLOR_HEXES[colorValue] ?? ["#E5E1F5", "#E5E1F5"])
        : ["#E5E1F5", "#E5E1F5"];

    const isLight = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return (r * 299 + g * 587 + b * 114) / 1000 > 200;
    };

    const outline = "#2D2D2D";

    return (
        <svg
            viewBox="0 0 200 260"
            className="w-full max-w-[220px] mx-auto"
            role="img"
            aria-label="Vista previa del color elegido"
        >
            <ellipse cx="100" cy="238" rx="55" ry="10" fill="#1F1F1F" opacity="0.85" />

            {/* legs */}
            <rect x="70" y="185" width="22" height="45" rx="8" fill={left} stroke={outline} strokeWidth="2" />
            <rect x="108" y="185" width="22" height="45" rx="8" fill={right} stroke={outline} strokeWidth="2" />

            {/* arms */}
            <rect x="30" y="150" width="42" height="20" rx="10" fill={left} stroke={outline} strokeWidth="2" transform="rotate(-15 51 160)" />
            <rect x="128" y="150" width="42" height="20" rx="10" fill={right} stroke={outline} strokeWidth="2" transform="rotate(15 149 160)" />

            {/* body */}
            <rect x="58" y="120" width="42" height="80" rx="14" fill={left} stroke={outline} strokeWidth="2" />
            <rect x="100" y="120" width="42" height="80" rx="14" fill={right} stroke={outline} strokeWidth="2" />

            {/* head */}
            <path d="M100 15 A55 55 0 0 0 100 125 Z" fill={left} stroke={outline} strokeWidth="2" />
            <path d="M100 15 A55 55 0 0 1 100 125 Z" fill={right} stroke={outline} strokeWidth="2" />
            <line x1="100" y1="17" x2="100" y2="123" stroke={outline} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
            <line x1="100" y1="122" x2="100" y2="198" stroke={outline} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />

            {/* left eye */}
            <circle cx="72" cy="68" r="14" fill={right} stroke={outline} strokeWidth="1.5" />
            <line x1="65" y1="61" x2="79" y2="75" stroke={isLight(right) ? outline : left} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="79" y1="61" x2="65" y2="75" stroke={isLight(right) ? outline : left} strokeWidth="2.5" strokeLinecap="round" />

            {/* right eye */}
            <circle cx="128" cy="68" r="14" fill={left} stroke={outline} strokeWidth="1.5" />
            <line x1="121" y1="61" x2="135" y2="75" stroke={isLight(left) ? outline : right} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="135" y1="61" x2="121" y2="75" stroke={isLight(left) ? outline : right} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    );
}

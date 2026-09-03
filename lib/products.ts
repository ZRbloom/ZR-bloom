export type PersonalizationChoice = {
  value: string;
  label: string;
  priceDelta?: number;
};

export type PersonalizationOption =
  | {
      id: string;
      label: string;
      type: "color" | "size" | "select";
      required?: boolean;
      choices: PersonalizationChoice[];
    }
  | {
      id: string;
      label: string;
      type: "text";
      required?: boolean;
      maxLength?: number;
      placeholder?: string;
    };

export type StockInfo =
  | { mode: "stock"; quantity: number }
  | { mode: "made_to_order"; productionDays: number };

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  gallery?: string[];
  category: string;
  featured?: boolean;
  description: string;
  material: string;
  stock: StockInfo;
  personalization?: PersonalizationOption[];
};

export type SelectedPersonalization = Record<string, string>;

export const LOW_STOCK_THRESHOLD = 5;

export function getStockInfo(product: Product): {
  label: string;
  low: boolean;
  outOfStock: boolean;
} {
  if (product.stock.mode === "stock") {
    const { quantity } = product.stock;

    if (quantity <= 0) {
      return { label: "Sin stock", low: false, outOfStock: true };
    }

    if (quantity <= LOW_STOCK_THRESHOLD) {
      return {
        label: `¡Solo quedan ${quantity}!`,
        low: true,
        outOfStock: false,
      };
    }

    return {
      label: `${quantity} disponibles`,
      low: false,
      outOfStock: false,
    };
  }

  return {
    label: `Fabricación bajo pedido · ${product.stock.productionDays} días aprox.`,
    low: false,
    outOfStock: false,
  };
}

export const categories = [
  "Decoración",
  "Llaveros",
  "Mascotas",
  "Regalos",
  "Personalizados",
];

export const products: Product[] = [
  {
    id: 1,
    name: "Ovejita",
    price: 10.0,
    image: "/products/ovejita.png",
    category: "Decoración",
    featured: true,
    description:
      "Ovejita decorativa impresa en 3D, ideal para estanterías o como detalle de regalo.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 3 },
    personalization: [
      {
        id: "color",
        label: "Color",
        type: "color",
        required: true,
        choices: [
          { value: "blanco", label: "Blanco" },
          { value: "rosa", label: "Rosa" },
          { value: "morado", label: "Morado" },
          { value: "verde", label: "Verde" },
        ],
      },
      {
        id: "size",
        label: "Tamaño",
        type: "size",
        required: true,
        choices: [
          { value: "pequeno", label: "Pequeño" },
          { value: "mediano", label: "Mediano" },
          { value: "grande", label: "Grande", priceDelta: 2 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Erizo",
    price: 12.95,
    image: "/products/erizo.png",
    category: "Decoración",
    featured: true,
    description:
      "Erizo decorativo con acabado detallado, impreso capa a capa con mucho cariño.",
    material: "PLA (bioplástico)",
    stock: { mode: "stock", quantity: 4 },
    personalization: [
      {
        id: "color",
        label: "Color",
        type: "color",
        required: true,
        choices: [
          { value: "marron", label: "Marrón" },
          { value: "gris", label: "Gris" },
          { value: "morado", label: "Morado" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Café Calabaza",
    price: 11.95,
    image: "/products/cafecalabaza.png",
    category: "Llaveros",
    featured: true,
    description:
      "Llavero con forma de café de calabaza, perfecto para regalar en otoño.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 2 },
    personalization: [
      {
        id: "nombre",
        label: "Nombre grabado",
        type: "text",
        required: false,
        maxLength: 12,
        placeholder: "Ej: Zaira",
      },
    ],
  },
  {
    id: 4,
    name: "Sushi",
    price: 8.95,
    image: "/products/sushi.png",
    category: "Llaveros",
    featured: true,
    description: "Llavero de sushi, divertido y colorido, hecho a mano.",
    material: "PLA (bioplástico)",
    stock: { mode: "stock", quantity: 15 },
  },
  {
    id: 5,
    name: "Bambú",
    price: 10.0,
    image: "/products/bambu.jpeg",
    category: "Decoración",
    featured: true,
    description:
      "Figura decorativa de bambú, un toque natural y minimalista para cualquier rincón.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 4 },
    personalization: [
      {
        id: "size",
        label: "Tamaño",
        type: "size",
        required: true,
        choices: [
          { value: "pequeno", label: "Pequeño" },
          { value: "grande", label: "Grande", priceDelta: 3 },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Muñeco vudú",
    price: 12.0,
    image: "/products/muneco-vudu-blanco-negro.jpeg",
    gallery: [
      "/products/muneco-vudu-naranja-negro-calabaza.jpeg",
      "/products/muneco-vudu-terracota-crema.jpeg",
    ],
    category: "Personalizados",
    featured: true,
    description:
      "Muñeco vudú decorativo con alfileres de corazón o calavera, disponible en varios colores. Algunos acabados brillan en la oscuridad.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 3 },
    personalization: [
      {
        id: "color",
        label: "Color",
        type: "color",
        required: true,
        choices: [
          { value: "rojo_negro", label: "Rojo / Negro" },
          { value: "blanco_negro", label: "Blanco / Negro" },
          { value: "rojo_azul", label: "Rojo / Azul" },
          { value: "azul", label: "Azul" },
          { value: "rosa", label: "Rosa" },
          { value: "rojo", label: "Rojo" },
          { value: "morado", label: "Morado / Amarillo" },
          { value: "naranja", label: "Naranja" },
          { value: "verde", label: "Verde" },
          { value: "beige_marron", label: "Beige / Marrón" },
          { value: "marron_brilla", label: "Marrón (brilla en la oscuridad)" },
        ],
      },
      {
        id: "size",
        label: "Tamaño",
        type: "size",
        required: true,
        choices: [
          { value: "pequeno", label: "Pequeño (de pie)" },
          {
            value: "grande",
            label: "Grande (con peana y alfileres)",
            priceDelta: 6,
          },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Llavero fantasma",
    price: 10.0,
    image: "/products/llaverofantasma.jpeg",
    gallery: ["/products/llaverofantasma-2.jpeg"],
    category: "Llaveros",
    featured: true,
    description:
      "Llavero de fantasma con lazo, con función de abrelatas incorporada.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 3 },
  },
  {
    id: 9,
    name: "Kuromi",
    price: 16.0,
    image: "/products/kuromi.jpeg",
    gallery: ["/products/kuromi-2.jpeg"],
    category: "Decoración",
    featured: true,
    description: "Figura decorativa de Kuromi, disponible en dos colores.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 4 },
    personalization: [
      {
        id: "color",
        label: "Color",
        type: "color",
        required: true,
        choices: [
          { value: "morado_negro", label: "Morado / Negro" },
          { value: "negro_rosa", label: "Negro / Rosa" },
        ],
      },
    ],
  },
  {
    id: 10,
    name: "Calabaza Gengar",
    price: 15.0,
    image: "/products/calabazagengar.jpeg",
    gallery: ["/products/calabazagengar-2.jpeg"],
    category: "Decoración",
    featured: true,
    description:
      "Calabaza decorativa de Halloween con forma de Gengar. Tiene un hueco preparado para poner una luz (no incluida).",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 4 },
  },
  {
    id: 11,
    name: "Pikachu Charizard",
    price: 19.0,
    image: "/products/pikachucharizard.jpeg",
    gallery: ["/products/pikachugyarados.jpeg"],
    category: "Decoración",
    featured: true,
    description: "Figura decorativa de Pikachu disfrazado de Charizard o de Gyarados, a elegir.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 4 },
    personalization: [
      {
        id: "version",
        label: "Versión",
        type: "select",
        required: true,
        choices: [
          { value: "charizard", label: "Charizard" },
          { value: "gyarados", label: "Gyarados" },
        ],
      },
    ],
  },
  {
    id: 12,
    name: "Pikachu Mega Charizard",
    price: 19.0,
    image: "/products/pikachumegax.jpeg",
    gallery: ["/products/pikachumegay.jpeg"],
    category: "Decoración",
    featured: true,
    description:
      "Figura decorativa de Pikachu disfrazado de Mega Charizard X o Mega Charizard Y, a elegir.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 4 },
    personalization: [
      {
        id: "version",
        label: "Versión",
        type: "select",
        required: true,
        choices: [
          { value: "mega_x", label: "Mega Charizard X" },
          { value: "mega_y", label: "Mega Charizard Y" },
        ],
      },
    ],
  },
  {
    id: 15,
    name: "Pikachu Rayquaza",
    price: 18.0,
    image: "/products/pikacharayquaza.jpeg",
    gallery: ["/products/pikacharayquaza-2.jpeg"],
    category: "Decoración",
    featured: true,
    description: "Figura decorativa de Pikachu disfrazado de Rayquaza.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 4 },
  },
  {
    id: 16,
    name: "Pikachu Gengar",
    price: 16.0,
    image: "/products/pikachugengar.jpeg",
    gallery: ["/products/pikachugengar-2.jpeg", "/products/pikachugengar-3.jpeg"],
    category: "Decoración",
    featured: true,
    description: "Figura decorativa de Pikachu disfrazado de Gengar.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 4 },
  },
  {
    id: 17,
    name: "Pikachu Psyduck",
    price: 14.0,
    image: "/products/pikachupsyduck.jpeg",
    category: "Decoración",
    featured: true,
    description: "Figura decorativa de Pikachu disfrazado de Psyduck.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 4 },
  },
  {
    id: 18,
    name: "Pomerania navideño",
    price: 13.0,
    image: "/products/pomerania-navidad.jpeg",
    category: "Decoración",
    featured: true,
    description:
      "Figura decorativa de perrito Pomerania con gorro navideño, ideal para decorar en Navidad.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 3 },
  },
  {
    id: 19,
    name: "Corazón de rosa",
    price: 16.0,
    image: "/products/corazon-rosa.jpeg",
    category: "Regalos",
    featured: true,
    description:
      "Corazón decorativo con forma de rosa, colgado de un soporte a juego. Un detalle romántico para regalar.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 3 },
  },
  {
    id: 20,
    name: "Soporte zapato de tacón",
    price: 14.0,
    image: "/products/zapato-tacon.jpeg",
    gallery: ["/products/zapato-tacon-2.jpeg"],
    category: "Decoración",
    featured: true,
    description:
      "Soporte decorativo con forma de zapato de tacón, ideal para joyas o para apoyar el móvil.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 3 },
  },
  {
    id: 22,
    name: "Llavero Husky",
    price: 10.0,
    image: "/products/llavero-husky.jpeg",
    category: "Llaveros",
    featured: true,
    description: "Llavero con la cara de un husky, para los amantes de los perros.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 2 },
  },
  {
    id: 23,
    name: "Llavero escudo Hyrule",
    price: 11.0,
    image: "/products/llavero-zelda.jpeg",
    category: "Llaveros",
    featured: true,
    description: "Llavero con el escudo Hylian, inspirado en Zelda.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 2 },
  },
  {
    id: 24,
    name: "Llavero Yoshi",
    price: 11.0,
    image: "/products/llavero-yoshi.jpeg",
    category: "Llaveros",
    featured: true,
    description: "Llavero con la cara de Yoshi.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 2 },
  },
  {
    id: 25,
    name: "Llavero Suzuki",
    price: 10.0,
    image: "/products/llavero-suzuki.jpeg",
    category: "Llaveros",
    featured: true,
    description: "Llavero con el logo de Suzuki, en acabado tipo fibra de carbono.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 2 },
  },
  {
    id: 26,
    name: "Centro Pokémon",
    price: 20.0,
    image: "/products/centro-pokemon.jpeg",
    gallery: ["/products/centro-pokemon-2.jpeg"],
    category: "Decoración",
    featured: true,
    description:
      "Diorama decorativo de un Centro Pokémon, con todo detalle. Una pieza grande para coleccionistas.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 5 },
  },
  {
    id: 27,
    name: "Soporte para cartas coleccionables",
    price: 12.0,
    image: "/products/soporte-cartas.jpeg",
    gallery: ["/products/soporte-cartas-2.jpeg"],
    category: "Decoración",
    featured: true,
    description:
      "Soporte translúcido para exhibir tu carta coleccionable favorita (la carta no está incluida).",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 2 },
  },
  {
    id: 29,
    name: "Soporte de pared para tabla",
    price: 15.0,
    image: "/products/soporte-montana.jpeg",
    category: "Decoración",
    featured: true,
    description:
      "Juego de 2 soportes de pared con forma de montaña, para colgar tu snowboard o esquís como decoración.",
    material: "PLA (bioplástico)",
    stock: { mode: "made_to_order", productionDays: 3 },
  },
];

export function computeUnitPrice(
  product: Product,
  selections?: SelectedPersonalization
): number {
  if (!product.personalization) return product.price;

  let price = product.price;

  for (const option of product.personalization) {
    if (option.type === "text") continue;

    const value = selections?.[option.id];
    if (!value) continue;

    const choice = option.choices.find((c) => c.value === value);
    if (choice?.priceDelta) price += choice.priceDelta;
  }

  return price;
}

export function validateSelections(
  product: Product,
  selections: SelectedPersonalization = {}
): string | null {
  if (!product.personalization) return null;

  for (const option of product.personalization) {
    const value = selections[option.id];

    if (option.required && !value) {
      return `Falta seleccionar "${option.label}" en ${product.name}.`;
    }

    if (option.type === "text") {
      if (value && option.maxLength && value.length > option.maxLength) {
        return `"${option.label}" supera el máximo de ${option.maxLength} caracteres en ${product.name}.`;
      }
    } else if (value) {
      const valid = option.choices.some((c) => c.value === value);
      if (!valid) {
        return `Opción no válida para "${option.label}" en ${product.name}.`;
      }
    }
  }

  return null;
}

export function getSelectionsLabel(
  product: Product,
  selections?: SelectedPersonalization
): string | undefined {
  if (!product.personalization || !selections) return undefined;

  const parts: string[] = [];

  for (const option of product.personalization) {
    const value = selections[option.id];
    if (!value) continue;

    if (option.type === "text") {
      parts.push(`${option.label}: ${value}`);
    } else {
      const choice = option.choices.find((c) => c.value === value);
      if (choice) parts.push(`${option.label}: ${choice.label}`);
    }
  }

  return parts.length > 0 ? parts.join(" · ") : undefined;
}

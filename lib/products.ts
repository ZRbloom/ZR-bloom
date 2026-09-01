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

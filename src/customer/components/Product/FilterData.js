export const color = [
  "white",
  "Black",
  "Green",
  "Red",
  "Pink",
  "Purple",
  "Brown",
  "Yellow",
  "Blue",
  "Gray",
  "Navy",
  "Saddle",
  "Dark Blue",
  "Olive Night",
  "Burgundy",
];

export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "black", label: "Black" },
      { value: "green", label: "Green" },
      { value: "red", label: "Red" },
      { value: "pink", label: "Pink" },
      { value: "purple", label: "Purple" },
      { value: "brown", label: "Brown" },
      { value: "yellow", label: "Yellow" },
      { value: "blue", label: "Blue" },
      { value: "dark blue", label: "Dark Blue" },
      { value: "gray", label: "Gray" },
      { value: "navy", label: "Navy" },
      { value: "olive night", label: "Olive Night" },
      { value: "saddle", label: "Saddle" },
      { value: "burgundy", label: "Burgundy" },
    ],
  },

  {
    id: "size",
    name: "Size",
    options: [
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
    ],
  },
];

export const singleFilter = [
    {
        id: "price",
        name: "Price",
        options: [
            { value: "1-10", label: "$1 - $10" },
            { value: "10-20", label: "$10 - $20" },
            { value: "20-30", label: "$20 - $30" },
            { value: "30-40", label: "$30 - $40" },
            { value: "40-50", label: "$40 - $50" },
        ],
    },
    {
        id: "discount",
        name: "Discount Range",
        options: [
            {
                value: "10",
                label: "10% And Above",
            },
            { value: "20", label: "20% And Above"},
            { value: "30", label: "30% And Above"},
            { value: "40", label: "40% And Above"},
            { value: "50", label: "50% And Above"},
            { value: "60", label: "60% And Above"},
            { value: "70", label: "70% And Above"},
            { value: "80", label: "80% And Above"},
            { value: "90", label: "90% And Above"},
        ]
    },
    {
        id: "stock",
        name: "Availability",
        options: [
            { value: "In Stock", label: "In Stock" },
            { value: "Out Of Stock", label: "Out Of Stock" },
        ],
    }
]

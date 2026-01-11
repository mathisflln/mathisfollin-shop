// components/VariantSelectors.tsx
'use client';

import { ProductVariant } from '@/types/product';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
  availableForColor: (size: string) => boolean;
}

export function SizeSelector({ sizes, selectedSize, onSizeChange, availableForColor }: SizeSelectorProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-3">Taille</label>
      <div className="flex gap-2">
        {sizes.map((size) => {
          const available = availableForColor(size);
          return (
            <button
              key={size}
              onClick={() => available && onSizeChange(size)}
              disabled={!available}
              className={`
                px-4 py-2 border rounded-md transition-all
                ${selectedSize === size
                  ? 'border-black bg-black text-white'
                  : available
                  ? 'border-gray-300 hover:border-black'
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
                }
              `}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
  availableForSize: (color: string) => boolean;
}

export function ColorSelector({ colors, selectedColor, onColorChange, availableForSize }: ColorSelectorProps) {
  const colorMap: Record<string, string> = {
    'Noir': '#000000',
    'Blanc': '#FFFFFF',
    'Bleu': '#0000FF',
    'Gris': '#808080',
    'Jaune': '#FFFF10',
    'Rouge': '#FF0000',
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-3">Couleur</label>
      <div className="flex gap-3">
        {colors.map((color) => {
          const available = availableForSize(color);
          return (
            <button
              key={color}
              onClick={() => available && onColorChange(color)}
              disabled={!available}
              className={`
                w-12 h-12 rounded-full border-2 transition-all
                ${selectedColor === color
                  ? 'border-black scale-110'
                  : available
                  ? 'border-gray-300 hover:border-black'
                  : 'opacity-30 cursor-not-allowed'
                }
              `}
              style={{ backgroundColor: colorMap[color] || '#CCC' }}
              title={color}
            />
          );
        })}
      </div>
    </div>
  );
}
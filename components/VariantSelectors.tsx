// components/VariantSelectors.tsx
'use client';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
  availableForColor: (size: string) => boolean;
}

export function SizeSelector({ sizes, selectedSize, onSizeChange, availableForColor }: SizeSelectorProps) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <label className="form-label" style={{ marginBottom: '1rem' }}>Taille</label>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {sizes.map((size) => {
          const available = availableForColor(size);
          const isSelected = selectedSize === size;
          
          return (
            <button
              key={size}
              onClick={() => available && onSizeChange(size)}
              disabled={!available}
              style={{
                padding: '0.875rem 1.5rem',
                fontSize: '0.9375rem',
                fontWeight: '600',
                border: '1px solid',
                borderColor: isSelected ? '#0a0a0a' : 'rgba(0, 0, 0, 0.1)',
                background: isSelected ? '#0a0a0a' : 'white',
                color: isSelected ? 'white' : available ? '#0a0a0a' : '#ccc',
                borderRadius: '8px',
                cursor: available ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                opacity: available ? 1 : 0.4,
              }}
              onMouseOver={(e) => {
                if (available && !isSelected) {
                  e.currentTarget.style.borderColor = '#0a0a0a';
                  e.currentTarget.style.background = '#fafafa';
                }
              }}
              onMouseOut={(e) => {
                if (available && !isSelected) {
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.background = 'white';
                }
              }}
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
    <div style={{ marginBottom: '2rem' }}>
      <label className="form-label" style={{ marginBottom: '1rem' }}>Couleur</label>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {colors.map((color) => {
          const available = availableForSize(color);
          const isSelected = selectedColor === color;
          
          return (
            <button
              key={color}
              onClick={() => available && onColorChange(color)}
              disabled={!available}
              title={color}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '8px',
                border: '2px solid',
                borderColor: isSelected ? '#0a0a0a' : 'rgba(0, 0, 0, 0.1)',
                background: colorMap[color] || '#CCC',
                cursor: available ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                opacity: available ? 1 : 0.3,
                position: 'relative',
                boxShadow: isSelected ? '0 0 0 3px rgba(0, 0, 0, 0.05)' : 'none',
              }}
              onMouseOver={(e) => {
                if (available && !isSelected) {
                  e.currentTarget.style.borderColor = '#0a0a0a';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              onMouseOut={(e) => {
                if (available && !isSelected) {
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              {isSelected && (
                <svg 
                  style={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '24px',
                    height: '24px',
                    color: color === 'Blanc' ? '#0a0a0a' : 'white',
                    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))'
                  }} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
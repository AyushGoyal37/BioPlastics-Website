import React, { useState } from 'react';
import { FlaskConical } from 'lucide-react';

interface ResilientMaterialImageProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
  cropClass?: string;
}

export const ResilientMaterialImage: React.FC<ResilientMaterialImageProps> = ({
  src,
  alt,
  title,
  className = 'w-full h-48',
  cropClass = 'object-center',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`${className} bg-gradient-to-br from-[#EFECE3] via-[#F8F7F3] to-[#E5ECE6] flex flex-col items-center justify-center p-4 text-center border-b border-[#E5E2D9]`}
        role="img"
        aria-label={alt}
      >
        <FlaskConical className="w-8 h-8 text-[#14532D]/60 mb-2" aria-hidden="true" />
        <span className="text-xs font-medium text-[#4A594E]">{title}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`${className} object-cover ${cropClass}`}
    />
  );
};

interface PolymerStructureDiagramProps {
  diagramType: 'pla' | 'pha' | 'starch' | 'cellulose' | 'chitosan' | 'alginate';
  repeatingUnit: string;
}

export const PolymerStructureDiagram: React.FC<PolymerStructureDiagramProps> = ({
  diagramType,
  repeatingUnit,
}) => {
  return (
    <div className="bg-[#F8F7F3] border border-[#E5E2D9] rounded-xl p-4">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-medium text-[#4A594E]">
          Repeating-Unit Representation
        </span>
        <span className="font-mono text-xs text-[#14532D] font-medium">
          {repeatingUnit}
        </span>
      </div>

      <svg
        viewBox="0 0 360 110"
        className="w-full h-24 text-[#17211A]"
        role="img"
        aria-label={`Chemical repeating unit schematic for ${diagramType.toUpperCase()}`}
      >
        {diagramType === 'pla' && (
          <g stroke="currentColor" strokeWidth="1.6" fill="none">
            <path d="M55 20 L48 20 L48 90 L55 90" stroke="#4A594E" />
            <path d="M295 20 L302 20 L302 90 L295 90" stroke="#4A594E" />
            <text x="308" y="92" fontSize="13" fill="#14532D" stroke="none" className="font-mono">n</text>
            {/* Chain: — O — CH(CH3) — C(=O) — */}
            <line x1="30" y1="60" x2="72" y2="60" />
            <text x="78" y="65" fontSize="14" fill="currentColor" stroke="none" className="font-mono font-semibold">O</text>
            <line x1="95" y1="60" x2="145" y2="60" />
            <text x="150" y="65" fontSize="14" fill="currentColor" stroke="none" className="font-mono font-semibold">CH</text>
            <line x1="158" y1="48" x2="158" y2="26" />
            <text x="146" y="20" fontSize="12" fill="#14532D" stroke="none" className="font-mono">CH3</text>
            <line x1="176" y1="60" x2="225" y2="60" />
            <text x="230" y="65" fontSize="14" fill="currentColor" stroke="none" className="font-mono font-semibold">C</text>
            <line x1="233" y1="47" x2="233" y2="26" />
            <line x1="238" y1="47" x2="238" y2="26" />
            <text x="230" y="20" fontSize="14" fill="currentColor" stroke="none" className="font-mono font-semibold">O</text>
            <line x1="245" y1="60" x2="320" y2="60" />
          </g>
        )}

        {diagramType === 'pha' && (
          <g stroke="currentColor" strokeWidth="1.6" fill="none">
            <path d="M40 20 L33 20 L33 92 L40 92" stroke="#4A594E" />
            <path d="M312 20 L319 20 L319 92 L312 92" stroke="#4A594E" />
            <text x="325" y="94" fontSize="13" fill="#14532D" stroke="none" className="font-mono">n</text>
            <line x1="18" y1="62" x2="54" y2="62" />
            <text x="60" y="67" fontSize="14" fill="currentColor" stroke="none" className="font-mono font-semibold">O</text>
            <line x1="76" y1="62" x2="115" y2="62" />
            <text x="120" y="67" fontSize="14" fill="currentColor" stroke="none" className="font-mono font-semibold">CH</text>
            <line x1="128" y1="50" x2="128" y2="28" />
            <text x="115" y="21" fontSize="12" fill="#14532D" stroke="none" className="font-mono">R (CH3/C2H5)</text>
            <line x1="145" y1="62" x2="185" y2="62" />
            <text x="189" y="67" fontSize="14" fill="currentColor" stroke="none" className="font-mono font-semibold">CH2</text>
            <line x1="222" y1="62" x2="255" y2="62" />
            <text x="260" y="67" fontSize="14" fill="currentColor" stroke="none" className="font-mono font-semibold">C</text>
            <line x1="263" y1="50" x2="263" y2="28" />
            <line x1="268" y1="50" x2="268" y2="28" />
            <text x="260" y="21" fontSize="14" fill="currentColor" stroke="none" className="font-mono font-semibold">O</text>
            <line x1="275" y1="62" x2="335" y2="62" />
          </g>
        )}

        {(diagramType === 'starch' || diagramType === 'cellulose') && (
          <g stroke="currentColor" strokeWidth="1.5" fill="none">
            <path d="M55 18 L48 18 L48 92 L55 92" stroke="#4A594E" />
            <path d="M295 18 L302 18 L302 92 L295 92" stroke="#4A594E" />
            <text x="308" y="94" fontSize="13" fill="#14532D" stroke="none" className="font-mono">n</text>
            {/* Pyranose ring schematic */}
            <polygon points="125,45 160,30 205,40 220,68 185,84 140,74" stroke="currentColor" />
            <circle cx="160" cy="30" r="9" fill="#F8F7F3" stroke="none" />
            <text x="155" y="34" fontSize="12" fill="currentColor" stroke="none" className="font-mono font-semibold">O</text>
            {/* Linkage */}
            <line x1="30" y1="62" x2="72" y2="62" />
            <text x="78" y="67" fontSize="13" fill="currentColor" stroke="none" className="font-mono font-semibold">O</text>
            <line x1="92" y1="62" x2="132" y2="62" />
            <line x1="220" y1="62" x2="265" y2="62" />
            <text x="270" y="67" fontSize="13" fill="currentColor" stroke="none" className="font-mono font-semibold">O</text>
            <line x1="284" y1="62" x2="322" y2="62" />
            {/* Hydroxyl side groups */}
            <line x1="185" y1="84" x2="185" y2="97" />
            <text x="190" y="102" fontSize="11" fill="#14532D" stroke="none" className="font-mono">OH</text>
            <line x1="205" y1="40" x2="225" y2="26" />
            <text x="228" y="26" fontSize="11" fill="#14532D" stroke="none" className="font-mono">CH2OH</text>
            <text x="128" y="104" fontSize="10" fill="#4A594E" stroke="none" className="font-mono">
              {diagramType === 'starch' ? 'α-(1→4) / α-(1→6) linkage' : 'β-(1→4) glycosidic linkage'}
            </text>
          </g>
        )}

        {diagramType === 'chitosan' && (
          <g stroke="currentColor" strokeWidth="1.5" fill="none">
            <path d="M55 18 L48 18 L48 92 L55 92" stroke="#4A594E" />
            <path d="M295 18 L302 18 L302 92 L295 92" stroke="#4A594E" />
            <text x="308" y="94" fontSize="13" fill="#14532D" stroke="none" className="font-mono">n</text>
            <polygon points="125,45 160,30 205,40 220,68 185,84 140,74" stroke="currentColor" />
            <circle cx="160" cy="30" r="9" fill="#F8F7F3" stroke="none" />
            <text x="155" y="34" fontSize="12" fill="currentColor" stroke="none" className="font-mono font-semibold">O</text>
            <line x1="30" y1="62" x2="72" y2="62" />
            <text x="78" y="67" fontSize="13" fill="currentColor" stroke="none" className="font-mono font-semibold">O</text>
            <line x1="92" y1="62" x2="132" y2="62" />
            <line x1="220" y1="62" x2="265" y2="62" />
            <text x="270" y="67" fontSize="13" fill="currentColor" stroke="none" className="font-mono font-semibold">O</text>
            <line x1="284" y1="62" x2="322" y2="62" />
            <line x1="185" y1="84" x2="185" y2="97" />
            <text x="190" y="102" fontSize="11" fill="#14532D" stroke="none" className="font-mono font-semibold">NH2 / NHCOCH3</text>
            <line x1="205" y1="40" x2="225" y2="26" />
            <text x="228" y="26" fontSize="11" fill="#4A594E" stroke="none" className="font-mono">CH2OH</text>
          </g>
        )}

        {diagramType === 'alginate' && (
          <g stroke="currentColor" strokeWidth="1.5" fill="none">
            <path d="M45 18 L38 18 L38 92 L45 92" stroke="#4A594E" />
            <path d="M305 18 L312 18 L312 92 L305 92" stroke="#4A594E" />
            <text x="318" y="94" fontSize="13" fill="#14532D" stroke="none" className="font-mono">n</text>
            <polygon points="115,46 150,31 195,41 210,69 175,85 130,75" stroke="currentColor" />
            <circle cx="150" cy="31" r="9" fill="#F8F7F3" stroke="none" />
            <text x="145" y="35" fontSize="12" fill="currentColor" stroke="none" className="font-mono font-semibold">O</text>
            <line x1="25" y1="62" x2="65" y2="62" />
            <text x="70" y="67" fontSize="13" fill="currentColor" stroke="none" className="font-mono font-semibold">O</text>
            <line x1="85" y1="62" x2="122" y2="62" />
            <line x1="210" y1="62" x2="255" y2="62" />
            <text x="260" y="67" fontSize="13" fill="currentColor" stroke="none" className="font-mono font-semibold">O</text>
            <line x1="275" y1="62" x2="325" y2="62" />
            <line x1="195" y1="41" x2="218" y2="27" />
            <text x="222" y="28" fontSize="11" fill="#14532D" stroke="none" className="font-mono font-semibold">COO⁻ (Na⁺ / ½Ca²⁺)</text>
            <text x="115" y="104" fontSize="10" fill="#4A594E" stroke="none" className="font-mono">
              β-D-mannuronate / α-L-guluronate (M/G)
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

import React, { useEffect } from 'react';
import { X, ArrowLeftRight, Check, ExternalLink } from 'lucide-react';
import { BioplasticMaterial, PropertyDefinition } from '../types/bioplastics';
import {
  PolymerStructureDiagram,
  ResilientMaterialImage,
} from './BioplasticVisuals';

interface MaterialDetailModalProps {
  material: BioplasticMaterial | null;
  propertyDefinitions: PropertyDefinition[];
  isSelectedForCompare: boolean;
  onToggleCompare: (id: string) => void;
  onOpenComparePage: () => void;
  onClose: () => void;
}

export const MaterialDetailModal: React.FC<MaterialDetailModalProps> = ({
  material,
  propertyDefinitions,
  isSelectedForCompare,
  onToggleCompare,
  onOpenComparePage,
  onClose,
}) => {
  useEffect(() => {
    if (!material) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [material, onClose]);

  if (!material) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#17211A]/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="material-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-10 bg-[#FFFFFF]/95 backdrop-blur-sm border-b border-[#E5E2D9] px-6 py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs text-[#4A594E] flex flex-wrap items-center gap-2">
              <span>{material.family}</span>
              <span aria-hidden="true">·</span>
              <span>{material.classification}</span>
            </div>
            <h2
              id="material-modal-title"
              className="font-display text-xl sm:text-2xl font-bold text-[#17211A] truncate"
            >
              {material.name}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleCompare(material.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                isSelectedForCompare
                  ? 'bg-[#14532D] text-white'
                  : 'bg-[#F3F1EA] text-[#17211A] hover:bg-[#E5E2D9]'
              }`}
            >
              {isSelectedForCompare ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>In Comparison</span>
                </>
              ) : (
                <>
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>Add to Compare</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close material details"
              className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-[#E5E2D9] text-[#4A594E] hover:text-[#17211A] hover:bg-[#F3F1EA] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Top Overview + Image */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            <div className="md:col-span-5 rounded-xl overflow-hidden border border-[#E5E2D9] bg-[#F8F7F3]">
              <ResilientMaterialImage
                src={material.imagePath}
                alt={`${material.name} laboratory characterization sample`}
                title={material.name}
                className="w-full h-56 md:h-full"
                cropClass={material.imageCropClass}
              />
            </div>

            <div className="md:col-span-7 space-y-4">
              <div>
                <h3 className="font-display text-sm font-semibold text-[#17211A] mb-1.5">
                  Introduction
                </h3>
                <p className="text-sm text-[#37443B] leading-relaxed">
                  {material.introduction}
                </p>
              </div>

              <PolymerStructureDiagram
                diagramType={material.chemicalStructure.diagramType}
                repeatingUnit={material.chemicalStructure.repeatingUnit}
              />
              <p className="text-xs text-[#4A594E] leading-relaxed">
                {material.chemicalStructure.formulaNote}
              </p>
            </div>
          </div>

          {/* Source & Characteristics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-[#E5E2D9]">
            <div className="space-y-3">
              <h3 className="font-display text-base font-semibold text-[#17211A]">
                Source &amp; Production Route
              </h3>
              <p className="text-sm text-[#37443B] leading-relaxed">
                {material.sourceAndProduction}
              </p>
              <div className="pt-1 text-xs text-[#4A594E] space-y-1">
                <div>
                  <span className="font-semibold text-[#17211A]">Feedstock Origin: </span>
                  {material.biobasedOrigin}
                </div>
                <div>
                  <span className="font-semibold text-[#17211A]">Degradation Profile: </span>
                  {material.biodegradationEnvironment}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-base font-semibold text-[#17211A]">
                Important Characteristics
              </h3>
              <ul className="space-y-2 text-sm text-[#37443B]">
                {material.characteristics.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#14532D] font-mono text-xs mt-1">
                      0{idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Applications, Advantages, Limitations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#E5E2D9]">
            <div>
              <h3 className="font-display text-sm font-semibold text-[#17211A] mb-2.5">
                Food-Packaging Applications
              </h3>
              <ul className="space-y-2 text-sm text-[#37443B]">
                {material.applications.map((app, i) => (
                  <li key={i} className="leading-relaxed">
                    • {app}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-sm font-semibold text-[#14532D] mb-2.5">
                Key Advantages
              </h3>
              <ul className="space-y-2 text-sm text-[#37443B]">
                {material.advantages.map((adv, i) => (
                  <li key={i} className="leading-relaxed">
                    + {adv}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-sm font-semibold text-[#92400E] mb-2.5">
                Key Limitations
              </h3>
              <ul className="space-y-2 text-sm text-[#37443B]">
                {material.limitations.map((lim, i) => (
                  <li key={i} className="leading-relaxed">
                    − {lim}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Available Property Information */}
          <div className="pt-6 border-t border-[#E5E2D9] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-base font-semibold text-[#17211A]">
                  Characterization Property Dataset
                </h3>
                <p className="text-xs text-[#4A594E]">
                  All entries list testing method, specimen thickness, environmental
                  conditions, and source attribution.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenComparePage();
                }}
                className="text-xs font-semibold text-[#14532D] hover:underline whitespace-nowrap"
              >
                Open in Side-by-Side Comparison →
              </button>
            </div>

            <div className="overflow-x-auto border border-[#E5E2D9] rounded-xl">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#F8F7F3] border-b border-[#E5E2D9] text-[#4A594E]">
                    <th className="py-3 px-4 font-semibold">Property</th>
                    <th className="py-3 px-4 font-semibold">Reported Value &amp; Unit</th>
                    <th className="py-3 px-4 font-semibold">Test Method &amp; Conditions</th>
                    <th className="py-3 px-4 font-semibold">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E2D9]">
                  {propertyDefinitions.map((prop) => {
                    const entry = material.properties[prop.key];
                    const isMissing = entry.sourceType === 'Not available';
                    return (
                      <tr key={prop.key} className="align-top bg-[#FFFFFF]">
                        <td className="py-3 px-4 font-medium text-[#17211A] min-w-[160px]">
                          {prop.label}
                        </td>
                        <td className="py-3 px-4 font-mono tabular-nums min-w-[190px]">
                          <span
                            className={
                              isMissing
                                ? 'text-[#5E6D62] italic font-sans'
                                : 'font-semibold text-[#17211A]'
                            }
                          >
                            {entry.value}
                          </span>
                          {!isMissing && (
                            <span className="block text-[11px] text-[#4A594E] mt-0.5">
                              Unit: {entry.unit}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-xs text-[#37443B] space-y-1 min-w-[230px]">
                          <div>
                            <span className="font-medium text-[#17211A]">Method: </span>
                            {entry.testMethod}
                          </div>
                          <div className="font-mono text-[11px] text-[#4A594E]">
                            Thickness: {entry.sampleThickness} · Temp: {entry.temperature} · RH:{' '}
                            {entry.relativeHumidity}
                          </div>
                          <div className="text-[11px] text-[#4A594E]">
                            Grade: {entry.formulation}
                          </div>
                          <div className="text-[11px] text-[#5E6D62] pt-0.5">
                            {entry.notes}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#4A594E] min-w-[160px]">
                          <span className="font-medium text-[#17211A] block">
                            {entry.sourceType}
                          </span>
                          <span className="text-[11px]">{entry.reference}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* References */}
          <div className="pt-6 border-t border-[#E5E2D9] space-y-2">
            <h3 className="font-display text-sm font-semibold text-[#17211A]">
              Research References
            </h3>
            <ul className="space-y-1.5 text-xs text-[#4A594E]">
              {material.references.map((ref, idx) => (
                <li key={idx} className="leading-relaxed flex items-start gap-2">
                  <ExternalLink className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#14532D]" />
                  <span>{ref}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

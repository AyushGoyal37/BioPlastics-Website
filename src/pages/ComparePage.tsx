import React, { useMemo, useState } from 'react';
import {
  Search,
  AlertCircle,
  Check,
  Info,
  SlidersHorizontal,
} from 'lucide-react';
import { BioplasticMaterial, PropertyDefinition } from '../types/bioplastics';
import { PropertyComparisonChart } from '../components/PropertyComparisonChart';

interface ComparePageProps {
  materials: BioplasticMaterial[];
  propertyDefinitions: PropertyDefinition[];
  selectedIds: string[];
  onToggleMaterial: (id: string) => void;
  onSetSelectedIds: (ids: string[]) => void;
  onSelectMaterialDetail: (material: BioplasticMaterial) => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({
  materials,
  propertyDefinitions,
  selectedIds,
  onToggleMaterial,
  onSetSelectedIds,
  onSelectMaterialDetail,
}) => {
  const [propertySearch, setPropertySearch] = useState('');
  const [propertyCategory, setPropertyCategory] = useState<
    'all' | 'mechanical' | 'barrier' | 'environmental'
  >('all');
  const [showFullConditions, setShowFullConditions] = useState(true);

  const selectedMaterials = useMemo(
    () => materials.filter((m) => selectedIds.includes(m.id)),
    [materials, selectedIds]
  );

  const filteredProperties = useMemo(() => {
    const q = propertySearch.trim().toLowerCase();
    return propertyDefinitions.filter((p) => {
      const matchesQuery =
        !q ||
        p.label.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.unit.toLowerCase().includes(q);

      const matchesCategory =
        propertyCategory === 'all' ||
        (propertyCategory === 'mechanical' &&
          ['tensileStrength', 'transparency', 'loadBearingCapacity'].includes(p.key)) ||
        (propertyCategory === 'barrier' &&
          ['wvtr', 'contactAngle', 'leachingMigration'].includes(p.key)) ||
        (propertyCategory === 'environmental' &&
          ['biodegradability', 'humidityResponse'].includes(p.key));

      return matchesQuery && matchesCategory;
    });
  }, [propertyDefinitions, propertySearch, propertyCategory]);

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-[#E5E2D9] pb-6 space-y-2">
        <h1 className="font-display text-3xl font-bold text-[#17211A]">
          Property Comparison
        </h1>
        <p className="text-[15px] text-[#4A594E] max-w-3xl leading-relaxed">
          Select two or more bioplastics to compare eight core food-packaging
          characterization parameters side by side, complete with test methods,
          specimen thickness, temperature, relative humidity, and literature citations.
        </p>
      </div>

      {/* Material Selection Panel */}
      <div className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-base font-semibold text-[#17211A]">
              1. Select Bioplastics to Compare ({selectedMaterials.length} selected)
            </h2>
            <p className="text-xs text-[#4A594E]">
              Choose at least 2 materials for side-by-side comparison.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onSetSelectedIds(['pla', 'pha'])}
              className="px-3 py-1.5 text-xs font-medium bg-[#F3F1EA] hover:bg-[#E5E2D9] text-[#17211A] rounded-md transition-colors whitespace-nowrap"
            >
              Polyesters (PLA vs. PHA)
            </button>
            <button
              type="button"
              onClick={() => onSetSelectedIds(['starch', 'cellulose', 'chitosan', 'alginate'])}
              className="px-3 py-1.5 text-xs font-medium bg-[#F3F1EA] hover:bg-[#E5E2D9] text-[#17211A] rounded-md transition-colors whitespace-nowrap"
            >
              Polysaccharides (4)
            </button>
            <button
              type="button"
              onClick={() => onSetSelectedIds(materials.map((m) => m.id))}
              className="px-3 py-1.5 text-xs font-medium bg-[#F3F1EA] hover:bg-[#E5E2D9] text-[#17211A] rounded-md transition-colors whitespace-nowrap"
            >
              Select All (6)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {materials.map((mat) => {
            const checked = selectedIds.includes(mat.id);
            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => onToggleMaterial(mat.id)}
                aria-pressed={checked}
                className={`p-3.5 rounded-lg border text-left transition-colors flex items-start gap-3 ${
                  checked
                    ? 'bg-[#14532D]/6 border-[#14532D]'
                    : 'bg-[#F8F7F3] border-[#E5E2D9] hover:border-[#14532D]/40'
                }`}
              >
                <span
                  className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                    checked
                      ? 'bg-[#14532D] border-[#14532D] text-white'
                      : 'bg-[#FFFFFF] border-[#C7C2B4]'
                  }`}
                >
                  {checked && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#17211A] truncate">
                    {mat.name}
                  </div>
                  <div className="text-xs text-[#4A594E] truncate">{mat.family}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scientific Comparability Warning */}
      <div className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-[#37443B]">
        <Info className="w-5 h-5 text-[#14532D] shrink-0 mt-0.5" aria-hidden="true" />
        <div className="leading-relaxed">
          <span className="font-semibold text-[#17211A]">
            Scientific Comparability Principle:{' '}
          </span>
          Property values vary substantially with polymer grade, plasticizer content,
          film thickness, ambient relative humidity, and test protocol (e.g., ASTM D882
          vs. ISO 527; ASTM E96 at 25 °C vs. 38 °C / 90 % RH). Never compare values
          without verifying matching conditions in each cell below.
        </div>
      </div>

      {selectedMaterials.length < 2 ? (
        <div className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl p-10 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-[#B45309] mx-auto" aria-hidden="true" />
          <h3 className="font-display text-lg font-semibold text-[#17211A]">
            Select at least two bioplastics
          </h3>
          <p className="text-sm text-[#4A594E] max-w-md mx-auto">
            Side-by-side comparison requires 2 or more selected materials. Use the
            checkboxes or preset buttons above to load materials.
          </p>
        </div>
      ) : (
        <>
          {/* Interactive Range Chart */}
          <PropertyComparisonChart
            selectedMaterials={selectedMaterials}
            propertyDefinitions={propertyDefinitions}
          />

          {/* Table Filter Controls */}
          <div className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search
                className="w-4 h-4 text-[#5E6D62] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={propertySearch}
                onChange={(e) => setPropertySearch(e.target.value)}
                placeholder="Search properties (e.g. WVTR, MPa, migration)..."
                aria-label="Search comparison properties"
                className="w-full h-10 pl-10 pr-4 text-sm bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg text-[#17211A] focus:outline-none focus:ring-2 focus:ring-[#14532D]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 p-1 bg-[#F3F1EA] rounded-lg">
                {[
                  { id: 'all', label: 'All 8 Properties' },
                  { id: 'mechanical', label: 'Mechanical & Optical' },
                  { id: 'barrier', label: 'Barrier & Migration' },
                  { id: 'environmental', label: 'Degradation & RH' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() =>
                      setPropertyCategory(
                        tab.id as 'all' | 'mechanical' | 'barrier' | 'environmental'
                      )
                    }
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      propertyCategory === tab.id
                        ? 'bg-[#FFFFFF] text-[#14532D] font-semibold shadow-xs'
                        : 'text-[#4A594E] hover:text-[#17211A]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowFullConditions((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg text-[#17211A] hover:bg-[#F3F1EA] whitespace-nowrap"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                <span>
                  {showFullConditions
                    ? 'Hide Full Test Metadata'
                    : 'Show Full Test Metadata'}
                </span>
              </button>
            </div>
          </div>

          {/* Side-by-Side Comparison Matrix */}
          <div className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8F7F3] border-b border-[#E5E2D9]">
                    <th className="py-4 px-4 text-xs font-semibold text-[#17211A] min-w-[220px] align-bottom">
                      Property &amp; Unit
                    </th>
                    {selectedMaterials.map((mat) => (
                      <th
                        key={mat.id}
                        className="py-4 px-4 min-w-[230px] align-bottom border-l border-[#E5E2D9]"
                      >
                        <div className="text-[11px] font-normal text-[#4A594E]">
                          {mat.family}
                        </div>
                        <button
                          type="button"
                          onClick={() => onSelectMaterialDetail(mat)}
                          className="font-display text-sm font-bold text-[#14532D] hover:underline text-left mt-0.5"
                        >
                          {mat.name}
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E2D9]">
                  {filteredProperties.map((prop) => (
                    <tr key={prop.key} className="align-top">
                      <td className="py-4 px-4 bg-[#FCFBF8]">
                        <div className="font-display text-sm font-semibold text-[#17211A]">
                          {prop.label}
                        </div>
                        <div className="font-mono text-xs text-[#14532D] mt-0.5">
                          Unit: {prop.unit}
                        </div>
                        <p className="text-xs text-[#4A594E] leading-relaxed mt-2">
                          {prop.description}
                        </p>
                      </td>

                      {selectedMaterials.map((mat) => {
                        const entry = mat.properties[prop.key];
                        const isUnavailable = entry.sourceType === 'Not available';
                        return (
                          <td
                            key={`${prop.key}-${mat.id}`}
                            className="py-4 px-4 border-l border-[#E5E2D9] space-y-2"
                          >
                            <div
                              className={`text-sm ${
                                isUnavailable
                                  ? 'text-[#5E6D62] italic'
                                  : 'font-mono tabular-nums font-semibold text-[#17211A]'
                              }`}
                            >
                              {entry.value}
                            </div>

                            {!isUnavailable && (
                              <div className="text-[11px] font-mono text-[#4A594E]">
                                Unit: {entry.unit}
                              </div>
                            )}

                            {showFullConditions && (
                              <div className="pt-2 border-t border-[#F0EDE4] space-y-1 text-[11px] text-[#4A594E] leading-relaxed">
                                <div>
                                  <span className="font-semibold text-[#17211A]">
                                    Method:{' '}
                                  </span>
                                  {entry.testMethod}
                                </div>
                                <div className="font-mono">
                                  Thickness: {entry.sampleThickness} · Temp:{' '}
                                  {entry.temperature} · RH: {entry.relativeHumidity}
                                </div>
                                <div>
                                  <span className="font-semibold text-[#17211A]">
                                    Formulation:{' '}
                                  </span>
                                  {entry.formulation}
                                </div>
                                <div>
                                  <span className="font-semibold text-[#17211A]">
                                    Source ({entry.sourceType}):{' '}
                                  </span>
                                  {entry.reference}
                                </div>
                                <div className="text-[#5E6D62] italic pt-0.5">
                                  {entry.notes}
                                </div>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

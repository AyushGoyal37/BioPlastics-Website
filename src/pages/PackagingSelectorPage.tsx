import React, { useState } from 'react';
import { Info, ArrowLeftRight, ArrowRight } from 'lucide-react';
import {
  BioplasticMaterial,
  PackagingCategory,
  PageId,
} from '../types/bioplastics';

interface PackagingSelectorPageProps {
  categories: PackagingCategory[];
  disclaimer: string;
  materials: BioplasticMaterial[];
  onSelectMaterial: (material: BioplasticMaterial) => void;
  onCompareCandidateSet: (materialIds: string[]) => void;
  onNavigate: (page: PageId) => void;
}

export const PackagingSelectorPage: React.FC<PackagingSelectorPageProps> = ({
  categories,
  disclaimer,
  materials,
  onSelectMaterial,
  onCompareCandidateSet,
  onNavigate,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    categories[0]?.id || ''
  );

  const activeCategory =
    categories.find((c) => c.id === selectedCategoryId) || categories[0];

  const handleCompareCandidates = () => {
    if (!activeCategory) return;
    const ids = activeCategory.candidateMaterials.map((c) => c.materialId);
    onCompareCandidateSet(ids);
    onNavigate('compare');
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-[#E5E2D9] pb-6 space-y-2">
        <h1 className="font-display text-3xl font-bold text-[#17211A]">
          Packaging Selector
        </h1>
        <p className="text-[15px] text-[#4A594E] max-w-3xl leading-relaxed">
          Explore which characterization properties are most relevant for six major
          food-packaging categories and inspect candidate bioplastic families for
          preliminary R&amp;D screening.
        </p>
      </div>

      {/* Preliminary Exploration Notice */}
      <div className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-[#37443B]">
        <Info className="w-5 h-5 text-[#14532D] shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">{disclaimer}</p>
      </div>

      {/* 6 Food Category Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((cat) => {
          const isActive = cat.id === activeCategory.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategoryId(cat.id)}
              aria-pressed={isActive}
              className={`p-3.5 rounded-xl border text-left transition-colors min-h-[72px] flex flex-col justify-between ${
                isActive
                  ? 'bg-[#14532D] border-[#14532D] text-white'
                  : 'bg-[#FFFFFF] border-[#E5E2D9] text-[#17211A] hover:border-[#14532D]/45'
              }`}
            >
              <span className="font-display text-sm font-semibold leading-snug">
                {cat.name}
              </span>
              <span
                className={`text-[11px] font-mono mt-1 ${
                  isActive ? 'text-white/80' : 'text-[#5E6D62]'
                }`}
              >
                {cat.candidateMaterials.length} candidates
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Food Category Workspace */}
      {activeCategory && (
        <div className="space-y-8">
          {/* Category Overview + Requirements */}
          <div className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#E5E2D9] pb-5">
              <div className="space-y-1.5 max-w-3xl">
                <div className="text-xs font-mono text-[#14532D]">
                  Preliminary Application Profile
                </div>
                <h2 className="font-display text-2xl font-bold text-[#17211A]">
                  {activeCategory.name}
                </h2>
                <p className="text-sm text-[#37443B] leading-relaxed">
                  {activeCategory.summary}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCompareCandidates}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#14532D] hover:bg-[#166534] rounded-lg transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto"
              >
                <ArrowLeftRight className="w-4 h-4" aria-hidden="true" />
                <span>Compare Candidate Bioplastics</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {activeCategory.keyRequirements.map((req, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#F8F7F3] border border-[#E5E2D9] space-y-1.5"
                >
                  <div className="text-xs font-mono text-[#14532D]">
                    Requirement 0{idx + 1}
                  </div>
                  <h3 className="font-display text-base font-semibold text-[#17211A]">
                    {req.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A594E] leading-relaxed">
                    {req.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Relevant Material Properties & Why They Matter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl p-6 space-y-4">
              <h3 className="font-display text-lg font-bold text-[#17211A]">
                Why Specific Properties Matter
              </h3>
              <div className="divide-y divide-[#E5E2D9]">
                {activeCategory.relevantProperties.map((rp) => (
                  <div key={rp.propertyKey} className="py-3.5 first:pt-0 last:pb-0 space-y-1">
                    <div className="text-sm font-semibold text-[#14532D]">
                      {rp.propertyName}
                    </div>
                    <p className="text-xs sm:text-sm text-[#37443B] leading-relaxed">
                      {rp.whyItMatters}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Candidate Bioplastics (Explicitly non-ranking) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-[#17211A]">
                  Potential Candidate Bioplastics (Unranked)
                </h3>
                <span className="text-xs text-[#5E6D62]">
                  No single material declared optimal
                </span>
              </div>

              <div className="space-y-4">
                {activeCategory.candidateMaterials.map((cand) => {
                  const fullMat = materials.find((m) => m.id === cand.materialId);
                  return (
                    <div
                      key={cand.materialId}
                      className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl p-5 space-y-2.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-display text-base font-bold text-[#17211A]">
                          {cand.materialName}
                        </h4>
                        {fullMat && (
                          <button
                            type="button"
                            onClick={() => onSelectMaterial(fullMat)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#14532D] hover:underline whitespace-nowrap"
                          >
                            <span>Inspect Full Profile</span>
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-[#17211A] font-medium">
                        Typical Application Role: {cand.roleContext}
                      </p>
                      <p className="text-xs sm:text-sm text-[#4A594E] leading-relaxed">
                        <span className="font-semibold text-[#37443B]">
                          Technical Consideration:{' '}
                        </span>
                        {cand.consideration}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-[#F3F1EA] border border-[#E5E2D9] text-xs text-[#37443B] leading-relaxed">
                <span className="font-semibold text-[#17211A]">
                  Laboratory Validation Reminder:{' '}
                </span>
                {activeCategory.validationNote} Actual suitability requires testing with
                the specific food product, coating/additive formulation, target
                temperature-humidity storage profile, and applicable food-contact safety
                regulations.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

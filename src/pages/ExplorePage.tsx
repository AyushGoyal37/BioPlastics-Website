import React, { useMemo, useState } from 'react';
import { Search, ArrowLeftRight, Check, RotateCcw } from 'lucide-react';
import { BioplasticMaterial, PageId } from '../types/bioplastics';
import { ResilientMaterialImage } from '../components/BioplasticVisuals';

interface ExplorePageProps {
  materials: BioplasticMaterial[];
  initialSearch?: string;
  selectedCompareIds: string[];
  onToggleCompare: (id: string) => void;
  onSelectMaterial: (material: BioplasticMaterial) => void;
  onNavigate: (page: PageId) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  materials,
  initialSearch = '',
  selectedCompareIds,
  onToggleCompare,
  onSelectMaterial,
  onNavigate,
}) => {
  const [query, setQuery] = useState(initialSearch);
  const [familyFilter, setFamilyFilter] = useState<string>('all');
  const [degradationFilter, setDegradationFilter] = useState<string>('all');

  const filteredMaterials = useMemo(() => {
    const q = query.trim().toLowerCase();
    return materials.filter((mat) => {
      const matchesQuery =
        !q ||
        mat.name.toLowerCase().includes(q) ||
        mat.shortName.toLowerCase().includes(q) ||
        mat.family.toLowerCase().includes(q) ||
        mat.shortIntro.toLowerCase().includes(q) ||
        mat.biobasedOrigin.toLowerCase().includes(q) ||
        mat.applications.some((a) => a.toLowerCase().includes(q));

      const matchesFamily =
        familyFilter === 'all' ||
        (familyFilter === 'polyester' && mat.family.includes('Polyester')) ||
        (familyFilter === 'polysaccharide' &&
          mat.family.toLowerCase().includes('polysaccharide'));

      const matchesDegradation =
        degradationFilter === 'all' ||
        (degradationFilter === 'industrial' &&
          mat.biodegradationEnvironment.toLowerCase().includes('industrial')) ||
        (degradationFilter === 'natural' &&
          (mat.biodegradationEnvironment.toLowerCase().includes('marine') ||
            mat.biodegradationEnvironment.toLowerCase().includes('home compost') ||
            mat.biodegradationEnvironment.toLowerCase().includes('soil')));

      return matchesQuery && matchesFamily && matchesDegradation;
    });
  }, [materials, query, familyFilter, degradationFilter]);

  const resetFilters = () => {
    setQuery('');
    setFamilyFilter('all');
    setDegradationFilter('all');
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[#E5E2D9] pb-6">
        <div className="space-y-2 max-w-2xl">
          <h1 className="font-display text-3xl font-bold text-[#17211A]">
            Explore Bioplastics
          </h1>
          <p className="text-[15px] text-[#4A594E] leading-relaxed">
            Inspect six major biopolymer families studied for sustainable food
            packaging. Open any profile for chemical repeating-unit schematics,
            synthesis pathways, and literature-reported properties.
          </p>
        </div>

        {selectedCompareIds.length > 0 && (
          <button
            type="button"
            onClick={() => onNavigate('compare')}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#14532D] hover:bg-[#166534] rounded-lg transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto"
          >
            <ArrowLeftRight className="w-4 h-4" aria-hidden="true" />
            <span>Compare Selected ({selectedCompareIds.length})</span>
          </button>
        )}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            className="w-4 h-4 text-[#5E6D62] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by name, feedstock, or food application..."
            aria-label="Filter bioplastic materials"
            className="w-full h-10 pl-10 pr-4 text-sm bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg text-[#17211A] placeholder:text-[#6B796F] focus:outline-none focus:ring-2 focus:ring-[#14532D]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-[#F3F1EA] rounded-lg">
            {[
              { id: 'all', label: 'All Families' },
              { id: 'polyester', label: 'Polyesters' },
              { id: 'polysaccharide', label: 'Polysaccharides' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFamilyFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  familyFilter === tab.id
                    ? 'bg-[#FFFFFF] text-[#14532D] font-semibold shadow-xs'
                    : 'text-[#4A594E] hover:text-[#17211A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <select
            value={degradationFilter}
            onChange={(e) => setDegradationFilter(e.target.value)}
            aria-label="Filter by biodegradation profile"
            className="h-10 px-3 text-xs font-medium bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg text-[#17211A] focus:outline-none focus:ring-2 focus:ring-[#14532D]"
          >
            <option value="all">All Degradation Profiles</option>
            <option value="industrial">Industrial Compost Profile</option>
            <option value="natural">Soil / Home / Marine Capable</option>
          </select>

          {(query || familyFilter !== 'all' || degradationFilter !== 'all') && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#4A594E] hover:text-[#17211A] transition-colors whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Material Grid */}
      {filteredMaterials.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl p-10 text-center space-y-3">
          <p className="text-base font-semibold text-[#17211A]">
            No bioplastics match the current filter criteria.
          </p>
          <p className="text-sm text-[#4A594E]">
            Try clearing your search query or resetting the family filter.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#14532D] rounded-lg hover:bg-[#166534] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((mat) => {
            const isCompared = selectedCompareIds.includes(mat.id);
            return (
              <article
                key={mat.id}
                className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#14532D]/45 transition-colors"
              >
                <div>
                  <ResilientMaterialImage
                    src={mat.imagePath}
                    alt={`${mat.name} laboratory characterization sample`}
                    title={mat.name}
                    className="w-full h-48"
                    cropClass={mat.imageCropClass}
                  />

                  <div className="p-5 space-y-4">
                    <div className="space-y-1.5">
                      <div className="text-xs text-[#4A594E] flex flex-wrap items-center gap-1.5">
                        <span>{mat.family}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-[11px] text-[#14532D]">
                          {mat.chemicalStructure.repeatingUnit.split('—')[0].trim()}
                        </span>
                      </div>
                      <h2 className="font-display text-xl font-bold text-[#17211A]">
                        {mat.name}
                      </h2>
                      <p className="text-sm text-[#37443B] leading-relaxed">
                        {mat.shortIntro}
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-[#E5E2D9] text-xs">
                      <div>
                        <span className="font-semibold text-[#17211A]">
                          Source &amp; Production:{' '}
                        </span>
                        <span className="text-[#4A594E]">{mat.biobasedOrigin}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#17211A]">
                          Potential Applications:{' '}
                        </span>
                        <span className="text-[#4A594E]">
                          {mat.applications.slice(0, 2).join('; ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-[#E5E2D9] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectMaterial(mat)}
                    className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-[#14532D] hover:bg-[#166534] rounded-lg transition-colors text-center whitespace-nowrap"
                  >
                    View Details
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleCompare(mat.id)}
                    aria-pressed={isCompared}
                    className={`inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                      isCompared
                        ? 'bg-[#14532D]/10 border-[#14532D] text-[#14532D]'
                        : 'bg-[#F8F7F3] border-[#D7D2C5] text-[#37443B] hover:bg-[#F3F1EA]'
                    }`}
                  >
                    {isCompared ? (
                      <>
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Selected</span>
                      </>
                    ) : (
                      <>
                        <ArrowLeftRight className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Compare</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

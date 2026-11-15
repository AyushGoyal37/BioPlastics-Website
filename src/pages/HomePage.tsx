import React, { useMemo, useState } from 'react';
import {
  Search,
  ArrowRight,
  ArrowLeftRight,
  Layers,
  ShieldCheck,
  BookOpen,
  Package,
  Scale,
} from 'lucide-react';
import { BioplasticMaterial, PageId } from '../types/bioplastics';
import { ResilientMaterialImage } from '../components/BioplasticVisuals';
import { PLATFORM_IMAGES } from '../assets/materialImages';

interface HomePageProps {
  materials: BioplasticMaterial[];
  propertyCount: number;
  packagingCategoryCount: number;
  paperCount: number;
  onNavigate: (page: PageId) => void;
  onSearchToExplore: (query: string) => void;
  onSelectMaterial: (material: BioplasticMaterial) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  materials,
  propertyCount,
  packagingCategoryCount,
  paperCount,
  onNavigate,
  onSearchToExplore,
  onSelectMaterial,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const quickMatches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return materials.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.shortName.toLowerCase().includes(q) ||
        m.family.toLowerCase().includes(q) ||
        m.shortIntro.toLowerCase().includes(q) ||
        m.biobasedOrigin.toLowerCase().includes(q)
    );
  }, [materials, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchToExplore(searchQuery.trim());
  };

  return (
    <div className="space-y-20 pb-8">
      {/* Hero Section */}
      <section className="bg-[#FFFFFF] border-b border-[#E5E2D9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="text-xs font-medium text-[#14532D] tracking-wide">
                Biotechnology Research Platform · Food-Packaging Characterization
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#17211A] leading-[1.14] text-balance">
                Explore the Future of Sustainable Plastics
              </h1>

              <p className="text-base sm:text-lg text-[#4A594E] leading-relaxed max-w-xl">
                Discover, compare, and understand different bioplastics for sustainable
                food-packaging applications.
              </p>

              {/* Material Search Bar */}
              <div className="relative max-w-xl">
                <form onSubmit={handleSearchSubmit} className="flex gap-2">
                  <div className="relative flex-1">
                    <Search
                      className="w-4 h-4 text-[#5E6D62] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search PLA, PHA, starch, cellulose, chitosan, alginate..."
                      aria-label="Search bioplastic materials"
                      className="w-full h-11 pl-10 pr-4 text-sm bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg text-[#17211A] placeholder:text-[#6B796F] focus:outline-none focus:ring-2 focus:ring-[#14532D] focus:border-[#14532D]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-11 px-4 text-sm font-semibold text-[#17211A] bg-[#F3F1EA] hover:bg-[#E5E2D9] border border-[#D7D2C5] rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    Search
                  </button>
                </form>

                {/* Live Dropdown Suggestions */}
                {quickMatches.length > 0 && (
                  <div className="absolute left-0 right-0 mt-1.5 bg-[#FFFFFF] border border-[#D7D2C5] rounded-xl shadow-lg z-20 divide-y divide-[#E5E2D9] overflow-hidden">
                    {quickMatches.map((mat) => (
                      <button
                        key={mat.id}
                        type="button"
                        onClick={() => onSelectMaterial(mat)}
                        className="w-full px-4 py-2.5 text-left hover:bg-[#F8F7F3] flex items-center justify-between gap-3 transition-colors"
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-[#17211A] truncate">
                            {mat.name}
                          </div>
                          <div className="text-xs text-[#4A594E] truncate">
                            {mat.family} · {mat.biobasedOrigin}
                          </div>
                        </div>
                        <span className="text-xs font-medium text-[#14532D] shrink-0">
                          View details →
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Primary & Secondary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('explore')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#14532D] hover:bg-[#166534] rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>Explore Materials</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('compare')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#14532D] bg-[#FFFFFF] hover:bg-[#F3F1EA] border border-[#14532D]/35 rounded-lg transition-colors whitespace-nowrap"
                >
                  <ArrowLeftRight className="w-4 h-4" aria-hidden="true" />
                  <span>Compare Materials</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[280px] lg:min-h-[380px] rounded-2xl overflow-hidden border border-[#E5E2D9] bg-[#F8F7F3]">
                <ResilientMaterialImage
                  src={PLATFORM_IMAGES.heroBioplasticsLab}
                  alt="Translucent biodegradable bioplastic food packaging film, molded plant-fiber tray, and polymer pellet beakers in a botanical laboratory"
                  title="Bioplastics Food Packaging Laboratory"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Factual Platform Coverage Strip (Strictly grounded in local JSON counts) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-8 border-t border-[#E5E2D9]">
            <div className="p-4 rounded-xl bg-[#F8F7F3] border border-[#E5E2D9]">
              <div className="font-mono tabular-nums text-2xl font-semibold text-[#14532D]">
                {materials.length}
              </div>
              <div className="text-xs font-medium text-[#17211A] mt-1">
                Biopolymer Families Profiled
              </div>
              <div className="text-[11px] text-[#5E6D62] mt-0.5">
                PLA, PHA/PHB, Starch, Cellulose, Chitosan, Alginate
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#F8F7F3] border border-[#E5E2D9]">
              <div className="font-mono tabular-nums text-2xl font-semibold text-[#14532D]">
                {propertyCount}
              </div>
              <div className="text-xs font-medium text-[#17211A] mt-1">
                Characterization Parameters
              </div>
              <div className="text-[11px] text-[#5E6D62] mt-0.5">
                Mechanical, barrier, surface, migration &amp; breakdown
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#F8F7F3] border border-[#E5E2D9]">
              <div className="font-mono tabular-nums text-2xl font-semibold text-[#14532D]">
                {packagingCategoryCount}
              </div>
              <div className="text-xs font-medium text-[#17211A] mt-1">
                Food-Packaging Categories
              </div>
              <div className="text-[11px] text-[#5E6D62] mt-0.5">
                Fresh produce, meat, bakery, dry &amp; ready-to-eat
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#F8F7F3] border border-[#E5E2D9]">
              <div className="font-mono tabular-nums text-2xl font-semibold text-[#14532D]">
                {paperCount}
              </div>
              <div className="text-xs font-medium text-[#17211A] mt-1">
                Peer-Reviewed Literature Sources
              </div>
              <div className="text-[11px] text-[#5E6D62] mt-0.5">
                Presentation references &amp; extensible JSON library
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brief Introduction & Bio-based vs Biodegradable Matrix */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#17211A] text-balance">
              Bio-based vs. Biodegradable: Overlapping, Not Identical
            </h2>
            <p className="text-[15px] text-[#37443B] leading-relaxed">
              The umbrella term &ldquo;bioplastics&rdquo; encompasses two distinct
              scientific dimensions: <strong>feedstock origin</strong> (bio-based vs.
              petrochemical) and <strong>end-of-life behaviour</strong> (biodegradable
              under defined conditions vs. non-biodegradable).
            </p>
            <p className="text-[15px] text-[#37443B] leading-relaxed">
              Because characterization data, testing standards, and ambient
              conditioning vary widely across published papers, comparing materials
              without recording test method, thickness, temperature, and relative
              humidity often leads to misleading food-packaging choices.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#14532D]/30 space-y-2">
              <div className="text-xs font-mono font-semibold text-[#14532D]">
                Bio-based + Biodegradable
              </div>
              <h3 className="font-display text-base font-semibold text-[#17211A]">
                Renewable &amp; Microbially Assailable
              </h3>
              <p className="text-sm text-[#4A594E] leading-relaxed">
                Examples: <strong>PLA</strong> (requires ~58 °C industrial composting),{' '}
                <strong>PHA/PHB</strong>, <strong>Thermoplastic Starch</strong>,{' '}
                <strong>Chitosan</strong>, <strong>Alginate</strong>, and uncoated
                regenerated cellulose.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E5E2D9] space-y-2">
              <div className="text-xs font-mono font-semibold text-[#4A594E]">
                Bio-based + Non-Biodegradable
              </div>
              <h3 className="font-display text-base font-semibold text-[#17211A]">
                Drop-in Renewable Polymers
              </h3>
              <p className="text-sm text-[#4A594E] leading-relaxed">
                Examples: Sugarcane-derived <strong>Bio-PE</strong> or{' '}
                <strong>Bio-PET</strong>. Derived from biomass, yet chemically identical
                to conventional plastics—designed for mechanical recycling, not
                composting.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E5E2D9] space-y-2">
              <div className="text-xs font-mono font-semibold text-[#4A594E]">
                Fossil-based + Biodegradable
              </div>
              <h3 className="font-display text-base font-semibold text-[#17211A]">
                Synthetic Biodegradable Polyesters
              </h3>
              <p className="text-sm text-[#4A594E] leading-relaxed">
                Examples: <strong>PBAT</strong> and <strong>PCL</strong>. Synthesized
                from petrochemical monomers, often blended with starch or PLA to impart
                flexibility while retaining compostability.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F3F1EA] border border-[#E5E2D9] space-y-2">
              <div className="text-xs font-mono font-semibold text-[#5E6D62]">
                Fossil-based + Non-Biodegradable
              </div>
              <h3 className="font-display text-base font-semibold text-[#17211A]">
                Conventional Commodity Plastics
              </h3>
              <p className="text-sm text-[#4A594E] leading-relaxed">
                Examples: <strong>LDPE, PP, PET, PS</strong>. Benchmark reference
                plastics for barrier and tensile performance, persisting in natural
                environments if mismanaged.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Major Material Families Covered */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#17211A]">
              Major Material Families Covered
            </h2>
            <p className="text-sm text-[#4A594E] mt-1">
              Click any biopolymer family to inspect its chemical repeating unit,
              production route, and literature-reported properties.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="text-sm font-semibold text-[#14532D] hover:underline whitespace-nowrap shrink-0"
          >
            View all in Explore Bioplastics →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {materials.map((mat) => (
            <div
              key={mat.id}
              className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl overflow-hidden hover:border-[#14532D]/45 transition-colors flex flex-col"
            >
              <ResilientMaterialImage
                src={mat.imagePath}
                alt={`${mat.name} sample`}
                title={mat.name}
                className="w-full h-44"
                cropClass={mat.imageCropClass}
              />
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs text-[#4A594E] flex items-center gap-2">
                    <span>{mat.family}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-[11px]">{mat.shortName}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#17211A]">
                    {mat.name}
                  </h3>
                  <p className="text-sm text-[#4A594E] leading-relaxed line-clamp-3">
                    {mat.shortIntro}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5E2D9] flex items-center justify-between gap-3">
                  <span className="text-xs text-[#5E6D62] truncate">
                    {mat.biobasedOrigin.split('(')[0].trim()}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectMaterial(mat)}
                    className="text-xs font-semibold text-[#14532D] hover:underline whitespace-nowrap shrink-0"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Material Properties Matter in Food Packaging */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-5 min-h-[260px]">
            <ResilientMaterialImage
              src={PLATFORM_IMAGES.packagingSustainableFood}
              alt="Fresh produce, berries, and dry grains packaged in transparent bioplastic wraps and plant-based trays"
              title="Food Packaging Applications"
              className="w-full h-full"
            />
          </div>
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-5 flex flex-col justify-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#17211A] text-balance">
              Why Material Properties Matter in Food Packaging
            </h2>
            <p className="text-[15px] text-[#37443B] leading-relaxed">
              Food packaging is not an inert wrapper—it governs shelf life, food safety,
              and physical integrity. A polymer that works well for dry grains can fail
              rapidly with moist produce or acidic sauces.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-[#17211A]">
                  Moisture &amp; Humidity Sensitivity
                </h3>
                <p className="text-xs text-[#4A594E] leading-relaxed">
                  Polysaccharide films (starch, cellulose, chitosan, alginate) exhibit
                  high WVTR and moisture plasticization above 65–75% RH, unlike
                  hydrophobic polyesters (PHA, PLA).
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-[#17211A]">
                  Mechanical &amp; Optical Trade-offs
                </h3>
                <p className="text-xs text-[#4A594E] leading-relaxed">
                  Amorphous PLA provides &gt; 90% transparency for retail display, whereas
                  crystalline PHB delivers better moisture resistance at the cost of
                  higher haze and brittleness.
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-[#17211A]">
                  Food-Contact Migration Safety
                </h3>
                <p className="text-xs text-[#4A594E] leading-relaxed">
                  Plasticizers (e.g., glycerol), residual monomers, or acid solvents can
                  leach into aqueous, acidic, or fatty foods unless validated under
                  food-simulant testing.
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-[#17211A]">
                  End-of-Life &amp; Regulatory Reality
                </h3>
                <p className="text-xs text-[#4A594E] leading-relaxed">
                  Biodegradability depends on environmental temperature and microbial
                  enzymes, while Indian EPR rules require formal certification rather
                  than self-declared claims.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Overview */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#17211A]">
            Platform Capabilities
          </h2>
          <p className="text-sm text-[#4A594E] mt-1">
            Structured tools for researchers, biotechnology students, and packaging
            teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              page: 'explore' as PageId,
              icon: Layers,
              title: 'Explore Bioplastics',
              desc: 'Detailed profiles covering chemical repeating units, synthesis pathways, applications, and limitations.',
            },
            {
              page: 'compare' as PageId,
              icon: ArrowLeftRight,
              title: 'Property Comparison',
              desc: 'Side-by-side matrix of 8 core properties with test methods, thickness, RH conditions, and range charts.',
            },
            {
              page: 'packaging' as PageId,
              icon: Package,
              title: 'Packaging Selector',
              desc: 'Preliminary mapping of 6 food categories to key packaging requirements and candidate biopolymers.',
            },
            {
              page: 'suppliers' as PageId,
              icon: Scale,
              title: 'Cost & Suppliers',
              desc: 'Transparent directory clearly distinguishing illustrative benchmark ranges from unverified vendor fields.',
            },
            {
              page: 'regulations' as PageId,
              icon: ShieldCheck,
              title: 'EPR & Regulations',
              desc: 'Educational breakdown of India’s PWM Rules, CPCB EPR portal obligations, and certification rules.',
            },
            {
              page: 'research' as PageId,
              icon: BookOpen,
              title: 'Research Library',
              desc: 'Verified foundational reviews with search, material filters, and an extensible reference entry workflow.',
            },
          ].map((feat) => {
            const Icon = feat.icon;
            return (
              <button
                key={feat.page}
                type="button"
                onClick={() => {
                  onNavigate(feat.page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left p-6 bg-[#FFFFFF] border border-[#E5E2D9] hover:border-[#14532D]/50 rounded-xl transition-colors space-y-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F3F1EA] text-[#14532D] flex items-center justify-center group-hover:bg-[#14532D] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-base font-semibold text-[#17211A]">
                  {feat.title}
                </h3>
                <p className="text-sm text-[#4A594E] leading-relaxed">{feat.desc}</p>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

import React, { useMemo, useState } from 'react';
import {
  Search,
  ExternalLink,
  Plus,
  X,
  RotateCcw,
  FileJson,
  ArrowUpRight,
} from 'lucide-react';
import {
  BioplasticMaterial,
  PageId,
  ResearchPaper,
} from '../types/bioplastics';

interface ResearchLibraryPageProps {
  papers: ResearchPaper[];
  materials: BioplasticMaterial[];
  onAddPaper: (paper: ResearchPaper) => void;
  onSelectMaterial: (material: BioplasticMaterial) => void;
  onNavigate: (page: PageId) => void;
}

const MATERIAL_OPTIONS = [
  'PLA',
  'PHA / PHB',
  'Starch-based',
  'Cellulose-based',
  'Chitosan-based',
  'Alginate-based',
];

const PROPERTY_OPTIONS = [
  'Tensile Strength',
  'WVTR',
  'Contact Angle',
  'Biodegradability',
  'Transparency',
  'Leaching / Migration',
  'Humidity Response',
  'Load-Bearing Capacity',
];

const TOPIC_OPTIONS = [
  'Material Characterization',
  'Barrier Properties',
  'Packaging Applications',
  'Processing & Production',
  'Biodegradation & End-of-Life',
  'Regulatory & Environmental Impact',
];

const MATERIAL_NAME_TO_ID: Record<string, string> = {
  PLA: 'pla',
  'PHA / PHB': 'pha',
  'Starch-based': 'starch',
  'Cellulose-based': 'cellulose',
  'Chitosan-based': 'chitosan',
  'Alginate-based': 'alginate',
};

export const ResearchLibraryPage: React.FC<ResearchLibraryPageProps> = ({
  papers,
  materials,
  onAddPaper,
  onSelectMaterial,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [materialFilter, setMaterialFilter] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showJsonSchema, setShowJsonSchema] = useState(false);

  // Add-paper form state
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [year, setYear] = useState('2025');
  const [journal, setJournal] = useState('');
  const [volumeIssuePages, setVolumeIssuePages] = useState('');
  const [doiOrLink, setDoiOrLink] = useState('');
  const [relevanceSummary, setRelevanceSummary] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(['PLA']);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([
    'Tensile Strength',
  ]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Material Characterization',
  ]);
  const [formError, setFormError] = useState('');

  const availableYears = useMemo(() => {
    const unique = Array.from(new Set(papers.map((p) => p.year)));
    return unique.sort((a, b) => b - a);
  }, [papers]);

  const filteredPapers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return papers.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.journal.toLowerCase().includes(q) ||
        p.relevanceSummary.toLowerCase().includes(q) ||
        (p.doiOrLink && p.doiOrLink.toLowerCase().includes(q)) ||
        String(p.year).includes(q);

      const matchesYear =
        yearFilter === 'all' || String(p.year) === yearFilter;

      const matchesMaterial =
        materialFilter === 'all' ||
        p.relatedMaterials.includes(materialFilter);

      const matchesTopic =
        topicFilter === 'all' ||
        (p.researchTopics && p.researchTopics.includes(topicFilter));

      const matchesProperty =
        propertyFilter === 'all' ||
        p.relatedProperties.includes(propertyFilter);

      return (
        matchesQuery &&
        matchesYear &&
        matchesMaterial &&
        matchesTopic &&
        matchesProperty
      );
    });
  }, [
    papers,
    searchQuery,
    yearFilter,
    materialFilter,
    topicFilter,
    propertyFilter,
  ]);

  const toggleMulti = (
    item: string,
    current: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(
      current.includes(item)
        ? current.filter((x) => x !== item)
        : [...current, item]
    );
  };

  const handleOpenMaterialProfile = (matLabel: string) => {
    const id = MATERIAL_NAME_TO_ID[matLabel];
    const found = materials.find((m) => m.id === id);
    if (found) {
      onSelectMaterial(found);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !title.trim() ||
      !authors.trim() ||
      !journal.trim() ||
      !relevanceSummary.trim()
    ) {
      setFormError(
        'Please fill in Title, Authors, Journal, and Relevance Summary.'
      );
      return;
    }
    const parsedYear = parseInt(year, 10);
    if (Number.isNaN(parsedYear) || parsedYear < 1950 || parsedYear > 2100) {
      setFormError('Please enter a valid publication year.');
      return;
    }

    const newPaper: ResearchPaper = {
      id: `user-paper-${Date.now()}`,
      title: title.trim(),
      authors: authors.trim(),
      year: parsedYear,
      journal: journal.trim(),
      volumeIssuePages: volumeIssuePages.trim() || undefined,
      doiOrLink: doiOrLink.trim() ? doiOrLink.trim() : null,
      relevanceSummary: relevanceSummary.trim(),
      relatedMaterials: selectedMaterials,
      relatedProperties: selectedProperties,
      researchTopics: selectedTopics,
      isCorePresentationRef: false,
    };

    onAddPaper(newPaper);
    setTitle('');
    setAuthors('');
    setJournal('');
    setVolumeIssuePages('');
    setDoiOrLink('');
    setRelevanceSummary('');
    setFormError('');
    setShowAddForm(false);
  };

  const hasActiveFilters =
    Boolean(searchQuery) ||
    yearFilter !== 'all' ||
    materialFilter !== 'all' ||
    topicFilter !== 'all' ||
    propertyFilter !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setYearFilter('all');
    setMaterialFilter('all');
    setTopicFilter('all');
    setPropertyFilter('all');
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-[#E5E2D9] pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          <div className="text-xs font-mono text-[#14532D]">
            {papers.length} Indexed References · Peer-Reviewed Food Packaging Literature
          </div>
          <h1 className="font-display text-3xl font-bold text-[#17211A]">
            Research Library
          </h1>
          <p className="text-[15px] text-[#4A594E] leading-relaxed">
            Complete scientific bibliography supporting BioPlastics Explorer,
            linking peer-reviewed reviews and experimental studies directly to
            material profiles and characterization properties.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setShowJsonSchema((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold bg-[#FFFFFF] border border-[#D7D2C5] hover:bg-[#F3F1EA] text-[#17211A] rounded-lg transition-colors whitespace-nowrap"
          >
            <FileJson className="w-4 h-4 text-[#14532D]" aria-hidden="true" />
            <span>{showJsonSchema ? 'Hide JSON Schema' : 'View JSON Structure'}</span>
          </button>
          <button
            type="button"
            onClick={() => setShowAddForm((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#14532D] hover:bg-[#166534] rounded-lg transition-colors whitespace-nowrap"
          >
            {showAddForm ? (
              <>
                <X className="w-4 h-4" aria-hidden="true" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Add Research Paper</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Extensible JSON Schema Preview */}
      {showJsonSchema && (
        <div className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-sm font-semibold text-[#17211A]">
              Structured JSON Reference Schema (src/data/researchLibrary.json)
            </h2>
            <span className="text-xs text-[#5E6D62]">
              Extensible for future literature additions
            </span>
          </div>
          <pre className="p-4 rounded-lg bg-[#F8F7F3] border border-[#E5E2D9] text-xs font-mono text-[#17211A] overflow-x-auto max-h-80 leading-relaxed">
{JSON.stringify(papers, null, 2)}
          </pre>
        </div>
      )}

      {/* Structured Add Paper Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-[#FFFFFF] border border-[#14532D]/35 rounded-xl p-6 space-y-5"
        >
          <div className="space-y-1">
            <h2 className="font-display text-lg font-bold text-[#17211A]">
              Add Verified Research Paper
            </h2>
            <p className="text-xs text-[#4A594E]">
              Enter accurate bibliographic metadata from a real peer-reviewed source.
              Added entries persist locally in this browser session.
            </p>
          </div>

          {formError && (
            <div className="p-3 rounded-lg bg-[#FEF2F2] border border-[#FCA5A5] text-xs text-[#991B1B]">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-xs font-semibold text-[#17211A]">
                Paper Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Mechanical and barrier properties of PHBV/PLA blend films"
                className="w-full h-10 px-3 text-sm bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14532D]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#17211A]">
                Authors *
              </label>
              <input
                type="text"
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                placeholder="e.g., Surname, A., & Coauthor, B."
                className="w-full h-10 px-3 text-sm bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14532D]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#17211A]">
                  Year *
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full h-10 px-3 text-sm font-mono bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14532D]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#17211A]">
                  Journal *
                </label>
                <input
                  type="text"
                  value={journal}
                  onChange={(e) => setJournal(e.target.value)}
                  placeholder="Polymers"
                  className="w-full h-10 px-3 text-sm bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14532D]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#17211A]">
                  Vol / Pages
                </label>
                <input
                  type="text"
                  value={volumeIssuePages}
                  onChange={(e) => setVolumeIssuePages(e.target.value)}
                  placeholder="14(8), 1626"
                  className="w-full h-10 px-3 text-sm bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14532D]"
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-xs font-semibold text-[#17211A]">
                DOI or Source URL (Optional)
              </label>
              <input
                type="url"
                value={doiOrLink}
                onChange={(e) => setDoiOrLink(e.target.value)}
                placeholder="https://doi.org/..."
                className="w-full h-10 px-3 text-sm bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14532D]"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-xs font-semibold text-[#17211A]">
                Relevance Summary *
              </label>
              <textarea
                rows={2}
                value={relevanceSummary}
                onChange={(e) => setRelevanceSummary(e.target.value)}
                placeholder="Briefly describe the study's characterization parameters and food-packaging findings..."
                className="w-full p-3 text-sm bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14532D]"
              />
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-semibold text-[#17211A]">
                Related Materials
              </span>
              <div className="flex flex-wrap gap-1.5">
                {MATERIAL_OPTIONS.map((m) => {
                  const active = selectedMaterials.includes(m);
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() =>
                        toggleMulti(m, selectedMaterials, setSelectedMaterials)
                      }
                      className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                        active
                          ? 'bg-[#14532D] border-[#14532D] text-white'
                          : 'bg-[#F8F7F3] border-[#D7D2C5] text-[#37443B]'
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-semibold text-[#17211A]">
                Research Topics
              </span>
              <div className="flex flex-wrap gap-1.5">
                {TOPIC_OPTIONS.map((topic) => {
                  const active = selectedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() =>
                        toggleMulti(topic, selectedTopics, setSelectedTopics)
                      }
                      className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                        active
                          ? 'bg-[#14532D] border-[#14532D] text-white'
                          : 'bg-[#F8F7F3] border-[#D7D2C5] text-[#37443B]'
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <span className="block text-xs font-semibold text-[#17211A]">
                Related Properties
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PROPERTY_OPTIONS.map((prop) => {
                  const active = selectedProperties.includes(prop);
                  return (
                    <button
                      key={prop}
                      type="button"
                      onClick={() =>
                        toggleMulti(prop, selectedProperties, setSelectedProperties)
                      }
                      className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                        active
                          ? 'bg-[#14532D] border-[#14532D] text-white'
                          : 'bg-[#F8F7F3] border-[#D7D2C5] text-[#37443B]'
                      }`}
                    >
                      {prop}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-[#E5E2D9]">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-semibold text-[#4A594E] hover:text-[#17211A]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#14532D] hover:bg-[#166534] rounded-lg transition-colors"
            >
              Save Reference
            </button>
          </div>
        </form>
      )}

      {/* Search & Multi-Facet Filter Toolbar */}
      <div className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          <div className="lg:col-span-4 relative">
            <Search
              className="w-4 h-4 text-[#5E6D62] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, authors, journal, DOI..."
              aria-label="Search research papers"
              className="w-full h-10 pl-10 pr-4 text-sm bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg text-[#17211A] focus:outline-none focus:ring-2 focus:ring-[#14532D]"
            />
          </div>

          <div className="lg:col-span-2">
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              aria-label="Filter papers by publication year"
              className="w-full h-10 px-3 text-xs font-medium bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg text-[#17211A] focus:outline-none focus:ring-2 focus:ring-[#14532D]"
            >
              <option value="all">All Years</option>
              {availableYears.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <select
              value={materialFilter}
              onChange={(e) => setMaterialFilter(e.target.value)}
              aria-label="Filter papers by material type"
              className="w-full h-10 px-3 text-xs font-medium bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg text-[#17211A] focus:outline-none focus:ring-2 focus:ring-[#14532D]"
            >
              <option value="all">All Material Types</option>
              {MATERIAL_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              aria-label="Filter papers by research topic"
              className="w-full h-10 px-3 text-xs font-medium bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg text-[#17211A] focus:outline-none focus:ring-2 focus:ring-[#14532D]"
            >
              <option value="all">All Research Topics</option>
              {TOPIC_OPTIONS.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <select
              value={propertyFilter}
              onChange={(e) => setPropertyFilter(e.target.value)}
              aria-label="Filter papers by property"
              className="w-full h-10 px-3 text-xs font-medium bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg text-[#17211A] focus:outline-none focus:ring-2 focus:ring-[#14532D]"
            >
              <option value="all">All Properties</option>
              {PROPERTY_OPTIONS.map((prop) => (
                <option key={prop} value={prop}>
                  {prop}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-[#5E6D62] pt-1">
          <span className="font-mono tabular-nums">
            Showing {filteredPapers.length} of {papers.length} research papers
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#14532D] hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Papers List */}
      {filteredPapers.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl p-10 text-center space-y-3">
          <p className="text-base font-semibold text-[#17211A]">
            No research entries match your filter criteria.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#14532D] rounded-lg hover:bg-[#166534] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPapers.map((paper, idx) => (
            <article
              key={paper.id}
              className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl p-6 space-y-3.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xs text-[#4A594E] flex flex-wrap items-center gap-2">
                    <span className="font-mono font-semibold text-[#14532D]">
                      {String(idx + 1).padStart(2, '0')}. {paper.year}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="italic font-medium text-[#17211A]">
                      {paper.journal}
                    </span>
                    {paper.volumeIssuePages && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-[11px]">
                          {paper.volumeIssuePages}
                        </span>
                      </>
                    )}
                    {paper.isCorePresentationRef && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#14532D] font-medium">
                          Presentation Reference
                        </span>
                      </>
                    )}
                  </div>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-[#17211A]">
                    {paper.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4A594E]">{paper.authors}</p>
                </div>

                {paper.doiOrLink && (
                  <a
                    href={paper.doiOrLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#14532D] bg-[#F3F1EA] hover:bg-[#E5E2D9] rounded-lg transition-colors whitespace-nowrap shrink-0 self-start"
                  >
                    <span>DOI Link</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>

              <p className="text-sm text-[#37443B] leading-relaxed">
                {paper.relevanceSummary}
              </p>

              {/* Connected Materials, Properties & Topics */}
              <div className="pt-3 border-t border-[#E5E2D9] grid grid-cols-1 lg:grid-cols-12 gap-3 text-xs text-[#4A594E]">
                <div className="lg:col-span-5 flex flex-wrap items-center gap-1.5">
                  <span className="font-semibold text-[#17211A] mr-1">
                    Connected Materials:
                  </span>
                  {paper.relatedMaterials.length > 0 ? (
                    paper.relatedMaterials.map((matLabel) => (
                      <button
                        key={matLabel}
                        type="button"
                        onClick={() => handleOpenMaterialProfile(matLabel)}
                        className="inline-flex items-center gap-0.5 font-medium text-[#14532D] hover:underline bg-[#F8F7F3] border border-[#E5E2D9] px-2 py-0.5 rounded-md transition-colors"
                        title={`Open ${matLabel} profile`}
                      >
                        <span>{matLabel}</span>
                        <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                      </button>
                    ))
                  ) : (
                    <span>General</span>
                  )}
                </div>

                <div className="lg:col-span-4 flex flex-wrap items-center gap-1.5">
                  <span className="font-semibold text-[#17211A] mr-1">
                    Properties:
                  </span>
                  <span>
                    {paper.relatedProperties.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => onNavigate('compare')}
                        className="text-left text-[#37443B] hover:text-[#14532D] hover:underline"
                      >
                        {paper.relatedProperties.join(' · ')}
                      </button>
                    ) : (
                      'General review'
                    )}
                  </span>
                </div>

                <div className="lg:col-span-3 flex flex-wrap items-center gap-1">
                  <span className="font-semibold text-[#17211A] mr-1">
                    Topic:
                  </span>
                  <span>
                    {paper.researchTopics?.length
                      ? paper.researchTopics.join(' · ')
                      : 'General'}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

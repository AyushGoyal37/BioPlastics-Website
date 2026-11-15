import React from 'react';
import { ExternalLink, ShieldAlert, Scale } from 'lucide-react';
import { RegulationsData } from '../types/bioplastics';

interface RegulationsPageProps {
  data: RegulationsData;
}

export const RegulationsPage: React.FC<RegulationsPageProps> = ({ data }) => {
  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-[#E5E2D9] pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          <div className="text-xs font-mono text-[#14532D]">
            {data.jurisdiction}
          </div>
          <h1 className="font-display text-3xl font-bold text-[#17211A]">
            EPR &amp; Packaging Regulations
          </h1>
          <p className="text-[15px] text-[#4A594E] leading-relaxed">
            Educational guide to how bioplastics, compostable polymers, and plastic
            packaging interact with Extended Producer Responsibility (EPR) and India’s
            Plastic Waste Management Rules.
          </p>
        </div>
        <div className="text-xs font-mono text-[#5E6D62] whitespace-nowrap">
          Content Last Verified: {data.lastVerifiedDate}
        </div>
      </div>

      {/* Educational Disclaimer */}
      <div className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl p-4 sm:p-5 flex items-start gap-3 text-xs sm:text-sm text-[#37443B]">
        <Scale className="w-5 h-5 text-[#14532D] shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">{data.educationalDisclaimer}</p>
      </div>

      {/* Critical Non-Exemption Notice */}
      <div className="bg-[#FEF3C7]/45 border border-[#F59E0B]/35 rounded-xl p-5 flex items-start gap-3 text-xs sm:text-sm text-[#78350F]">
        <ShieldAlert
          className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div className="space-y-1 leading-relaxed">
          <div className="font-semibold text-[#92400E]">
            No Automatic EPR Exemption for Bioplastics
          </div>
          <p>{data.nonExemptionNotice}</p>
        </div>
      </div>

      {/* Core Educational Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.sections.map((section) => (
          <section
            key={section.id}
            className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl p-6 space-y-3"
          >
            <h2 className="font-display text-lg font-bold text-[#17211A]">
              {section.title}
            </h2>
            <p className="text-sm text-[#4A594E] leading-relaxed">
              {section.summary}
            </p>
            <ul className="space-y-2 pt-2 border-t border-[#E5E2D9] text-xs sm:text-sm text-[#37443B]">
              {section.points.map((pt, idx) => (
                <li key={idx} className="leading-relaxed flex items-start gap-2">
                  <span className="text-[#14532D] font-mono text-xs mt-1">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Bio-based vs Biodegradable Regulatory Distinction Table */}
      <div className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[#E5E2D9] space-y-1">
          <h2 className="font-display text-lg font-bold text-[#17211A]">
            Material Classification &amp; Regulatory Distinction
          </h2>
          <p className="text-xs sm:text-sm text-[#4A594E]">
            Why &ldquo;bio-based&rdquo; and &ldquo;biodegradable/compostable&rdquo;
            trigger different waste-management pathways.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#F8F7F3] border-b border-[#E5E2D9] text-[#4A594E]">
                <th className="py-3.5 px-4 font-semibold">Polymer Category</th>
                <th className="py-3.5 px-4 font-semibold">Feedstock Origin</th>
                <th className="py-3.5 px-4 font-semibold">End-of-Life Pathway</th>
                <th className="py-3.5 px-4 font-semibold">Regulatory Implication</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2D9]">
              {data.classificationComparison.map((row, i) => (
                <tr key={i} className="align-top">
                  <td className="py-4 px-4 font-semibold text-[#17211A] min-w-[180px]">
                    {row.category}
                  </td>
                  <td className="py-4 px-4 text-[#37443B] min-w-[200px]">
                    {row.feedstock}
                  </td>
                  <td className="py-4 px-4 text-[#37443B] min-w-[220px]">
                    {row.endOfLife}
                  </td>
                  <td className="py-4 px-4 text-[#37443B] min-w-[240px]">
                    {row.regulatoryNote}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Indian Regulatory Portals */}
      <div className="space-y-4">
        <h2 className="font-display text-lg font-bold text-[#17211A]">
          Official Government &amp; Regulatory Sources (India)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.officialSources.map((src) => (
            <a
              key={src.url}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFFFFF] border border-[#E5E2D9] hover:border-[#14532D] rounded-xl p-5 space-y-2 transition-colors group block"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-mono text-[#14532D]">
                    {src.authority}
                  </div>
                  <h3 className="font-display text-base font-bold text-[#17211A] group-hover:text-[#14532D] mt-0.5">
                    {src.name}
                  </h3>
                </div>
                <ExternalLink
                  className="w-4 h-4 text-[#4A594E] group-hover:text-[#14532D] shrink-0 mt-1"
                  aria-hidden="true"
                />
              </div>
              <p className="text-xs sm:text-sm text-[#4A594E] leading-relaxed">
                {src.description}
              </p>
              <div className="text-xs font-mono text-[#5E6D62] pt-1">
                {src.url}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

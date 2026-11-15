import React from 'react';
import { ExternalLink } from 'lucide-react';
import { PageId } from '../types/bioplastics';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FFFFFF] border-t border-[#E5E2D9] mt-16">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#E5E2D9]">
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="text-[#14532D]"
              >
                <path
                  d="M12 3C7.03 3 3 7.03 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
                <path
                  d="M20.5 3.5C15 3.5 10.5 7 9.5 14.5c4.5-.5 8.5-3.5 11-11Z"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-display text-base font-bold text-[#17211A]">
                BioPlastics Explorer
              </span>
            </div>
            <p className="text-sm text-[#4A594E] leading-relaxed max-w-md">
              A web-based scientific platform for organizing characterization data,
              testing conditions, and preliminary food-packaging selection considerations
              across major biopolymer families.
            </p>
            <p className="text-xs text-[#5E6D62] leading-relaxed max-w-md pt-1">
              Academic Research Project — B.Tech Biotechnology. Built to consolidate
              scattered peer-reviewed characterization studies into a transparent
              exploratory interface.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="font-display text-sm font-semibold text-[#17211A]">
              Platform Sections
            </h3>
            <ul className="space-y-2 text-sm text-[#4A594E]">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('home')}
                  className="hover:text-[#14532D] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('explore')}
                  className="hover:text-[#14532D] transition-colors"
                >
                  Explore Bioplastics
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('compare')}
                  className="hover:text-[#14532D] transition-colors"
                >
                  Property Comparison
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('packaging')}
                  className="hover:text-[#14532D] transition-colors"
                >
                  Packaging Selector
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('suppliers')}
                  className="hover:text-[#14532D] transition-colors"
                >
                  Cost &amp; Suppliers
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="font-display text-sm font-semibold text-[#17211A]">
              Regulatory &amp; Literature Sources
            </h3>
            <ul className="space-y-2 text-sm text-[#4A594E]">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('regulations')}
                  className="hover:text-[#14532D] transition-colors"
                >
                  EPR &amp; Indian PWM Regulations Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('research')}
                  className="hover:text-[#14532D] transition-colors"
                >
                  Research Library &amp; Core Citations
                </button>
              </li>
              <li>
                <a
                  href="https://eprplastic.cpcb.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#14532D] transition-colors"
                >
                  <span>CPCB Centralized EPR Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://moef.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#14532D] transition-colors"
                >
                  <span>MoEFCC (Government of India)</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#5E6D62]">
          <p>
            Educational &amp; Preliminary Comparison Disclaimer: Property values depend on
            polymer grade, thickness, humidity, and test standard. Not intended as a
            substitute for laboratory qualification or legal compliance advice.
          </p>
          <p className="whitespace-nowrap shrink-0 font-mono">
            BioPlastics Explorer · B.Tech Biotechnology
          </p>
        </div>
      </div>
    </footer>
  );
};

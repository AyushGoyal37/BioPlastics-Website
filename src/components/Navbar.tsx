import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageId } from '../types/bioplastics';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  compareCount: number;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'explore', label: 'Explore Bioplastics' },
  { id: 'compare', label: 'Property Comparison' },
  { id: 'packaging', label: 'Packaging Selector' },
  { id: 'suppliers', label: 'Cost & Suppliers' },
  { id: 'regulations', label: 'EPR & Regulations' },
  { id: 'research', label: 'Research Library' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  compareCount,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-sm border-b border-[#E5E2D9]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Title */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14532D] rounded-md py-1"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="text-[#14532D] shrink-0"
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
            <path
              d="M9.5 14.5 14.5 9.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-display text-[17px] font-bold tracking-tight text-[#17211A]">
            BioPlastics Explorer
          </span>
        </button>

        {/* Zone 2: Desktop Single-Line Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden xl:flex items-center gap-5"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 text-[13.5px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14532D] rounded-sm ${
                  isActive
                    ? 'text-[#14532D]'
                    : 'text-[#4A594E] hover:text-[#17211A]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-[#14532D]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNav('compare')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-[13px] font-semibold text-white bg-[#14532D] hover:bg-[#166534] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#14532D]"
          >
            Compare ({compareCount})
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="xl:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#E5E2D9] text-[#17211A] hover:bg-[#F3F1EA] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14532D]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile & Tablet Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="xl:hidden border-t border-[#E5E2D9] bg-[#FFFFFF] px-4 py-3 space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`w-full text-left px-3 py-3 min-h-[44px] rounded-lg text-[15px] font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-[#14532D]/8 text-[#14532D] font-semibold'
                    : 'text-[#37443B] hover:bg-[#F3F1EA]'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'compare' && (
                  <span className="font-mono text-xs text-[#4A594E]">
                    {compareCount} selected
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2 sm:hidden">
            <button
              type="button"
              onClick={() => handleNav('compare')}
              className="w-full py-3 min-h-[44px] px-4 text-sm font-semibold text-white bg-[#14532D] hover:bg-[#166534] rounded-lg transition-colors"
            >
              Compare Selected ({compareCount})
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

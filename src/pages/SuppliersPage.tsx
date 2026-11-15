import React, { useMemo, useState } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { BioplasticMaterial, SupplierEntry } from '../types/bioplastics';

interface SuppliersPageProps {
  suppliers: SupplierEntry[];
  transparencyNotice: string;
  materials: BioplasticMaterial[];
}

export const SuppliersPage: React.FC<SuppliersPageProps> = ({
  suppliers,
  transparencyNotice,
  materials,
}) => {
  const [materialFilter, setMaterialFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((s) => {
      const matchesMat =
        materialFilter === 'all' || s.materialId === materialFilter;
      const matchesLoc =
        locationFilter === 'all' || s.regionGroup === locationFilter;
      const matchesPrice =
        priceFilter === 'all' || s.priceBand === priceFilter;
      return matchesMat && matchesLoc && matchesPrice;
    });
  }, [suppliers, materialFilter, locationFilter, priceFilter]);

  const resetFilters = () => {
    setMaterialFilter('all');
    setLocationFilter('all');
    setPriceFilter('all');
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-[#E5E2D9] pb-6 space-y-2">
        <h1 className="font-display text-3xl font-bold text-[#17211A]">
          Cost &amp; Suppliers
        </h1>
        <p className="text-[15px] text-[#4A594E] max-w-3xl leading-relaxed">
          Reference cost bands and regional supply profiles for food-packaging
          bioplastics. Unverified vendor details and live commercial quotes are
          explicitly marked rather than fabricated.
        </p>
      </div>

      {/* Transparency & Illustrative Demo Notice */}
      <div className="bg-[#FEF3C7]/45 border border-[#F59E0B]/35 rounded-xl p-4 sm:p-5 flex items-start gap-3 text-xs sm:text-sm text-[#78350F]">
        <AlertTriangle
          className="w-5 h-5 shrink-0 mt-0.5 text-[#B45309]"
          aria-hidden="true"
        />
        <div className="space-y-1 leading-relaxed">
          <div className="font-semibold text-[#92400E]">
            Data Transparency Notice — Illustrative Demo Entries
          </div>
          <p>{transparencyNotice}</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div className="space-y-1.5">
          <label
            htmlFor="supplier-material-filter"
            className="block text-xs font-semibold text-[#17211A]"
          >
            Material Type
          </label>
          <select
            id="supplier-material-filter"
            value={materialFilter}
            onChange={(e) => setMaterialFilter(e.target.value)}
            className="w-full h-10 px-3 text-xs font-medium bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg text-[#17211A] focus:outline-none focus:ring-2 focus:ring-[#14532D]"
          >
            <option value="all">All Bioplastics</option>
            {materials.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="supplier-location-filter"
            className="block text-xs font-semibold text-[#17211A]"
          >
            Supplier Location
          </label>
          <select
            id="supplier-location-filter"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full h-10 px-3 text-xs font-medium bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg text-[#17211A] focus:outline-none focus:ring-2 focus:ring-[#14532D]"
          >
            <option value="all">All Locations</option>
            <option value="India">India</option>
            <option value="International">International</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="supplier-price-filter"
            className="block text-xs font-semibold text-[#17211A]"
          >
            Indicative Price Range
          </label>
          <select
            id="supplier-price-filter"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="w-full h-10 px-3 text-xs font-medium bg-[#F8F7F3] border border-[#D7D2C5] rounded-lg text-[#17211A] focus:outline-none focus:ring-2 focus:ring-[#14532D]"
          >
            <option value="all">All Price Bands</option>
            <option value="Low (< $4/kg)">Low (&lt; $4/kg)</option>
            <option value="Moderate ($4–$8/kg)">Moderate ($4–$8/kg)</option>
            <option value="High (> $8/kg)">High (&gt; $8/kg)</option>
            <option value="Information not available">
              Information not available
            </option>
          </select>
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-3">
          <span className="text-xs font-mono text-[#5E6D62]">
            {filteredSuppliers.length} of {suppliers.length} entries
          </span>
          {(materialFilter !== 'all' ||
            locationFilter !== 'all' ||
            priceFilter !== 'all') && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-[#F3F1EA] hover:bg-[#E5E2D9] text-[#17211A] rounded-lg transition-colors whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Table */}
      {filteredSuppliers.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl p-10 text-center space-y-3">
          <p className="text-base font-semibold text-[#17211A]">
            No entries match the selected filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#14532D] rounded-lg hover:bg-[#166534] transition-colors"
          >
            Show All Entries
          </button>
        </div>
      ) : (
        <div className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#F8F7F3] border-b border-[#E5E2D9] text-[#4A594E]">
                  <th className="py-3.5 px-4 font-semibold">Material &amp; Grade</th>
                  <th className="py-3.5 px-4 font-semibold">Supplier Profile</th>
                  <th className="py-3.5 px-4 font-semibold">Location</th>
                  <th className="py-3.5 px-4 font-semibold">Indicative Price</th>
                  <th className="py-3.5 px-4 font-semibold">MOQ &amp; Link</th>
                  <th className="py-3.5 px-4 font-semibold">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2D9]">
                {filteredSuppliers.map((item) => (
                  <tr key={item.id} className="align-top hover:bg-[#FCFBF8]">
                    <td className="py-4 px-4 min-w-[200px] space-y-1">
                      <div className="font-semibold text-[#17211A]">
                        {item.materialName}
                      </div>
                      <div className="text-xs text-[#4A594E]">
                        {item.gradeOrType}
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[220px] space-y-1">
                      <div className="font-medium text-[#17211A]">
                        {item.supplierName}
                      </div>
                      <div className="text-[11px] text-[#5E6D62] leading-relaxed">
                        {item.notes}
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[150px] text-xs text-[#37443B]">
                      <div className="font-medium text-[#17211A]">
                        {item.regionGroup}
                      </div>
                      <div>{item.location}</div>
                    </td>
                    <td className="py-4 px-4 min-w-[170px] space-y-0.5">
                      <div
                        className={`font-mono tabular-nums font-semibold ${
                          item.numericPriceUSDPerKg === null
                            ? 'text-[#5E6D62] italic font-sans font-normal'
                            : 'text-[#14532D]'
                        }`}
                      >
                        {item.indicativePrice}
                      </div>
                      <div className="text-[11px] text-[#4A594E]">
                        {item.priceUnit}
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[180px] text-xs text-[#4A594E] space-y-1">
                      <div>
                        <span className="font-semibold text-[#17211A]">MOQ: </span>
                        {item.moq}
                      </div>
                      <div>
                        <span className="font-semibold text-[#17211A]">Web: </span>
                        {item.websiteUrl ? (
                          <a
                            href={item.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#14532D] hover:underline"
                          >
                            {item.websiteLabel}
                          </a>
                        ) : (
                          <span className="italic text-[#5E6D62]">
                            {item.websiteLabel}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap font-mono text-xs text-[#4A594E]">
                      <div>{item.lastUpdated}</div>
                      {item.isIllustrativeDemo && (
                        <div className="text-[11px] text-[#B45309] font-sans mt-0.5">
                          Illustrative demo
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

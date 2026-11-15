import React, { useMemo, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import {
  BioplasticMaterial,
  PropertyDefinition,
  PropertyKey,
} from '../types/bioplastics';

interface PropertyComparisonChartProps {
  selectedMaterials: BioplasticMaterial[];
  propertyDefinitions: PropertyDefinition[];
}

export const PropertyComparisonChart: React.FC<PropertyComparisonChartProps> = ({
  selectedMaterials,
  propertyDefinitions,
}) => {
  const chartableProps = useMemo(
    () => propertyDefinitions.filter((p) => p.chartable),
    [propertyDefinitions]
  );

  const [activePropKey, setActivePropKey] = useState<PropertyKey>('tensileStrength');

  const activeProp =
    chartableProps.find((p) => p.key === activePropKey) || chartableProps[0];

  const rows = selectedMaterials.map((mat) => {
    const entry = mat.properties[activeProp.key];
    return {
      id: mat.id,
      name: mat.shortName,
      entry,
      min: entry.numericRange ? entry.numericRange[0] : entry.numericValue,
      max: entry.numericRange ? entry.numericRange[1] : entry.numericValue,
      mid: entry.numericValue,
    };
  });

  const maxScale = useMemo(() => {
    if (activeProp.key === 'transparency') return 100;
    const vals = rows.flatMap((r) => [r.max ?? 0, r.mid ?? 0]);
    const peak = Math.max(...vals, 10);
    return Math.ceil((peak * 1.15) / 10) * 10;
  }, [rows, activeProp.key]);

  // Detect differing test temperatures or methods across selected materials
  const methodOrConditionMismatch = useMemo(() => {
    const signatures = new Set(
      rows
        .filter((r) => r.mid !== null)
        .map((r) => `${r.entry.temperature}|${r.entry.relativeHumidity}|${r.entry.testMethod}`)
    );
    return signatures.size > 1;
  }, [rows]);

  return (
    <div className="bg-[#FFFFFF] border border-[#E5E2D9] rounded-xl p-5 sm:p-6 space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-base sm:text-lg font-semibold text-[#17211A]">
            Visual Literature Range Explorer
          </h3>
          <p className="text-xs text-[#4A594E] mt-0.5">
            Plots published range bars (min–max) alongside test conditions. Hover or
            inspect condition notes below each bar.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Select property to chart"
          className="flex flex-wrap items-center gap-1 p-1 bg-[#F3F1EA] rounded-lg"
        >
          {chartableProps.map((prop) => {
            const active = prop.key === activeProp.key;
            return (
              <button
                key={prop.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActivePropKey(prop.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#FFFFFF] text-[#14532D] font-semibold shadow-xs'
                    : 'text-[#4A594E] hover:text-[#17211A]'
                }`}
              >
                {prop.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scientific Comparability Warning */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#FEF3C7]/45 border border-[#F59E0B]/30 text-xs text-[#78350F]">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#B45309]" />
        <div className="leading-relaxed">
          <span className="font-semibold">Method &amp; Condition Caution: </span>
          {activeProp.comparabilityNote}
          {methodOrConditionMismatch && (
            <span className="block mt-1 font-medium text-[#92400E]">
              Notice: Your currently selected materials report measurements from
              different test temperatures, relative humidities, or film thicknesses
              (e.g., 25 °C vs. 38 °C). Treat ranges as indicative context rather than
              directly normalized equivalents.
            </span>
          )}
        </div>
      </div>

      {/* Horizontal Range Bar Visualization */}
      <div className="space-y-4 pt-1">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#5E6D62] border-b border-[#E5E2D9] pb-2">
          <span>Material &amp; Test Conditions</span>
          <span>
            Scale: 0 to {maxScale.toLocaleString()} {activeProp.unit}
          </span>
        </div>

        <div className="space-y-4">
          {rows.map((row) => {
            const hasNumeric = row.min !== null && row.max !== null && row.mid !== null;
            const leftPct = hasNumeric ? ((row.min as number) / maxScale) * 100 : 0;
            const widthPct = hasNumeric
              ? Math.max((((row.max as number) - (row.min as number)) / maxScale) * 100, 1.5)
              : 0;
            const midPct = hasNumeric ? ((row.mid as number) / maxScale) * 100 : 0;

            return (
              <div key={row.id} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <span className="text-sm font-semibold text-[#17211A]">
                    {row.name}
                  </span>
                  <span className="font-mono tabular-nums text-xs text-[#14532D] font-medium">
                    {row.entry.value}{' '}
                    <span className="text-[#5E6D62]">{row.entry.unit}</span>
                  </span>
                </div>

                {/* SVG/CSS Range Track */}
                <div className="relative h-6 bg-[#F8F7F3] border border-[#E5E2D9] rounded-md overflow-hidden">
                  {/* Grid quarter lines */}
                  <div className="absolute inset-y-0 left-1/4 w-px bg-[#E5E2D9]" />
                  <div className="absolute inset-y-0 left-1/2 w-px bg-[#E5E2D9]" />
                  <div className="absolute inset-y-0 left-3/4 w-px bg-[#E5E2D9]" />

                  {hasNumeric ? (
                    <>
                      <div
                        className="absolute top-1.5 bottom-1.5 bg-[#14532D]/25 border border-[#14532D] rounded-xs transition-all duration-200"
                        style={{
                          left: `${Math.min(leftPct, 98)}%`,
                          width: `${Math.min(widthPct, 100 - leftPct)}%`,
                        }}
                        title={`${row.name}: ${row.entry.value} ${row.entry.unit}`}
                      />
                      <div
                        className="absolute top-1 bottom-1 w-1 bg-[#14532D] rounded-xs"
                        style={{ left: `calc(${Math.min(midPct, 99)}% - 2px)` }}
                        title={`Representative midpoint: ${row.mid} ${row.entry.unit}`}
                      />
                    </>
                  ) : (
                    <div className="h-full flex items-center px-3 text-[11px] text-[#5E6D62] italic">
                      Data not available for plotting
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] font-mono text-[#5E6D62]">
                  <span>{row.entry.testMethod}</span>
                  <span aria-hidden="true">·</span>
                  <span>{row.entry.sampleThickness}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {row.entry.temperature} / {row.entry.relativeHumidity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export type PageId =
  | 'home'
  | 'explore'
  | 'compare'
  | 'packaging'
  | 'suppliers'
  | 'regulations'
  | 'research';

export type PropertyKey =
  | 'tensileStrength'
  | 'wvtr'
  | 'contactAngle'
  | 'biodegradability'
  | 'transparency'
  | 'leachingMigration'
  | 'humidityResponse'
  | 'loadBearingCapacity';

export type SourceType =
  | 'Literature-reported'
  | 'Manufacturer-reported'
  | 'Not available';

export interface PropertyEntry {
  value: string;
  numericValue: number | null;
  numericRange?: [number, number] | null;
  unit: string;
  testMethod: string;
  sampleThickness: string;
  temperature: string;
  relativeHumidity: string;
  formulation: string;
  reference: string;
  sourceType: SourceType;
  notes: string;
}

export interface PropertyDefinition {
  key: PropertyKey;
  label: string;
  shortLabel: string;
  unit: string;
  description: string;
  chartable: boolean;
  comparabilityNote: string;
}

export interface BioplasticMaterial {
  id: string;
  name: string;
  shortName: string;
  family: string;
  classification: 'Bio-based & Biodegradable' | 'Bio-based (Biodegradability varies by modification)';
  biobasedOrigin: string;
  biodegradationEnvironment: string;
  imagePath: string;
  imageCropClass?: string;
  shortIntro: string;
  introduction: string;
  chemicalStructure: {
    repeatingUnit: string;
    formulaNote: string;
    diagramType: 'pla' | 'pha' | 'starch' | 'cellulose' | 'chitosan' | 'alginate';
  };
  sourceAndProduction: string;
  characteristics: string[];
  applications: string[];
  advantages: string[];
  limitations: string[];
  references: string[];
  properties: Record<PropertyKey, PropertyEntry>;
}

export interface PackagingCategory {
  id: string;
  name: string;
  summary: string;
  keyRequirements: {
    title: string;
    detail: string;
  }[];
  relevantProperties: {
    propertyKey: PropertyKey;
    propertyName: string;
    whyItMatters: string;
  }[];
  candidateMaterials: {
    materialId: string;
    materialName: string;
    roleContext: string;
    consideration: string;
  }[];
  validationNote: string;
}

export interface SupplierEntry {
  id: string;
  materialId: string;
  materialName: string;
  gradeOrType: string;
  supplierName: string;
  location: string;
  regionGroup: 'India' | 'International';
  indicativePrice: string;
  numericPriceUSDPerKg: number | null;
  priceBand: 'Low (< $4/kg)' | 'Moderate ($4–$8/kg)' | 'High (> $8/kg)' | 'Information not available';
  priceUnit: string;
  moq: string;
  websiteUrl: string | null;
  websiteLabel: string;
  isIllustrativeDemo: boolean;
  lastUpdated: string;
  notes: string;
}

export interface RegulationSection {
  id: string;
  title: string;
  summary: string;
  points: string[];
}

export interface OfficialResource {
  name: string;
  authority: string;
  url: string;
  description: string;
}

export interface RegulationsData {
  educationalDisclaimer: string;
  lastVerifiedDate: string;
  jurisdiction: string;
  nonExemptionNotice: string;
  sections: RegulationSection[];
  officialSources: OfficialResource[];
  classificationComparison: {
    category: string;
    feedstock: string;
    endOfLife: string;
    regulatoryNote: string;
  }[];
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  year: number;
  journal: string;
  volumeIssuePages?: string;
  doiOrLink: string | null;
  relevanceSummary: string;
  relatedMaterials: string[];
  relatedProperties: string[];
  researchTopics: string[];
  isCorePresentationRef: boolean;
}

import { useEffect, useState } from 'react';
import materialsDataset from './data/materials.json';
import packagingDataset from './data/packagingCategories.json';
import suppliersDataset from './data/suppliers.json';
import regulationsDataset from './data/regulations.json';
import researchDataset from './data/researchLibrary.json';
import {
  BioplasticMaterial,
  PackagingCategory,
  PageId,
  PropertyDefinition,
  RegulationsData,
  ResearchPaper,
  SupplierEntry,
} from './types/bioplastics';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MaterialDetailModal } from './components/MaterialDetailModal';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { ComparePage } from './pages/ComparePage';
import { PackagingSelectorPage } from './pages/PackagingSelectorPage';
import { SuppliersPage } from './pages/SuppliersPage';
import { RegulationsPage } from './pages/RegulationsPage';
import { ResearchLibraryPage } from './pages/ResearchLibraryPage';
import { MATERIAL_IMAGE_BY_ID } from './assets/materialImages';

const LOCAL_PAPERS_STORAGE_KEY = 'bioplastics_explorer_custom_papers_v1';

export default function App() {
  const materials = (materialsDataset.materials as BioplasticMaterial[]).map(
    (mat) => ({
      ...mat,
      imagePath: MATERIAL_IMAGE_BY_ID[mat.id] || mat.imagePath,
    })
  );
  const propertyDefinitions =
    materialsDataset.propertyDefinitions as PropertyDefinition[];
  const packagingCategories =
    packagingDataset.categories as PackagingCategory[];
  const suppliers = suppliersDataset.suppliers as SupplierEntry[];
  const regulationsData = regulationsDataset as RegulationsData;
  const basePapers = researchDataset.papers as ResearchPaper[];

  const [activePage, setActivePage] = useState<PageId>('home');
  const [exploreInitialSearch, setExploreInitialSearch] = useState('');
  const [selectedMaterialModal, setSelectedMaterialModal] =
    useState<BioplasticMaterial | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>(['pla', 'pha']);
  const [customPapers, setCustomPapers] = useState<ResearchPaper[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_PAPERS_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as ResearchPaper[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_PAPERS_STORAGE_KEY,
        JSON.stringify(customPapers)
      );
    } catch {
      // Ignore storage quota issues gracefully
    }
  }, [customPapers]);

  const allPapers = [...basePapers, ...customPapers];

  const handleToggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSearchToExplore = (query: string) => {
    setExploreInitialSearch(query);
    setActivePage('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: PageId) => {
    if (page !== 'explore') {
      setExploreInitialSearch('');
    }
    setActivePage(page);
  };

  const handleAddPaper = (paper: ResearchPaper) => {
    setCustomPapers((prev) => [paper, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3] text-[#17211A]">
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        compareCount={compareIds.length}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            materials={materials}
            propertyCount={propertyDefinitions.length}
            packagingCategoryCount={packagingCategories.length}
            paperCount={allPapers.length}
            onNavigate={handleNavigate}
            onSearchToExplore={handleSearchToExplore}
            onSelectMaterial={(mat) => setSelectedMaterialModal(mat)}
          />
        )}

        {activePage === 'explore' && (
          <ExplorePage
            key={exploreInitialSearch}
            materials={materials}
            initialSearch={exploreInitialSearch}
            selectedCompareIds={compareIds}
            onToggleCompare={handleToggleCompare}
            onSelectMaterial={(mat) => setSelectedMaterialModal(mat)}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'compare' && (
          <ComparePage
            materials={materials}
            propertyDefinitions={propertyDefinitions}
            selectedIds={compareIds}
            onToggleMaterial={handleToggleCompare}
            onSetSelectedIds={setCompareIds}
            onSelectMaterialDetail={(mat) => setSelectedMaterialModal(mat)}
          />
        )}

        {activePage === 'packaging' && (
          <PackagingSelectorPage
            categories={packagingCategories}
            disclaimer={packagingDataset.disclaimer}
            materials={materials}
            onSelectMaterial={(mat) => setSelectedMaterialModal(mat)}
            onCompareCandidateSet={(ids) => setCompareIds(ids)}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'suppliers' && (
          <SuppliersPage
            suppliers={suppliers}
            transparencyNotice={suppliersDataset.transparencyNotice}
            materials={materials}
          />
        )}

        {activePage === 'regulations' && (
          <RegulationsPage data={regulationsData} />
        )}

        {activePage === 'research' && (
          <ResearchLibraryPage
            papers={allPapers}
            materials={materials}
            onAddPaper={handleAddPaper}
            onSelectMaterial={(mat) => setSelectedMaterialModal(mat)}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      <MaterialDetailModal
        material={selectedMaterialModal}
        propertyDefinitions={propertyDefinitions}
        isSelectedForCompare={
          selectedMaterialModal
            ? compareIds.includes(selectedMaterialModal.id)
            : false
        }
        onToggleCompare={handleToggleCompare}
        onOpenComparePage={() => handleNavigate('compare')}
        onClose={() => setSelectedMaterialModal(null)}
      />
    </div>
  );
}

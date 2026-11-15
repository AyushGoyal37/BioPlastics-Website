import heroBioplasticsLab from './images/hero_bioplastics_lab_1794766180434.jpg';
import matPlaPha from './images/mat_pla_pha_1794766180954.jpg';
import matStarchCellulose from './images/mat_starch_cellulose_1794766181010.jpg';
import matChitosanAlginate from './images/mat_chitosan_alginate_1794766182717.jpg';
import packagingSustainableFood from './images/packaging_sustainable_food_1794766182306.jpg';

export const PLATFORM_IMAGES = {
  heroBioplasticsLab,
  packagingSustainableFood,
};

export const MATERIAL_IMAGE_BY_ID: Record<string, string> = {
  pla: matPlaPha,
  pha: matPlaPha,
  starch: matStarchCellulose,
  cellulose: matStarchCellulose,
  chitosan: matChitosanAlginate,
  alginate: matChitosanAlginate,
};

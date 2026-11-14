// Pre-wedding photos (files live in /public/couple). `pos` is the CSS object-position
const publicBase = import.meta.env.BASE_URL;
// that keeps both faces inside the arched crop.
const mk = (n, shoot, alt, pos) => ({
  id: n,
  shoot,
  alt,
  pos,
  thumb: `${publicBase}couple/${String(n).padStart(2, '0')}-thumb.jpg`,
  full: `${publicBase}couple/${String(n).padStart(2, '0')}-full.jpg`,
});

export const SHOOTS = [
  { key: 'all', label: 'All moments' },
  { key: 'heritage', label: 'Heritage & horse' },
  { key: 'studio', label: 'Warm studio' },
  { key: 'tennis', label: 'Game, set, match' },
  { key: 'colours', label: 'Colours of us' },
];

export const couplePhotos = [
  mk(14, 'heritage', 'Taniya and Abhiraj resting together on old stone steps before sandstone arches', 'center 62%'),
  mk(13, 'heritage', 'Abhiraj kissing Taniya’s forehead as they sit on a stone wall by the river', 'center 45%'),
  mk(17, 'heritage', 'Taniya and Abhiraj walking hand in hand with a white horse', 'center 66%'),
  mk(16, 'heritage', 'Abhiraj and Taniya standing with eyes closed beside a white horse', '58% 45%'),
  mk(15, 'heritage', 'Taniya and Abhiraj smiling at each other against a brick wall, a white horse in the foreground', 'center 80%'),
  mk(12, 'studio', 'Taniya and Abhiraj posing together on a wooden sofa', 'center 62%'),
  mk(10, 'studio', 'Abhiraj and Taniya looking at each other on the sofa', 'center 48%'),
  mk(8, 'studio', 'Taniya kissing Abhiraj on the cheek as he laughs at the camera', 'center 66%'),
  mk(6, 'studio', 'Taniya and Abhiraj sitting back to back, both laughing', '48% 30%'),
  mk(11, 'tennis', 'Taniya and Abhiraj laughing and tossing tennis balls at the net', '50% 45%'),
  mk(9, 'tennis', 'Taniya hugging Abhiraj from behind at the tennis net', 'center 40%'),
  mk(5, 'tennis', 'Abhiraj holding Taniya as they look at each other at the tennis net', 'center 52%'),
  mk(7, 'tennis', 'Abhiraj leaning on the tennis net while Taniya sits in front of him with a ball', 'center 55%'),
  mk(2, 'colours', 'Abhiraj and Taniya hugging with paint on their faces', '55% 40%'),
  mk(3, 'colours', 'Taniya laughing as Abhiraj paints her cheek purple', '62% 45%'),
  mk(1, 'colours', 'Taniya and Abhiraj sitting on the floor in front of a painted wall, paintbrushes in hand', 'center 78%'),
  mk(4, 'colours', 'Taniya and Abhiraj laughing, covered in paint', 'center 58%'),
];

export const byId = (id) => couplePhotos.find((p) => p.id === id);

// Curated picks (not every photo is shown on the site)
export const GALLERY_IDS = [16, 12, 8, 11, 10, 2, 9, 15, 3];
export const CLOSING_IDS = [6, 5, 4];

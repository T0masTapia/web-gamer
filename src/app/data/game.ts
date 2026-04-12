export interface Game {
  id: number;
  title: string;
  platform: string;
  genre: string;
  img: string;
  video: string;
  description: string;
  price: number;
  slug?: string; // El "?" significa que es opcional
  requirements?: any; // También opcional porque viene de la API
}


export const GAMES: Game[] = [
  {
    id: 1,
    title: 'The Legend of Zelda: Tears of the Kingdom',
    slug: 'the-legend-of-zelda-tears-of-the-kingdom', // Correcto en RAWG
    platform: 'Nintendo Switch',
    genre: 'Adventure',
    img: '2x1_NSwitch_TloZTearsOfTheKingdom_Gamepage_image1600w.jpg',
    video: 'https://www.youtube.com/embed/uHGShqcAHlQ',
    description: 'La secuela directa de Breath of the Wild.',
    price: 39000,
  },
  {
    id: 2,
    title: 'Marvels Spider-Man 2',
    slug: 'marvels-spider-man-2', // <--- ¡Ojo! Sin este slug exacto, te seguirá dando 404
    platform: 'PS5',
    genre: 'Action',
    img: 'marvels-spiderman-2-20236910113885_1.jpg',
    video: 'https://www.youtube.com/embed/rCIV0y8jNy4',
    description: 'Peter Parker y Miles Morales juntos.',
    price: 46990,
  },
  {
    id: 3,
    title: 'Halo Infinite',
    slug: 'halo-infinite', // Correcto en RAWG
    platform: 'Xbox Series',
    genre: 'Shooter',
    img: 'HaloInfinite_CampaignKeyArt_CLEAN_1920x1080.jpg',
    video: 'https://www.youtube.com/embed/PyMlV5_HRWk',
    description: 'Jefe Maestro regresa en esta nueva entrega.',
    price: 59000,
  }
];

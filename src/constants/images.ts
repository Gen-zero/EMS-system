import kaliImage from '../assets/kali.webp';
import manuImage from '../assets/manu.jpeg';

// Define mock users with correct image paths
export const MOCK_USERS = {
  user2: {
    name: ' ॐ Kalidasaya Nama',
    avatar: kaliImage,
  },
  user1: {
    name: ' ॐ Manu Narayanaya',
    avatar: manuImage,
  },
  admin1: {
    name: 'Admin',
    avatar: kaliImage,
  },
} as const;

export const PROFILE_IMAGES = {
  USER1: kaliImage,
  USER2: manuImage,
  DEFAULT: kaliImage,
} as const;

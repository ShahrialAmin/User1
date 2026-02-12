import { Category } from './types';

// Reliable Unsplash Image IDs
const images = {
    bonus: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&q=80&w=600',
    ff1: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600',
    ff2: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=600',
    ff3: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=600',
    ff4: 'https://images.unsplash.com/photo-1612287230217-15ad0aa4b644?auto=format&fit=crop&q=80&w=600',
    pubg: 'https://images.unsplash.com/photo-1592478411213-61535fdd861d?auto=format&fit=crop&q=80&w=600',
    soccer: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=600',
    social: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600',
    apps: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600',
    chatgpt: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600'
};

export const categories: Category[] = [
  {
    id: 'bonus',
    title: 'BONUS EVENT',
    products: [
      {
        id: '100-bonus',
        title: '100% Bonus Event',
        category: 'bonus',
        image: images.bonus,
        publisher: 'Riyal',
        rating: 5.0,
        priceStart: '৳100',
        badge: '100% Bonus',
        isHot: true
      }
    ]
  },
  {
    id: 'freefire',
    title: 'FREE FIRE TOPUP',
    products: [
      {
        id: 'ff-idcode',
        title: 'IDCODE Topup [BD SERVER]',
        category: 'freefire',
        image: images.ff1,
        publisher: 'Garena',
        rating: 4.9,
        priceStart: '৳25',
        badge: 'Ai ডেলিভারি'
      },
      {
        id: 'ff-like',
        title: 'Free Fire Like',
        category: 'freefire',
        image: images.ff2,
        publisher: 'Garena',
        rating: 4.8,
        priceStart: '৳10',
        badge: 'Ai ডেলিভারি'
      },
      {
        id: 'ff-evo',
        title: 'E-Badge/Evo Access (Bd)',
        category: 'freefire',
        image: images.ff3,
        publisher: 'Garena',
        rating: 4.7,
        priceStart: '৳50',
        badge: 'Ai ডেলিভারি'
      },
      {
        id: 'ff-indo',
        title: 'Indonesia Server [UID]',
        category: 'freefire',
        image: images.ff4,
        publisher: 'Garena',
        rating: 4.8,
        priceStart: '৳80',
        badge: 'Ai ডেলিভারি'
      },
      {
        id: 'ff-ingame',
        title: 'Free Fire Ingame [Login]',
        category: 'freefire',
        image: images.ff1,
        publisher: 'Garena',
        rating: 4.9,
        priceStart: '৳100',
        badge: 'USER ডেলিভারি'
      },
      {
        id: 'ff-levelup',
        title: 'Level Up Pass (BD Server)',
        category: 'freefire',
        image: images.ff2,
        publisher: 'Garena',
        rating: 5.0,
        priceStart: '৳190',
        badge: 'Ai ডেলিভারি'
      },
      {
        id: 'ff-weekly-lite',
        title: 'Weekly Lite (Bd Server)',
        category: 'freefire',
        image: images.ff3,
        publisher: 'Garena',
        rating: 4.6,
        priceStart: '৳35',
        badge: 'Ai ডেলিভারি'
      },
      {
        id: 'ff-weekly-bd',
        title: 'Weekly [BD SERVER]',
        category: 'freefire',
        image: images.ff4,
        publisher: 'Garena',
        rating: 4.9,
        priceStart: '৳150',
        badge: 'Ai ডেলিভারি'
      },
      {
        id: 'ff-monthly-bd',
        title: 'Monthly [BD SERVER]',
        category: 'freefire',
        image: images.ff1,
        publisher: 'Garena',
        rating: 5.0,
        priceStart: '৳750',
        badge: 'Ai ডেলিভারি'
      },
      {
        id: 'ff-week-month',
        title: 'Weekly + Monthly [ Offer]',
        category: 'freefire',
        image: images.ff2,
        publisher: 'Garena',
        rating: 4.9,
        priceStart: '৳900',
        badge: 'Ai ডেলিভারি'
      }
    ]
  },
  {
    id: 'others',
    title: 'OTHERS GAMES',
    products: [
      {
        id: 'efootball-android',
        title: 'EFootball Coin ( Android )',
        category: 'others',
        image: images.soccer,
        publisher: 'Konami',
        rating: 4.8,
        priceStart: '৳130',
        badge: 'ANDROID'
      },
      {
        id: 'efootball-bonus',
        title: 'EFootball ( Android ) Bonus',
        category: 'others',
        image: images.soccer,
        publisher: 'Konami',
        rating: 4.7,
        priceStart: '৳120',
        badge: 'ANDROID'
      },
      {
        id: 'efootball-iphone',
        title: 'EFootball Coin ( I-Phone )',
        category: 'others',
        image: images.soccer,
        publisher: 'Konami',
        rating: 4.9,
        priceStart: '৳130',
        badge: 'i-PHONE'
      },
      {
        id: 'pubg',
        title: 'PUBG MOBILE',
        category: 'others',
        image: images.pubg,
        publisher: 'Tencent',
        rating: 4.9,
        priceStart: '৳115'
      },
      {
        id: 'farlight',
        title: 'FARLIGHT 84',
        category: 'others',
        image: images.ff3,
        publisher: 'Farlight',
        rating: 4.6,
        priceStart: '৳50'
      },
      {
        id: 'likee',
        title: 'Likee',
        category: 'others',
        image: images.social,
        publisher: 'Bigo',
        rating: 4.5,
        priceStart: '৳80'
      },
      {
        id: 'codm',
        title: 'Call Of Duty Mobile',
        category: 'others',
        image: images.ff2,
        publisher: 'Activision',
        rating: 4.8,
        priceStart: '৳90'
      }
    ]
  },
  {
    id: 'social',
    title: 'LIKE-FOLLLOW-SUBSCRIBER',
    products: [
      {
        id: 'tiktok-follow',
        title: 'Tiktok Followers',
        category: 'social',
        image: images.social,
        publisher: 'TikTok',
        rating: 4.7,
        priceStart: '৳50',
        badge: 'AD'
      },
      {
        id: 'tiktok-views',
        title: 'TikTok Video Views',
        category: 'social',
        image: images.apps,
        publisher: 'TikTok',
        rating: 4.8,
        priceStart: '৳10',
        badge: 'AD'
      },
      {
        id: 'fb-follow',
        title: 'Facebook Followers',
        category: 'social',
        image: images.social,
        publisher: 'Meta',
        rating: 4.6,
        priceStart: '৳60',
        badge: 'AD'
      },
      {
        id: 'fb-react',
        title: 'Facebook React Post/Photos',
        category: 'social',
        image: images.apps,
        publisher: 'Meta',
        rating: 4.7,
        priceStart: '৳20',
        badge: 'AD'
      },
      {
        id: 'yt-sub',
        title: 'YouTube Subscribers',
        category: 'social',
        image: images.social,
        publisher: 'Google',
        rating: 4.9,
        priceStart: '৳500',
        badge: 'AD'
      }
    ]
  },
  {
    id: 'apps',
    title: 'APP SUBSCRIPTION',
    products: [
      {
        id: 'yt-premium',
        title: 'YouTube Premium',
        category: 'apps',
        image: images.apps,
        publisher: 'Google',
        rating: 4.9,
        priceStart: '৳250',
        badge: 'AD'
      },
      {
        id: 'netflix',
        title: 'Netflix Premium',
        category: 'apps',
        image: images.apps,
        publisher: 'Netflix',
        rating: 5.0,
        priceStart: '৳400',
        badge: 'AD'
      },
      {
        id: 'canva',
        title: 'Canva Pro',
        category: 'apps',
        image: images.apps,
        publisher: 'Canva',
        rating: 4.9,
        priceStart: '৳99',
        badge: 'AD'
      },
      {
        id: 'capcut',
        title: 'Capcut Premium',
        category: 'apps',
        image: images.apps,
        publisher: 'Bytedance',
        rating: 4.8,
        priceStart: '৳150',
        badge: 'AD'
      },
      {
        id: 'telegram',
        title: 'Telegram Premium',
        category: 'apps',
        image: images.apps,
        publisher: 'Telegram',
        rating: 4.9,
        priceStart: '৳350',
        badge: 'AD'
      },
      {
        id: 'chatgpt',
        title: 'ChatGPT Plus',
        category: 'apps',
        image: images.chatgpt,
        publisher: 'OpenAI',
        rating: 5.0,
        priceStart: '৳1200',
        badge: 'AD'
      }
    ]
  }
];
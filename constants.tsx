import React from 'react';
import { CardData } from './types';

export const THEME = {
  bg: '#F5F5F5',
  text: '#3A3A3A',
  gilt: '#D4B96A',
  accents: {
    chess: '#8A2B27',
    basketball: '#E69A49',
    dragon: '#9D3834',
    starve: '#7A9362',
    running: '#4A8FBF',
    career: '#3F4E68',
  }
};

export const CARDS: CardData[] = [
  {
    id: 'chess',
    title: '象棋',
    iconType: 'chess',
    accentColor: THEME.accents.chess,
    copy: '愿你步步为营，亦有闲庭信步'
  },
  {
    id: 'basketball',
    title: '篮球',
    iconType: 'basketball',
    accentColor: THEME.accents.basketball,
    copy: '愿你起跳有力量，落地有欢喜，愿你未来每个决定都能正中篮心'
  },
  {
    id: 'dragon',
    title: '龙族',
    iconType: 'dragon',
    accentColor: THEME.accents.dragon,
    copy: '愿你手握屠龙之勇，心藏温柔之乡，something for nothing。前路或许仍有孤独的“尼伯龙根”，但别忘啦你不会是一个人在战斗！'
  },
  {
    id: 'starve',
    title: '饥荒',
    iconType: 'starve',
    accentColor: THEME.accents.starve,
    copy: '愿你遍历生存之路，带着“步行手杖”和“切斯特”，步履轻快，满载而归，永不服输，步步皆安'
  },
  {
    id: 'running',
    title: '跑步',
    iconType: 'running',
    accentColor: THEME.accents.running,
    copy: '愿你奔赴全马之约，沿途遇见更多山海，跑出晨光，奔入人生的盛夏'
  },
  {
    id: 'career',
    title: '事业',
    iconType: 'career',
    accentColor: THEME.accents.career,
    copy: '愿你履新进阶，统筹有度，以专业赴新程、赴成长，祝你前路坦荡'
  }
];

export const GiltIcon: React.FC<{ 
  type: string; 
  accentColor: string; 
  size?: number;
  className?: string;
}> = ({ type, accentColor, size = 64, className = "" }) => {
  const strokeWidth = 2;
  const opacity = "99"; // ~60%
  
  const renderPath = () => {
    switch (type) {
      case 'chess':
        return (
          <g>
            <circle cx="50" cy="50" r="42" stroke={THEME.gilt} strokeWidth={strokeWidth} fill="none" />
            <path d="M35 35 L65 35 M50 35 L50 65 M35 65 L65 65 M40 50 L60 50" stroke={accentColor + opacity} strokeWidth={strokeWidth} fill="none" />
          </g>
        );
      case 'basketball':
        return (
          <g>
            <circle cx="50" cy="50" r="40" stroke={THEME.gilt} strokeWidth={strokeWidth} fill="none" />
            <path d="M30 20 Q50 50 30 80 M70 20 Q50 50 70 80 M15 50 L85 50 M50 15 L50 85" stroke={accentColor + opacity} strokeWidth={strokeWidth} fill="none" />
          </g>
        );
      case 'dragon':
        return (
          <g>
            {/* Serpentine Dragon Shape */}
            <path d="M30 35 C30 15 70 15 70 35 C70 55 30 55 30 75 C30 95 70 95 70 85" stroke={THEME.gilt} strokeWidth={strokeWidth} fill="none" />
            {/* Head Detail */}
            <path d="M30 35 L20 30 L25 45 Z" stroke={THEME.gilt} strokeWidth={strokeWidth} fill="none" />
            {/* Horns */}
            <path d="M30 25 L25 15 M35 25 L40 15" stroke={accentColor + opacity} strokeWidth={strokeWidth} fill="none" />
            <circle cx="28" cy="35" r="1" fill={accentColor} />
          </g>
        );
      case 'starve':
        return (
          <g>
            <rect x="30" y="35" width="40" height="35" rx="4" stroke={THEME.gilt} strokeWidth={strokeWidth} fill="none" />
            <path d="M40 35 V28 Q50 22 60 28 V35" stroke={THEME.gilt} strokeWidth={strokeWidth} fill="none" />
            <path d="M42 52 H58 M50 45 V60" stroke={accentColor + opacity} strokeWidth={strokeWidth} fill="none" />
          </g>
        );
      case 'running':
        return (
          <g>
            <path d="M25 70 Q30 40 50 40 L85 55 L88 70 Z" stroke={THEME.gilt} strokeWidth={strokeWidth} fill="none" />
            <path d="M15 78 L85 78 M20 84 L80 84" stroke={accentColor + opacity} strokeWidth={strokeWidth} fill="none" />
          </g>
        );
      case 'career':
        return (
          <g>
            <rect x="20" y="30" width="60" height="45" rx="3" stroke={THEME.gilt} strokeWidth={strokeWidth} fill="none" />
            <path d="M35 30 V75 M55 30 V75 M20 45 H80" stroke={accentColor + opacity} strokeWidth={strokeWidth} fill="none" />
            <path d="M65 55 L75 55 M65 65 L72 65" stroke={accentColor + opacity} strokeWidth={strokeWidth} fill="none" />
          </g>
        );
      case 'cake':
        return (
          <g>
            <rect x="25" y="55" width="50" height="25" rx="2" stroke={THEME.gilt} strokeWidth={strokeWidth} fill="none" />
            <rect x="30" y="35" width="40" height="20" rx="2" stroke={THEME.gilt} strokeWidth={strokeWidth} fill="none" />
            <path d="M50 35 V25" stroke={THEME.gilt} strokeWidth={strokeWidth} fill="none" />
            <circle cx="50" cy="22" r="2" fill={THEME.gilt} />
            <path d="M25 65 H75 M30 45 H70" stroke={THEME.gilt} strokeWidth="1" opacity="0.4" />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
      {renderPath()}
    </svg>
  );
};

const CharacterBase: React.FC<{ children: React.ReactNode; size?: number; className?: string }> = ({ children, size = 40, className = "" }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
    {children}
  </svg>
);

export const QCharRD: React.FC<{ size?: number; className?: string }> = (props) => (
  <CharacterBase {...props}>
    <circle cx="50" cy="38" r="18" stroke={THEME.gilt} strokeWidth="2" fill="none" />
    <path d="M35 32 Q50 10 65 32" stroke={THEME.gilt} strokeWidth="2" fill="none" />
    <rect x="32" y="65" width="36" height="20" rx="1" stroke={THEME.gilt} strokeWidth="2" fill="none" />
    <path d="M32 75 H68" stroke={THEME.gilt} strokeWidth="1" />
    <path d="M25 60 Q15 70 30 70 M75 60 Q85 70 70 70" stroke={THEME.gilt} strokeWidth="2" fill="none" />
  </CharacterBase>
);

export const QCharBall: React.FC<{ size?: number; className?: string }> = (props) => (
  <CharacterBase {...props}>
    <circle cx="50" cy="40" r="20" stroke={THEME.gilt} strokeWidth="2" fill="none" />
    <path d="M35 30 L65 30 L50 12 Z" stroke={THEME.gilt} strokeWidth="2" fill="none" />
    <circle cx="80" cy="70" r="12" stroke={THEME.gilt} strokeWidth="2" fill="none" />
    <path d="M72 70 H88 M80 62 V78" stroke={THEME.gilt} strokeWidth="1" />
  </CharacterBase>
);

export const QCharChess: React.FC<{ size?: number; className?: string }> = (props) => (
  <CharacterBase {...props}>
    <circle cx="50" cy="40" r="20" stroke={THEME.gilt} strokeWidth="2" fill="none" />
    <path d="M32 30 H68 L50 12 Z" stroke={THEME.gilt} strokeWidth="2" fill="none" />
    <path d="M40 70 H60 L50 90 Z" stroke={THEME.gilt} strokeWidth="2" fill="none" />
    <circle cx="50" cy="65" r="5" stroke={THEME.gilt} strokeWidth="2" fill="none" />
  </CharacterBase>
);

export const QCharStarve: React.FC<{ size?: number; className?: string }> = (props) => (
  <CharacterBase {...props}>
    <circle cx="50" cy="40" r="20" stroke={THEME.gilt} strokeWidth="2" fill="none" />
    <path d="M42 12 L58 12 L50 2 Z" stroke={THEME.gilt} strokeWidth="2" fill="none" />
    <path d="M80 30 L30 90" stroke={THEME.gilt} strokeWidth="2" fill="none" />
    <path d="M75 25 Q90 30 80 50" stroke={THEME.gilt} strokeWidth="2" fill="none" />
    <circle cx="35" cy="75" r="3" fill={THEME.gilt} />
  </CharacterBase>
);

export const QCharDragon: React.FC<{ size?: number; className?: string }> = (props) => (
  <CharacterBase {...props}>
    <circle cx="50" cy="40" r="20" stroke={THEME.gilt} strokeWidth="2" fill="none" />
    {/* Dragon Head Profile */}
    <path d="M30 35 L20 30 L25 45 Z" stroke={THEME.gilt} strokeWidth="2" fill="none" />
    <path d="M30 25 L25 15 M35 25 L40 15" stroke={THEME.gilt} strokeWidth="2" fill="none" />
    <path d="M30 65 Q50 85 70 65" stroke={THEME.gilt} strokeWidth="2" fill="none" />
  </CharacterBase>
);

export const QCharRun: React.FC<{ size?: number; className?: string }> = (props) => (
  <CharacterBase {...props}>
    <circle cx="50" cy="40" r="20" stroke={THEME.gilt} strokeWidth="2" fill="none" />
    <path d="M40 22 L60 22 L50 8 Z" stroke={THEME.gilt} strokeWidth="2" fill="none" />
    <rect x="30" y="65" width="40" height="20" rx="2" stroke={THEME.gilt} strokeWidth="2" fill="none" />
    <path d="M35 75 H65" stroke={THEME.gilt} strokeWidth="1" opacity="0.5" />
  </CharacterBase>
);
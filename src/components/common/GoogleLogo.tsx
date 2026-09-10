import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Official Google Multi-Color "G" Emblem
 * Using Google's exact color specifications:
 * Blue: #4285F4, Red: #EA4335, Yellow: #FBBC05, Green: #34A853
 */
export const GoogleGIcon: React.FC<LogoProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Google logo"
  >
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

/**
 * Official Google Wordmark SVG in 4 iconic colors
 */
export const GoogleWordmarkSVG: React.FC<{ className?: string; height?: number }> = ({
  className = 'h-6',
  height = 24,
}) => (
  <svg
    viewBox="0 0 272 92"
    height={height}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Google"
  >
    {/* G - Blue */}
    <path
      fill="#4285F4"
      d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
    />
    {/* o - Red */}
    <path
      fill="#EA4335"
      d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
    />
    {/* o - Yellow */}
    <path
      fill="#FBBC05"
      d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
    />
    {/* g - Blue */}
    <path fill="#4285F4" d="M225 3v65h-9.5V3h9.5z" />
    {/* l - Green */}
    <path
      fill="#34A853"
      d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-13.02-8.32l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
    />
    {/* e - Red & First G */}
    <path
      fill="#4285F4"
      d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.35 53.79.35 34.81.35 15.84 16.32.28 35.3.28c10.42 0 17.89 4.09 23.47 9.41l-6.6 6.6c-4.01-3.76-9.39-6.68-16.87-6.68-13.57 0-24.28 11.02-24.28 24.59 0 13.57 10.71 24.59 24.28 24.59 8.78 0 13.77-3.53 16.97-6.73 2.73-2.73 4.54-6.62 5.25-12.06H35.29z"
    />
  </svg>
);

/**
 * Google Styled Brand Text with iconic 4-color letters in original Product Sans font
 */
export const GoogleColoredText: React.FC<{ sizeClass?: string; includeMerch?: boolean }> = ({
  sizeClass = 'text-xl sm:text-2xl',
  includeMerch = true,
}) => (
  <span className={`font-extrabold tracking-tight inline-flex items-center select-none ${sizeClass}`}>
    <span className="text-[#4285F4]">G</span>
    <span className="text-[#EA4335]">o</span>
    <span className="text-[#FBBC05]">o</span>
    <span className="text-[#4285F4]">g</span>
    <span className="text-[#34A853]">l</span>
    <span className="text-[#EA4335]">e</span>
    {includeMerch && (
      <span className="text-neutral-900 font-semibold tracking-normal ml-2">
        Merch Store
      </span>
    )}
  </span>
);

/**
 * Official Google Merchandise Store Brand Logo
 * Features original Google Wordmark SVG + "Merchandise Store" in Google's original Product Sans typeface
 */
export const GoogleMerchandiseStoreBrand: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}> = ({ className = '', size = 'md', showSubtitle = true }) => {
  const heights = {
    sm: { svg: 'h-5', text: 'text-sm', sub: 'text-[9px]' },
    md: { svg: 'h-6 sm:h-7', text: 'text-base sm:text-lg', sub: 'text-[10px]' },
    lg: { svg: 'h-8 sm:h-9', text: 'text-xl sm:text-2xl', sub: 'text-xs' },
  };

  const current = heights[size];

  return (
    <div className={`flex items-center space-x-2.5 select-none ${className}`}>
      {/* Official Google Vector Wordmark */}
      <GoogleWordmarkSVG className={`${current.svg} w-auto`} />
      
      {/* Divider and Merchandise Store in Original Google Sans / Product Sans font */}
      <div className="flex flex-col border-l border-neutral-300 pl-2.5">
        <span className={`font-brand font-medium text-[#5f6368] tracking-tight ${current.text} leading-none`}>
          Merchandise Store
        </span>
        {showSubtitle && (
          <span className={`font-brand text-neutral-400 font-normal tracking-wide mt-0.5 ${current.sub}`}>
            Official Collection
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Authentic Google Four-Color Accent Stripe
 */
export const GoogleColorStripe: React.FC<{ className?: string }> = ({
  className = 'h-1 w-full',
}) => (
  <div className={`grid grid-cols-4 ${className}`}>
    <div className="bg-[#4285F4]"></div>
    <div className="bg-[#EA4335]"></div>
    <div className="bg-[#FBBC05]"></div>
    <div className="bg-[#34A853]"></div>
  </div>
);

/**
 * Google 4-Color Accent Dots
 */
export const GoogleColorDots: React.FC<{ className?: string; size?: string }> = ({
  className = 'space-x-1',
  size = 'w-1.5 h-1.5',
}) => (
  <div className={`inline-flex items-center ${className}`}>
    <span className={`${size} rounded-full bg-[#4285F4]`}></span>
    <span className={`${size} rounded-full bg-[#EA4335]`}></span>
    <span className={`${size} rounded-full bg-[#FBBC05]`}></span>
    <span className={`${size} rounded-full bg-[#34A853]`}></span>
  </div>
);

'use client'

import React from 'react'

interface SpotlightProps {
  className?: string
  fill?: string
}

export const Spotlight: React.FC<SpotlightProps> = ({
  className = '',
  fill = 'white',
}) => {
  return (
    <svg
      className={`pointer-events-none absolute z-[1] h-full w-full animate-pulse ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g opacity="0.75" filter="url(#filter)">
        <circle cx="1924" cy="1427" r="1200" fill={fill} fillOpacity="0.25" />
        <defs>
          <filter
            id="filter"
            x="724"
            y="227"
            width="2400"
            height="2400"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="151"
              result="effect1_foregroundBlur_1428_206"
            />
          </filter>
        </defs>
      </g>
    </svg>
  )
}

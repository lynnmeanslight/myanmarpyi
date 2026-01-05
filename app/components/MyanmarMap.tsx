import React, { useState, useEffect } from "react";
import { REGIONS, MAP_CONFIG, Region } from "../data/regions";

// Map region color classes to badge gradient colors
const getGradientColors = (colorClass: string) => {
  if (colorClass.includes('sky')) return 'from-sky-500 to-sky-600';
  if (colorClass.includes('emerald')) return 'from-emerald-500 to-emerald-600';
  if (colorClass.includes('violet')) return 'from-violet-500 to-violet-600';
  if (colorClass.includes('rose')) return 'from-rose-500 to-rose-600';
  if (colorClass.includes('amber')) return 'from-amber-500 to-amber-600';
  if (colorClass.includes('blue')) return 'from-blue-500 to-blue-600';
  if (colorClass.includes('indigo')) return 'from-indigo-500 to-indigo-600';
  if (colorClass.includes('purple')) return 'from-purple-500 to-purple-600';
  if (colorClass.includes('pink')) return 'from-pink-500 to-pink-600';
  if (colorClass.includes('teal')) return 'from-teal-500 to-teal-600';
  if (colorClass.includes('cyan')) return 'from-cyan-500 to-cyan-600';
  if (colorClass.includes('lime')) return 'from-lime-500 to-lime-600';
  if (colorClass.includes('green')) return 'from-green-500 to-green-600';
  if (colorClass.includes('yellow')) return 'from-yellow-500 to-yellow-600';
  if (colorClass.includes('orange')) return 'from-orange-500 to-orange-600';
  if (colorClass.includes('red')) return 'from-red-500 to-red-600';
  return 'from-rose-500 to-rose-600'; // default
};

const getTextColor = (colorClass: string) => {
  if (colorClass.includes('sky')) return 'text-sky-600';
  if (colorClass.includes('emerald')) return 'text-emerald-600';
  if (colorClass.includes('violet')) return 'text-violet-600';
  if (colorClass.includes('rose')) return 'text-rose-600';
  if (colorClass.includes('amber')) return 'text-amber-600';
  if (colorClass.includes('blue')) return 'text-blue-600';
  if (colorClass.includes('indigo')) return 'text-indigo-600';
  if (colorClass.includes('purple')) return 'text-purple-600';
  if (colorClass.includes('pink')) return 'text-pink-600';
  if (colorClass.includes('teal')) return 'text-teal-600';
  if (colorClass.includes('cyan')) return 'text-cyan-600';
  if (colorClass.includes('lime')) return 'text-lime-600';
  if (colorClass.includes('green')) return 'text-green-600';
  if (colorClass.includes('yellow')) return 'text-yellow-600';
  if (colorClass.includes('orange')) return 'text-orange-600';
  if (colorClass.includes('red')) return 'text-red-600';
  return 'text-rose-600'; // default
};

const getBorderColor = (colorClass: string) => {
  if (colorClass.includes('sky')) return 'border-sky-100';
  if (colorClass.includes('emerald')) return 'border-emerald-100';
  if (colorClass.includes('violet')) return 'border-violet-100';
  if (colorClass.includes('rose')) return 'border-rose-100';
  if (colorClass.includes('amber')) return 'border-amber-100';
  if (colorClass.includes('blue')) return 'border-blue-100';
  if (colorClass.includes('indigo')) return 'border-indigo-100';
  if (colorClass.includes('purple')) return 'border-purple-100';
  if (colorClass.includes('pink')) return 'border-pink-100';
  if (colorClass.includes('teal')) return 'border-teal-100';
  if (colorClass.includes('cyan')) return 'border-cyan-100';
  if (colorClass.includes('lime')) return 'border-lime-100';
  if (colorClass.includes('green')) return 'border-green-100';
  if (colorClass.includes('yellow')) return 'border-yellow-100';
  if (colorClass.includes('orange')) return 'border-orange-100';
  if (colorClass.includes('red')) return 'border-red-100';
  return 'border-rose-100'; // default
};

export interface MyanmarMapProps {
  onRegionClick?: (region: Region) => void;
  onRegionHover?: (region: Region | null) => void;
  className?: string;
  messageCounts?: Record<string, number>;
  selectedRegionId?: string;
}

export const MyanmarMap: React.FC<MyanmarMapProps> = ({
  onRegionClick,
  onRegionHover,
  className = "",
  messageCounts = {},
  selectedRegionId,
}) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastPinchDistance, setLastPinchDistance] = useState<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleRegionClick = (region: Region) => {
    if (!isDragging) {
      onRegionClick?.(region);
    }
  };

  const handleRegionMouseEnter = (region: Region) => {
    setHoveredRegion(region.id);
    onRegionHover?.(region);
  };

  const handleRegionMouseLeave = () => {
    setHoveredRegion(null);
    onRegionHover?.(null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) { // Left mouse button only
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      // Single finger - pan
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    } else if (e.touches.length === 2) {
      // Two fingers - pinch to zoom
      setIsDragging(false);
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setLastPinchDistance(distance);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1 && isDragging) {
      // Single finger - pan
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    } else if (e.touches.length === 2) {
      // Two fingers - pinch to zoom
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      
      if (lastPinchDistance) {
        const delta = (distance - lastPinchDistance) * 0.01;
        const newScale = Math.min(Math.max(0.5, scale + delta), 3);
        setScale(newScale);
      }
      
      setLastPinchDistance(distance);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastPinchDistance(null);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(0.5, scale + delta), 3);
    setScale(newScale);
  };

  // Add wheel event listener with passive: false to prevent default scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const delta = e.deltaY * -0.001;
      setScale((prevScale) => Math.min(Math.max(0.5, prevScale + delta), 3));
    };

    container.addEventListener('wheel', wheelHandler, { passive: false });

    return () => {
      container.removeEventListener('wheel', wheelHandler);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`myanmar-map-container ${className} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ 
        overflow: 'hidden', 
        position: 'relative', 
        touchAction: 'none', 
        isolation: 'isolate',
        overscrollBehavior: 'contain'
      }}
    >
      <svg
        viewBox={MAP_CONFIG.viewBox}
        className="w-full h-full transition-transform duration-75"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center center',
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="softShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="1" dy="1" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <style>{`
            .region-path {
              stroke: #d1d5db;
              stroke-width: 1.5;
              stroke-linejoin: round;
              stroke-linecap: round;
              filter: url(#softShadow);
              transition: all 0.2s ease;
            }
            .region-path:hover {
              stroke: #6b7280;
              stroke-width: 2;
              filter: url(#softShadow) brightness(1.02);
            }
          `}</style>
        </defs>

        {/* Background with gradient */}
        <rect width="100%" height="100%" fill="url(#bgGradient)" />
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        {/* Regions */}
        <g id="myanmar-regions">
          {REGIONS.map((region) => (
            <path
              key={region.id}
              d={region.path}
              className={`region-path ${region.colorClass}`}
              data-region={region.name}
              data-region-id={region.id}
              onClick={() => handleRegionClick(region)}
              onMouseEnter={() => handleRegionMouseEnter(region)}
              onMouseLeave={handleRegionMouseLeave}
              role="button"
              aria-label={`${region.name} (${region.burmeseName})`}
            />
          ))}
        </g>
      </svg>


      {/* Selected Region Info Badge */}
      {selectedRegionId && (() => {
        const selectedRegion = REGIONS.find((r) => r.id === selectedRegionId);
        const gradientColors = selectedRegion ? getGradientColors(selectedRegion.colorClass) : 'from-rose-500 to-rose-600';
        const textColor = selectedRegion ? getTextColor(selectedRegion.colorClass) : 'text-rose-600';
        const borderColor = selectedRegion ? getBorderColor(selectedRegion.colorClass) : 'border-rose-100';
        
        return (
          <div className={`absolute top-1 sm:top-2 right-1 sm:right-2 w-28 sm:w-36 bg-white rounded-md sm:rounded-lg shadow-md border ${borderColor} overflow-hidden transition-all duration-300 ease-out animate-in slide-in-from-top-2 fade-in`}>
            <div className={`bg-gradient-to-r ${gradientColors} px-1.5 sm:px-2 py-1 sm:py-1.5 h-10 sm:h-14 flex flex-col justify-center`}>
              <h3 className="text-[10px] sm:text-xs font-bold text-white leading-tight truncate">
                {selectedRegion?.name}
              </h3>
              <p className="text-[8px] sm:text-[10px] text-white opacity-90 truncate">
                {selectedRegion?.burmeseName}
              </p>
            </div>
            <div className="px-1.5 sm:px-2 py-1.5 sm:py-2 bg-white h-9 sm:h-12 flex items-center">
              <div className="flex-1">
                <p className={`text-sm sm:text-lg font-bold ${textColor} leading-none`}>
                  {messageCounts[selectedRegionId] || 0}
                </p>
                <p className="text-[8px] sm:text-[10px] text-gray-500 font-medium mt-0.5">
                  {messageCounts[selectedRegionId] === 1
                    ? "message"
                    : "messages"}
                </p>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};


export default MyanmarMap;

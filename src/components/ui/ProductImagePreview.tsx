"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

interface ProductImagePreviewProps {
  src: string;
  hoverSrc?: string;
  alt: string;
  hoverAlt?: string;
  sizes: string;
  badge?: string;
  badgeClassName?: string;
  containerClassName?: string;
  loading?: "eager" | "lazy";
}

/**
 * Product image square with scoped desktop hover and mobile finger-hold alternate view swap (no scaling).
 */
export function ProductImagePreview({
  src,
  hoverSrc,
  alt,
  hoverAlt,
  sizes,
  badge,
  badgeClassName = "bottom-3 right-3 text-xs px-3 py-0.5",
  containerClassName = "",
  loading,
}: ProductImagePreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const hasAlternate = Boolean(hoverSrc);
  const showAlternate = hasAlternate && (isHovered || isTouched);

  const handleTouchStart = () => {
    if (hasAlternate) {
      setIsTouched(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!hasAlternate || !isTouched || e.touches.length === 0 || !containerRef.current) {
      return;
    }
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const inside =
      touch.clientX >= rect.left &&
      touch.clientX <= rect.right &&
      touch.clientY >= rect.top &&
      touch.clientY <= rect.bottom;
    if (!inside) {
      setIsTouched(false);
    }
  };

  const handleTouchEnd = () => {
    if (isTouched) {
      setIsTouched(false);
    }
  };

  return (
    <div
      ref={containerRef}
      data-product-image-box
      onPointerEnter={(e) => {
        if (hasAlternate && e.pointerType === "mouse") {
          setIsHovered(true);
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") {
          setIsHovered(false);
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onContextMenu={(e) => {
        if (hasAlternate && isTouched) {
          e.preventDefault();
        }
      }}
      className={`relative aspect-square w-full bg-white overflow-hidden select-none touch-pan-y [-webkit-touch-callout:none] ${containerClassName}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={loading}
        draggable={false}
        className={`object-contain pointer-events-none ${
          hasAlternate
            ? `transition-opacity duration-300 ${showAlternate ? "opacity-0" : "opacity-100"}`
            : ""
        }`}
      />
      {hoverSrc && (
        <Image
          src={hoverSrc}
          alt={hoverAlt || `${alt} alternate view`}
          fill
          sizes={sizes}
          loading={loading}
          draggable={false}
          className={`object-contain pointer-events-none transition-opacity duration-300 ${
            showAlternate ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      {badge && (
        <span
          className={`absolute z-10 font-bold bg-[#C93B3B] text-white rounded-full shadow-2xs pointer-events-none ${badgeClassName}`}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

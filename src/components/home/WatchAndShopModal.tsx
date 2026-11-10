"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Forward,
  Heart,
  Maximize2,
  Minimize2,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { Product, ReelItem } from "@/types/storefront";
import { useCart } from "@/context/CartContext";

interface WatchAndShopModalProps {
  reels: ReelItem[];
  initialIndex: number;
  products: Product[];
  onClose: () => void;
}

interface ReelStageProps {
  reel: ReelItem;
  linkedProduct?: Product;
  isMuted: boolean;
  isExpanded: boolean;
  isLiked: boolean;
  likeCount: number;
  shareNotice: string | null;
  onToggleExpand: () => void;
  onToggleMute: () => void;
  onAutoMuteFallback: () => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleLike: () => void;
  onShare: () => void;
  onShopProduct: () => void;
}

function ReelStage({
  reel,
  linkedProduct,
  isMuted,
  isExpanded,
  isLiked,
  likeCount,
  shareNotice,
  onToggleExpand,
  onToggleMute,
  onAutoMuteFallback,
  onClose,
  onPrev,
  onNext,
  onToggleLike,
  onShare,
  onShopProduct,
}: ReelStageProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.playsInline = true;

    void video.play().catch(() => {
      // Fall back to muted autoplay if browser blocks unmuted playback
      video.muted = true;
      onAutoMuteFallback();
      void video.play().catch(() => {
        setIsPaused(true);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reel.id]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    video.currentTime = ratio * video.duration;
    setProgress(ratio * 100);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      swipeStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!swipeStartRef.current || e.changedTouches.length === 0) return;
    const dx = e.changedTouches[0].clientX - swipeStartRef.current.x;
    const dy = e.changedTouches[0].clientY - swipeStartRef.current.y;
    swipeStartRef.current = null;

    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) onNext();
      else onPrev();
    } else if (Math.abs(dy) > 75 && Math.abs(dy) > Math.abs(dx)) {
      if (dy < 0) onNext();
      else onPrev();
    }
  };

  const displayName = linkedProduct
    ? `${linkedProduct.name}${linkedProduct.packSize ? ` - ${linkedProduct.packSize}` : ""}`
    : reel.productName;
  const displayPrice = linkedProduct ? linkedProduct.price : reel.productPrice;
  const displayCompareAt =
    linkedProduct && linkedProduct.compareAtPrice > linkedProduct.price
      ? linkedProduct.compareAtPrice
      : undefined;
  const displayThumb = linkedProduct?.image || reel.productImage || reel.posterImage;

  return (
    <div className="flex flex-col w-full h-full bg-black overflow-hidden">
      {/* Main Video Stage */}
      <div
        onClick={togglePlayPause}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative flex-1 min-h-0 w-full bg-black overflow-hidden cursor-pointer select-none"
      >
        {reel.videoUrl ? (
          <video
            ref={videoRef}
            src={reel.videoUrl}
            aria-label={reel.title}
            autoPlay
            loop
            playsInline
            muted={isMuted}
            preload="auto"
            onPlay={() => setIsPaused(false)}
            onPause={() => setIsPaused(true)}
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              if (Number.isFinite(v.duration) && v.duration > 0) {
                setProgress((v.currentTime / v.duration) * 100);
              }
            }}
            className={`w-full h-full block ${
              isExpanded ? "object-contain" : "object-cover object-top"
            }`}
          />
        ) : reel.posterImage ? (
          <Image
            src={reel.posterImage}
            alt={reel.title}
            fill
            sizes="(max-width: 640px) 100vw, 440px"
            className={isExpanded ? "object-contain" : "object-cover object-top"}
          />
        ) : null}

        {/* Top Progress Bar & Action Controls */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-0 inset-x-0 z-20 bg-gradient-to-b from-black/65 via-black/25 to-transparent px-3 pt-2.5 pb-6"
        >
          {/* Progress Track */}
          <div
            role="slider"
            tabIndex={0}
            aria-label="Video progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            onClick={handleSeek}
            className="w-full h-[3px] bg-white/30 rounded-full overflow-hidden mb-3 cursor-pointer"
          >
            <div
              className="h-full bg-white rounded-full transition-[width] duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-white font-semibold text-base tracking-tight drop-shadow-xs">
              Arogya Path
            </span>

            <div className="flex items-center gap-3.5 text-white">
              <button
                type="button"
                onClick={onToggleExpand}
                aria-label={isExpanded ? "Exit full screen" : "Enter full screen"}
                className="p-1 text-white/95 hover:text-white transition-opacity cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded"
              >
                {isExpanded ? (
                  <Minimize2 className="w-5 h-5 drop-shadow" />
                ) : (
                  <Maximize2 className="w-5 h-5 drop-shadow" />
                )}
              </button>

              <button
                type="button"
                onClick={onToggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="p-1 text-white/95 hover:text-white transition-opacity cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 drop-shadow" />
                ) : (
                  <Volume2 className="w-5 h-5 drop-shadow" />
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close video player"
                className="p-1 text-white/95 hover:text-white transition-opacity cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded"
              >
                <X className="w-6 h-6 drop-shadow" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Play Indicator when Paused */}
        {isPaused && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-black/55 backdrop-blur-xs text-white flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 fill-white translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Right-Side Share & Like Actions */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-4 right-3 z-20 flex flex-col items-center gap-4 text-white"
        >
          {shareNotice && (
            <span className="bg-black/75 text-white text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap shadow">
              {shareNotice}
            </span>
          )}

          <button
            type="button"
            onClick={onShare}
            aria-label="Share video"
            className="flex flex-col items-center p-1 cursor-pointer hover:opacity-85 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded"
          >
            <Forward className="w-7 h-7 drop-shadow" />
          </button>

          <button
            type="button"
            onClick={onToggleLike}
            aria-label={isLiked ? "Unlike video" : "Like video"}
            aria-pressed={isLiked}
            className="flex flex-col items-center p-1 cursor-pointer hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded"
          >
            <Heart
              className={`w-7 h-7 drop-shadow transition-colors ${
                isLiked ? "fill-[#ef4444] text-[#ef4444]" : "text-white"
              }`}
            />
            <span className="text-xs font-semibold leading-none mt-1.5 drop-shadow">
              {likeCount}
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Pinned Product Card Strip */}
      <button
        type="button"
        onClick={onShopProduct}
        disabled={!linkedProduct}
        className="w-full bg-black hover:bg-neutral-950 border-t border-white/10 px-3 py-2.5 flex items-center gap-3 text-left shrink-0 cursor-pointer disabled:cursor-default transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      >
        {displayThumb && (
          <div className="relative w-14 h-14 bg-white shrink-0 overflow-hidden">
            <Image
              src={displayThumb}
              alt={displayName}
              fill
              sizes="56px"
              className="object-contain"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-white font-semibold text-sm leading-snug line-clamp-2">
            {displayName}
          </p>
          <div className="flex items-center gap-2 mt-0.5 text-xs sm:text-sm font-medium text-white/90">
            <span>Rs. {displayPrice.toLocaleString("en-IN")}</span>
            {displayCompareAt && (
              <span className="text-white/50 line-through text-xs">
                Rs. {displayCompareAt.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </button>
    </div>
  );
}

export function WatchAndShopModal({
  reels,
  initialIndex,
  products,
  onClose,
}: WatchAndShopModalProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const frameRef = useRef<HTMLDivElement | null>(null);
  const shareTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeIndex, setActiveIndex] = useState(() =>
    Math.min(Math.max(0, initialIndex), Math.max(0, reels.length - 1))
  );
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [likedById, setLikedById] = useState<Record<string, boolean>>({});
  const [shareNotice, setShareNotice] = useState<string | null>(null);

  const activeReel = reels[activeIndex] ?? reels[0];

  const handlePrev = useCallback(() => {
    if (reels.length <= 1) return;
    setActiveIndex((idx) => (idx - 1 + reels.length) % reels.length);
  }, [reels.length]);

  const handleNext = useCallback(() => {
    if (reels.length <= 1) return;
    setActiveIndex((idx) => (idx + 1) % reels.length);
  }, [reels.length]);

  const handleClose = useCallback(() => {
    if (typeof document !== "undefined" && document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {});
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "m" || e.key === "M") {
        setIsMuted((m) => !m);
      }
    };

    const handleFullscreenChange = () => {
      setIsExpanded(Boolean(document.fullscreenElement));
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (shareTimerRef.current) clearTimeout(shareTimerRef.current);
    };
  }, [handleClose, handlePrev, handleNext]);

  const handleToggleExpand = () => {
    const el = frameRef.current;
    if (typeof document !== "undefined" && el) {
      if (!document.fullscreenElement) {
        if (el.requestFullscreen) {
          void el.requestFullscreen().catch(() => {
            setIsExpanded((v) => !v);
          });
          return;
        }
      } else if (document.exitFullscreen) {
        void document.exitFullscreen().catch(() => {
          setIsExpanded(false);
        });
        return;
      }
    }
    setIsExpanded((v) => !v);
  };

  const handleShare = async () => {
    const showNotice = (msg: string) => {
      setShareNotice(msg);
      if (shareTimerRef.current) clearTimeout(shareTimerRef.current);
      shareTimerRef.current = setTimeout(() => setShareNotice(null), 1500);
    };

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: activeReel.title,
          url: window.location.href,
        });
        return;
      }
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        showNotice("Link copied");
        return;
      }
    } catch {
      // User dismissed share sheet or clipboard unavailable
    }
    showNotice("Link ready to share");
  };

  if (!activeReel) return null;

  const linkedProduct =
    products.find(
      (p) =>
        (activeReel.productId && p.id === activeReel.productId) ||
        p.name.toLowerCase() === activeReel.productName.trim().toLowerCase()
    ) ?? products[0];

  const isLiked = Boolean(likedById[activeReel.id]);
  const baseLikes = activeReel.likes ?? 15;
  const likeCount = baseLikes + (isLiked ? 1 : 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Watch video: ${activeReel.title}`}
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xs flex items-center justify-center"
    >
      {/* Desktop Prev Arrow */}
      {reels.length > 1 && !isExpanded && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous video"
          className="hidden sm:flex items-center justify-center w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors mr-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Player Frame: Full-viewport on mobile or when expanded, 9:16 centered on desktop */}
      <div
        ref={frameRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-black overflow-hidden shadow-2xl transition-all duration-200 ${
          isExpanded
            ? "w-full h-[100dvh] rounded-none"
            : "w-full h-[100dvh] sm:h-[90dvh] sm:max-h-[860px] sm:w-auto sm:aspect-[9/16] sm:rounded-xl"
        }`}
      >
        <ReelStage
          key={activeReel.id}
          reel={activeReel}
          linkedProduct={linkedProduct}
          isMuted={isMuted}
          isExpanded={isExpanded}
          isLiked={isLiked}
          likeCount={likeCount}
          shareNotice={shareNotice}
          onToggleExpand={handleToggleExpand}
          onToggleMute={() => setIsMuted((m) => !m)}
          onAutoMuteFallback={() => setIsMuted(true)}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
          onToggleLike={() =>
            setLikedById((prev) => ({
              ...prev,
              [activeReel.id]: !prev[activeReel.id],
            }))
          }
          onShare={() => void handleShare()}
          onShopProduct={() => {
            if (!linkedProduct) return;
            addToCart(linkedProduct, 1);
            setIsCartOpen(true);
            handleClose();
          }}
        />
      </div>

      {/* Desktop Next Arrow */}
      {reels.length > 1 && !isExpanded && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next video"
          className="hidden sm:flex items-center justify-center w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors ml-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

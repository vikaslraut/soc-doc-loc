import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX, X } from "lucide-react";

/** Delay before the card first flips to the demo video. */
const FIRST_DELAY = 2500;
/** Idle time on the still card between plays. */
const REPLAY_DELAY = 120000;
/** Must match the flip duration on the inner card. */
const FLIP_MS = 700;

const wantsLessMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isMeteredConnection = () => {
  const conn = (navigator as unknown as {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  return !!conn && (conn.saveData === true || /(^|-)[23]g$/.test(conn.effectiveType ?? ""));
};

const HeroMediaCard = ({
  image,
  video,
  alt,
}: {
  image: string;
  video: string;
  alt: string;
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [muted, setMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number>();
  const resetRef = useRef<number>();
  const showVideoRef = useRef(false);

  const clearTimer = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = undefined;
  };

  const flip = (next: boolean) => {
    showVideoRef.current = next;
    setShowVideo(next);
  };

  const start = useCallback(async () => {
    const el = videoRef.current;
    if (!el) return;
    clearTimer();
    if (resetRef.current) window.clearTimeout(resetRef.current);
    // Every play starts silent — sound is always an explicit choice.
    el.muted = true;
    setMuted(true);
    flip(true);
    try {
      await el.play();
    } catch (err) {
      // A pause (tab hidden, scrolled away) interrupted the request — leave the state as is.
      if ((err as DOMException)?.name === "AbortError") return;
      // Sound was refused — retry silently, then give up and stay on the card.
      el.muted = true;
      setMuted(true);
      try {
        await el.play();
      } catch (retryErr) {
        if ((retryErr as DOMException)?.name !== "AbortError") flip(false);
      }
    }
  }, []);

  const back = useCallback(
    (replayIn: number | null) => {
      flip(false);
      clearTimer();
      // Rewind only once the card has turned, so the last frame never flashes.
      resetRef.current = window.setTimeout(() => {
        const el = videoRef.current;
        if (!el) return;
        el.pause();
        el.currentTime = 0;
      }, FLIP_MS);
      if (replayIn !== null) timerRef.current = window.setTimeout(() => void start(), replayIn);
    },
    [start],
  );

  // Run the cycle on its own; pause it while the card is off screen or the tab is hidden.
  useEffect(() => {
    const node = rootRef.current;
    const el = videoRef.current;
    if (!node || !el) return;

    // Reduced motion or a metered connection: leave the still card alone,
    // the play button still works.
    if (wantsLessMotion() || isMeteredConnection()) return;

    el.preload = "auto";
    timerRef.current = window.setTimeout(() => void start(), FIRST_DELAY);

    const resume = () => {
      if (showVideoRef.current) {
        void videoRef.current?.play().catch(() => flip(false));
      } else if (!timerRef.current) {
        const seen = !!videoRef.current?.played.length;
        timerRef.current = window.setTimeout(() => void start(), seen ? REPLAY_DELAY : FIRST_DELAY);
      }
    };
    const suspend = () => {
      clearTimer();
      videoRef.current?.pause();
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? resume() : suspend()),
      { threshold: 0.35 },
    );
    observer.observe(node);

    const onVisibility = () => (document.hidden ? suspend() : resume());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimer();
      if (resetRef.current) window.clearTimeout(resetRef.current);
    };
  }, [start]);

  const toggleSound = () => {
    const el = videoRef.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    setMuted(next);
  };

  const iconBtn =
    "inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/25 text-white/90 opacity-70 backdrop-blur-sm transition-smooth hover:bg-black/45 hover:text-white hover:opacity-100";

  return (
    <div ref={rootRef} className="relative [perspective:1400px]">
      <div className="absolute -inset-6 rounded-[2rem] bg-primary-foreground/10 blur-2xl" />

      <div className="relative w-full max-w-lg animate-float">
        <div
          className="relative aspect-video w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d]"
          style={{ transform: showVideo ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* Front — still card */}
          <div className="group absolute inset-0 overflow-hidden rounded-[1.5rem] shadow-glow [backface-visibility:hidden]">
            {/* The whole card is the play target — a small badge just hints at it. */}
            <button
              type="button"
              onClick={() => void start()}
              aria-label="Play the soc-doc-loc demo"
              className="absolute inset-0 h-full w-full cursor-pointer"
            >
              <img
                src={image}
                alt={alt}
                width={1280}
                height={960}
                className="h-full w-full object-cover"
              />
              <span
                aria-hidden
                className={`absolute bottom-3 right-3 ${iconBtn} group-hover:bg-black/45 group-hover:text-white group-hover:opacity-100`}
              >
                <Play className="h-4 w-4 fill-current" />
              </span>
            </button>
          </div>

          {/* Back — demo video */}
          <div className="group absolute inset-0 overflow-hidden rounded-[1.5rem] bg-foreground shadow-glow [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <video
              ref={videoRef}
              src={video}
              poster={image}
              muted
              playsInline
              preload="none"
              onEnded={() => back(REPLAY_DELAY)}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-3 right-3 flex gap-2">
              <button
                type="button"
                onClick={() => back(REPLAY_DELAY)}
                aria-label="Close demo video and return to the card"
                className={`${iconBtn} md:!opacity-0 md:group-hover:!opacity-70 md:hover:!opacity-100`}
              >
                <X className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={toggleSound}
                aria-label={muted ? "Unmute demo video" : "Mute demo video"}
                className={iconBtn}
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMediaCard;

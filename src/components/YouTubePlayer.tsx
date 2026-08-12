import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

const ORIGIN = "https://www.youtube-nocookie.com";

/**
 * Click-to-load YouTube card. The player is only mounted once the viewer asks
 * for it, so a page view costs a thumbnail instead of a full embed, and only
 * one card on the page can hold a mounted player at a time.
 */
const YouTubePlayer = ({
  videoId,
  title,
  active,
  onActivate,
}: {
  videoId: string;
  title: string;
  active: boolean;
  onActivate: () => void;
}) => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`);

  // Stop playback once the card scrolls away or the tab goes to the background.
  useEffect(() => {
    const node = boxRef.current;
    if (!active || !node) return;

    const pause = () =>
      frameRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
        ORIGIN,
      );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(node);

    const onVisibility = () => {
      if (document.hidden) pause();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [active]);

  const src =
    `${ORIGIN}/embed/${videoId}` +
    `?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1` +
    `&origin=${encodeURIComponent(window.location.origin)}`;

  return (
    <div ref={boxRef} className="relative w-full" style={{ paddingBottom: "56.25%" }}>
      {active ? (
        <iframe
          ref={frameRef}
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={onActivate}
          aria-label={`Play: ${title}`}
          className="group/play absolute inset-0 h-full w-full bg-foreground"
        >
          <img
            src={thumb}
            alt=""
            loading="lazy"
            onError={() => setThumb(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`)}
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-smooth group-hover/play:bg-black/65">
              <Play className="ml-0.5 h-6 w-6 fill-current" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
};

export default YouTubePlayer;

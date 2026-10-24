import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

const VIDEO_ID = "EhmOj2_YT-M";
const START_SECONDS = 46;

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

/**
 * Hidden YouTube player that streams the wedding soundtrack.
 * Nothing is downloaded or re-hosted — audio streams from YouTube on demand,
 * loops forever, and starts on the guest's first tap/scroll (autoplay rules).
 */
const BackgroundMusic = () => {
  const playerRef = useRef<any>(null);
  const startedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const createPlayer = () => {
      if (cancelled || !window.YT?.Player) return;
      playerRef.current = new window.YT.Player("bg-music-player", {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          loop: 1,
          playlist: VIDEO_ID,
          start: START_SECONDS,
          playsinline: 1,
          modestbranding: 1,
        },
        events: {
          onReady: () => setReady(true),
          onStateChange: (e: any) => {
            if (e.data === window.YT.PlayerState.PLAYING) setPlaying(true);
            if (e.data === window.YT.PlayerState.ENDED) {
              // loop safety net
              try {
                playerRef.current?.seekTo(START_SECONDS, true);
                playerRef.current?.playVideo();
              } catch {
                /* noop */
              }
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        createPlayer();
      };
      if (!document.getElementById("bg-music-iframe-api")) {
        const script = document.createElement("script");
        script.id = "bg-music-iframe-api";
        script.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const start = () => {
    if (!ready || startedRef.current || !playerRef.current) return;
    startedRef.current = true;
    try {
      playerRef.current.playVideo();
    } catch {
      startedRef.current = false;
    }
  };

  // Begin playing on the guest's first interaction (tap, scroll or swipe)
  useEffect(() => {
    if (!ready) return;
    const handler = () => start();
    window.addEventListener("pointerdown", handler);
    window.addEventListener("touchstart", handler, { passive: true });
    window.addEventListener("scroll", handler, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", handler);
      window.removeEventListener("touchstart", handler);
      window.removeEventListener("scroll", handler);
    };
  }, [ready, start]);

  const toggle = () => {
    if (!playerRef.current) return;
    startedRef.current = true;
    if (playing) {
      playerRef.current.pauseVideo();
      setPlaying(false);
    } else {
      playerRef.current.playVideo();
      setPlaying(true);
    }
  };

  return (
    <>
      {/* Hidden but technically "visible" iframe so mobile browsers allow audio */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          opacity: 0.01,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div id="bg-music-player" />
      </div>

      <button
        onClick={toggle}
        aria-label={playing ? "Mute background music" : "Play background music"}
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-card/80 backdrop-blur shadow-paper border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        {playing ? (
          <Music size={16} strokeWidth={1.5} className="animate-pulse" />
        ) : (
          <VolumeX size={16} strokeWidth={1.5} />
        )}
      </button>
    </>
  );
};

export default BackgroundMusic;

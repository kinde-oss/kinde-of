import React, { useEffect, useState, useRef, useCallback } from 'react';
import './VideoPaywall.css';

interface VideoPaywallProps {
  onVideoComplete: () => void;
  videoId?: string;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          height: string;
          width: string;
          videoId: string;
          playerVars: {
            autoplay: number;
            controls: number;
            disablekb: number;
            fs: number;
            iv_load_policy: number;
            modestbranding: number;
            rel: number;
            showinfo: number;
            start: number;
          };
          events: {
            onReady: (event: { target: YouTubePlayer }) => void;
            onStateChange: (event: { data: number }) => void;
          };
        }
      ) => YouTubePlayer;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
        UNSTARTED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubePlayer {
  getCurrentTime: () => number;
  getDuration: () => number;
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  loadVideoById: (videoId: string) => void;
}

const VideoPaywall: React.FC<VideoPaywallProps> = ({
  onVideoComplete,
  videoId,
}) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string>('');
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isVideoComplete, setIsVideoComplete] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (videoId) {
      setSelectedVideoId(videoId);
    } else {
      setSelectedVideoId('M3hX3JwhEY8');
    }
  }, [videoId]);

  useEffect(() => {
    const preventInteraction = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === 'w' ||
          e.key === 'W' ||
          e.key === 'r' ||
          e.key === 'R' ||
          e.key === 'q' ||
          e.key === 'Q')
      ) {
        e.preventDefault();
        return false;
      }

      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        return false;
      }
    };

    const preventRightClick = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('keydown', preventKeyboardShortcuts, true);
    document.addEventListener('contextmenu', preventRightClick, true);
    document.addEventListener('selectstart', preventInteraction, true);
    document.addEventListener('dragstart', preventInteraction, true);

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        'Are you sure you want to leave? The video must be watched completely.';
      return 'Are you sure you want to leave? The video must be watched completely.';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('keydown', preventKeyboardShortcuts, true);
      document.removeEventListener('contextmenu', preventRightClick, true);
      document.removeEventListener('selectstart', preventInteraction, true);
      document.removeEventListener('dragstart', preventInteraction, true);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (!selectedVideoId) return;

    const loadYouTubeAPI = () => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    };

    if (!window.YT) {
      loadYouTubeAPI();
    } else {
      initializePlayer();
    }

    window.onYouTubeIframeAPIReady = initializePlayer;
  }, [selectedVideoId]);

  const initializePlayer = useCallback(() => {
    if (!selectedVideoId || !window.YT) {
      console.log('Cannot initialize player:', {
        selectedVideoId,
        YT: !!window.YT,
      });
      return;
    }

    console.log('Initializing YouTube player with video ID:', selectedVideoId);

    playerRef.current = new window.YT.Player('youtube-player', {
      height: '100%',
      width: '100%',
      videoId: selectedVideoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        start: 0,
      },
      events: {
        onReady: () => {
          setIsVideoReady(true);
          startProgressTracking();
        },
        onStateChange: (event: { data: number }) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            handleVideoComplete();
          }
          if (event.data === window.YT.PlayerState.PLAYING) {
            console.log('Video started playing');
          }
        },
      },
    });
  }, [selectedVideoId]);

  const startProgressTracking = () => {
    progressIntervalRef.current = setInterval(() => {
      if (
        playerRef.current &&
        playerRef.current.getCurrentTime &&
        playerRef.current.getDuration
      ) {
        try {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();

          if (duration > 0) {
            const progress = (currentTime / duration) * 100;
            setVideoProgress(Math.min(progress, 100));

            if (duration - currentTime <= 2) {
              handleVideoComplete();
            }
          }
        } catch (error) {
          console.log('Progress tracking error:', error);
        }
      }
    }, 1000);
  };

  const handleVideoComplete = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    setIsVideoComplete(true);
    setTimeout(() => {
      onVideoComplete();
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="video-paywall">
      <div className="video-container">
        <div id="youtube-player" className="youtube-player"></div>

        {isVideoComplete && (
          <div className="completion-overlay">
            <div className="completion-content">
              <h2>My manager thanks you.</h2>
              <p>Welcome.</p>
            </div>
          </div>
        )}

        {!isVideoComplete && isVideoReady && (
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${videoProgress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPaywall;

import React, { useState, useEffect } from 'react';
import VideoPaywall from './VideoPaywall';
import './VideoPaywallPage.css';

interface VideoPaywallPageProps {
  onVideoComplete: () => void;
}

const KINDE_VIDEO_IDS = [
  'MvsAesQ',
  'yhuJIpPu4B8',
  'TgYfXe2qrs',
  'M3hX3JwhEY8',
  'xxVwZW8OxIA',
  '283hFCpC3jc',
  'XsXEjVpBFcA',
  '7kFgc8rV1Ts',
  'cl8W2awphqc',
  '5_8jlrepCkI',
  'eY7M243AkXE',
  'EQJxz6Xaffs',
  'iqO7CL3QyY8',
];

const VideoPaywallPage: React.FC<VideoPaywallPageProps> = ({
  onVideoComplete,
}) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string>('M3hX3JwhEY8');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!selectedVideoId) {
      generateRandomVideo();
    }
  }, [selectedVideoId]);

  const generateRandomVideo = () => {
    setIsGenerating(true);
    const randomIndex = Math.floor(Math.random() * KINDE_VIDEO_IDS.length);
    const newVideoId = KINDE_VIDEO_IDS[randomIndex];
    console.log('Generated new video ID:', newVideoId);
    setSelectedVideoId(newVideoId);

    setTimeout(() => {
      setIsGenerating(false);
    }, 1000);
  };

  const startVideo = () => {
    setShowVideo(true);
  };

  if (showVideo && selectedVideoId) {
    return (
      <VideoPaywall
        videoId={selectedVideoId}
        onVideoComplete={onVideoComplete}
      />
    );
  }

  return (
    <div className="video-paywall-page">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-icon">🎭</div>
          <h1 className="hero-title">
            My manager said you have to watch a video first
          </h1>
          <p className="hero-subtitle">
            📈 This is now tied to my quarterly KPIs
          </p>

          <p className="hero-subtitle">
            If you don’t do it, I don’t hit my goals
          </p>
          <p className="hero-subtitle">
            If I don’t hit my goals, I get performance reviewed
          </p>
          <p className="hero-subtitle">If I get reviewed, I cry</p>
          <p className="hero-subtitle">Please. Just watch the video.</p>
        </div>
      </div>

      <div className="content-section">
        <div className="video-preview">
          <h2>🎲 Random Compliance Content</h2>
          {isGenerating ? (
            <div className="generating-state">
              <div className="loading-spinner"></div>
              <p>Generating your mandatory compliance video...</p>
            </div>
          ) : (
            <div className="video-info">
              <div className="video-thumbnail">
                <img
                  src={`https://img.youtube.com/vi/${selectedVideoId}/maxresdefault.jpg`}
                  alt="Video thumbnail"
                  onError={e => {
                    e.currentTarget.src = `https://img.youtube.com/vi/${selectedVideoId}/hqdefault.jpg`;
                  }}
                />
                <div className="play-overlay">▶️</div>
              </div>
              <div className="video-details">
                <h3>Watch Like My Job Depends On It</h3>
                <button className="start-video-btn" onClick={startVideo}>
                  🎬 Click here PLEASE
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="action-section">
          <button
            className="generate-new-btn"
            onClick={generateRandomVideo}
            disabled={isGenerating}
          >
            {isGenerating ? '🎲 Generating...' : '🎲 Generate New Video'}
          </button>
        </div>

        <div className="info-section">
          <div className="info-card">
            <h3>🙃 Why Are We Doing This?</h3>
            <p>IDK TBH</p>
          </div>
          <div className="info-card">
            <h3>⏱️ How Long?</h3>
            <p>
              Like anywhere between 1-25mins long. Probably. But don't quote me.
            </p>
          </div>
          <div className="info-card">
            <h3>🫣 Will You Be Tracked?</h3>
            <p>
              No. I don’t have the infrastructure for that. This whole thing is
              duct-taped together with hope.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPaywallPage;

import { useState, useEffect } from 'react';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
import SuccessPage from './SuccessPage';
import VideoPaywallPage from './VideoPaywallPage';
import './DashboardWithPaywall.css';

export default function DashboardWithPaywall() {
  const [hasWatchedVideo, setHasWatchedVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useKindeAuth();

  useEffect(() => {
    console.log('Main effect triggered:', {
      isAuthenticated,
      user: !!user,
      userId: user?.id,
    });

    if (!isAuthenticated || !user) {
      console.log('No user or not authenticated, resetting video state');
      setHasWatchedVideo(false);
      setIsLoading(false);
      return;
    }

    const userId = user.id;
    const currentLoginSessionKey = `currentLoginSession_${userId}`;
    const videoWatchedKey = `videoWatched_${userId}`;

    const currentSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const storedLoginSessionId = localStorage.getItem(currentLoginSessionKey);

    console.log('Session comparison:', {
      currentSessionId,
      storedLoginSessionId,
      isNewLoginSession: !storedLoginSessionId,
    });

    if (!storedLoginSessionId) {
      localStorage.setItem(currentLoginSessionKey, currentSessionId);
      sessionStorage.removeItem(videoWatchedKey);
      setHasWatchedVideo(false);
    } else {
      const hasWatchedInSession = sessionStorage.getItem(videoWatchedKey);
      const storedSessionForVideo = sessionStorage.getItem(
        `${videoWatchedKey}_session`
      );

      console.log('Existing session check:', {
        hasWatchedInSession,
        storedSessionForVideo,
        currentStoredSession: storedLoginSessionId,
      });

      if (
        hasWatchedInSession === 'true' &&
        storedSessionForVideo === storedLoginSessionId
      ) {
        setHasWatchedVideo(true);
      } else {
        setHasWatchedVideo(false);
      }
    }

    setIsLoading(false);
  }, [user?.id, isAuthenticated]);

  useEffect(() => {
    return () => {
      if (user?.id) {
        const currentLoginSessionKey = `currentLoginSession_${user.id}`;
        localStorage.removeItem(currentLoginSessionKey);
        console.log('Cleared login session tracking on logout');
      }
    };
  }, [user?.id]);

  const handleVideoComplete = () => {
    setHasWatchedVideo(true);

    if (user?.id) {
      const userId = user.id;
      const currentLoginSessionKey = `currentLoginSession_${userId}`;
      const videoWatchedKey = `videoWatched_${userId}`;
      const currentLoginSession = localStorage.getItem(currentLoginSessionKey);
      const timestamp = Date.now().toString();

      sessionStorage.setItem(videoWatchedKey, 'true');
      sessionStorage.setItem(
        `${videoWatchedKey}_session`,
        currentLoginSession || ''
      );
      sessionStorage.setItem(`${videoWatchedKey}_timestamp`, timestamp);

      console.log('Stored video completion for session:', currentLoginSession);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!hasWatchedVideo) {
    return (
      <VideoPaywallPage
        key={user?.id || 'anonymous'}
        onVideoComplete={handleVideoComplete}
      />
    );
  }

  return <SuccessPage />;
}

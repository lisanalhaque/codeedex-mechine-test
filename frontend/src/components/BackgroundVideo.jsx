import { useRef, useEffect, useState } from 'react';

export const AUTH_VIDEO = '/videos/auth-bg.mp4';
export const APP_VIDEO = '/videos/app-bg.mp4';

export default function BackgroundVideo({ src, children }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, [src]);

  return (
    <div className="background-video-wrap">
      <video
        ref={videoRef}
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={src} type="video/mp4" />
      </video>

      <div className="background-video-overlay"></div>

      <div className="background-video-content">
        {children}
      </div>
    </div>
  );
}

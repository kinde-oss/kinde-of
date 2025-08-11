'use client';

import { useState, useEffect } from 'react';

export default function AnnoyingModal() {
  const [hasClicked, setHasClicked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const LINKEDIN_POSTS = [
    'https://www.linkedin.com/posts/heykinde_simplicity-by-design-activity-7204001914676551680-Szbx',
    'https://www.linkedin.com/posts/heykinde_you-can-now-use-twilio-to-manage-and-monitor-activity-7359138807775940609-AWD5',
    'https://www.linkedin.com/posts/heykinde_kinde-makes-authentication-simple-activity-7322225433443207168-xyz1',
  ];
  const linkedinUrl =
    LINKEDIN_POSTS[Math.floor(Math.random() * LINKEDIN_POSTS.length)];

  const handleBackdropClick = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* backdrop */}
      <div
        className="modal-backdrop"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* modal */}
      <div
        className={`modal-window ${isShaking ? 'shake' : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* title bar */}
        <div className="title-bar">
          <div className="title-bar-text" id="modal-title">
            {/* <span className="title-icon" aria-hidden="true">
              🐛
            </span> */}
            System message
          </div>
          <button
            className="title-bar-close"
            onClick={() => alert("Sorry, close button's just for show")}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* content */}
        <div className="window-body">
          <div className="message-content">
            <div className="message-icon">🎉</div>
            <div className="message-text">
              <strong>CONGRATULATIONS!</strong> You have been selected to save
              my KPIs. No pressure.
              <br />
              <br />⚡ Click the button below before this offer expires! ⚡
            </div>
          </div>

          {/* Button container */}
          <div className="button-container">
            {!hasClicked ? (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setHasClicked(true)}
                className="action-button linkedin-button"
              >
                🔗 PLEASE CLICK HERE 🔗
              </a>
            ) : (
              <button
                onClick={handleClose}
                className="action-button close-button"
              >
                Continue to Dashboard
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Backdrop */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9998;
          cursor: default;
        }

        /* Modal window */
        .modal-window {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 400px;
          max-width: 90vw;
          background: #f0f0f0;
          border: 2px solid #000;
          border-radius: 8px;
          box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
          font-family: 'Tahoma', 'MS Sans Serif', Geneva, sans-serif;
          font-size: 12px;
          color: black;
          transform: translate(-50%, -50%);
          z-index: 9999;
          user-select: none;
          overflow: hidden;
        }

        /* Shake animation */
        @keyframes shake {
          0%,
          100% {
            transform: translate(-50%, -50%) translateX(0);
          }
          20%,
          60% {
            transform: translate(-50%, -50%) translateX(-5px);
          }
          40%,
          80% {
            transform: translate(-50%, -50%) translateX(5px);
          }
        }
        .shake {
          animation: shake 0.5s;
        }

        /* Title bar */
        .title-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(to bottom, #0066cc, #0052a3);
          color: white;
          height: 22px;
          padding: 0 8px;
          font-weight: bold;
          font-size: 11px;
          user-select: none;
          border-bottom: 1px solid #000;
        }
        .title-bar-text {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .title-icon {
          font-size: 12px;
        }
        .title-bar-close {
          background: #f0f0f0;
          border: 1px solid #000;
          width: 18px;
          height: 16px;
          font-size: 10px;
          line-height: 14px;
          color: black;
          cursor: pointer;
          user-select: none;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          border-radius: 2px;
          transition: background-color 0.2s;
        }
        .title-bar-close:hover,
        .title-bar-close:focus {
          background: #e0e0e0;
          outline: none;
        }

        /* Window body */
        .window-body {
          padding: 20px;
          background: #f0f0f0;
          color: black;
        }

        /* Message content */
        .message-content {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 20px;
          padding: 0;
        }
        .message-icon {
          font-size: 32px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .message-text {
          font-size: 13px;
          line-height: 1.4;
          user-select: text;
          flex: 1;
        }

        /* Button container */
        .button-container {
          display: flex;
          justify-content: center;
          gap: 12px;
          user-select: none;
        }
        .action-button {
          padding: 6px 16px;
          font-weight: bold;
          font-size: 11px;
          color: black;
          background: #f0f0f0;
          border: 2px outset #f0f0f0;
          cursor: pointer;
          user-select: none;
          border-radius: 3px;
          min-width: 60px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          box-shadow:
            inset 1px 1px 0 #fff,
            inset -1px -1px 0 #808080;
        }
        .action-button:hover,
        .action-button:focus {
          background: #e0e0e0;
          outline: none;
        }
        .action-button:active {
          border-style: inset;
          box-shadow:
            inset -1px -1px 0 #fff,
            inset 1px 1px 0 #808080;
        }
        .linkedin-button {
          background: #0066cc;
          color: white;
          border-color: #0066cc;
          box-shadow:
            inset 1px 1px 0 #4da6ff,
            inset -1px -1px 0 #004080;
        }
        .linkedin-button:hover,
        .linkedin-button:focus {
          background: #0052a3;
        }
        .close-button {
          background: #32cd32;
          color: white;
          border-color: #32cd32;
          box-shadow:
            inset 1px 1px 0 #90ee90,
            inset -1px -1px 0 #228b22;
        }
        .close-button:hover,
        .close-button:focus {
          background: #228b22;
        }
        .ignore-button {
          background: #f0f0f0;
          color: black;
        }

        /* Status message */
        .status-message {
          text-align: center;
          color: #228b22;
          font-weight: bold;
          margin-top: 15px;
          font-size: 12px;
        }

        /* Remove focus outlines except for buttons and links */
        a,
        button {
          outline-offset: 2px;
        }
        a:focus,
        button:focus {
          outline: 2px solid #0066cc;
          outline-offset: 2px;
        }
        /* Prevent focus outlines on other elements */
        *:not(a):not(button):focus {
          outline: none;
        }
      `}</style>
    </>
  );
}

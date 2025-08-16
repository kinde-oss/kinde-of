'use client';

import { useState } from 'react';
import { linkedinPosts } from '@/lib/linkedinPosts';

interface FilePosition {
  id: number;
  x: number;
  y: number;
}

export default function WindowsDesktop() {
  const [filePositions, setFilePositions] = useState<FilePosition[]>(() => {
    // Initialize files in a grid pattern
    return linkedinPosts.map((_, index) => ({
      id: index,
      x: 50 + (index % 3) * 120,
      y: 100 + Math.floor(index / 3) * 120,
    }));
  });

  const [draggedFile, setDraggedFile] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent, fileId: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setDraggedFile(fileId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedFile !== null) {
      const desktop = e.currentTarget as HTMLElement;
      const rect = desktop.getBoundingClientRect();

      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;

      // Keep files within desktop bounds
      const clampedX = Math.max(20, Math.min(newX, rect.width - 80));
      const clampedY = Math.max(20, Math.min(newY, rect.height - 100));

      setFilePositions((prev) =>
        prev.map((file) =>
          file.id === draggedFile ? { ...file, x: clampedX, y: clampedY } : file
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggedFile(null);
  };

  const getFileTitle = (url: string) => {
    // Extract a meaningful title from the LinkedIn URL
    const match = url.match(/posts\/heykinde_(.+?)-activity/);
    if (match) {
      return match[1].replace(/-/g, ' ').substring(0, 20) + '...';
    }
    return 'LinkedIn Post';
  };

  return (
    <div
      className="windows-desktop"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Desktop Background */}
      <div className="desktop-background">
        <img
          src="/images/windowsXPBackground.webp"
          alt="Windows XP Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </div>

      {/* Desktop Files */}
      {linkedinPosts.map((post, index) => {
        const position = filePositions.find((p) => p.id === index);
        if (!position) return null;

        return (
          <div
            key={index}
            className={`desktop-file ${draggedFile === index ? 'dragging' : ''}`}
            style={{
              left: position.x,
              top: position.y,
            }}
            onMouseDown={(e) => handleMouseDown(e, index)}
          >
            <div className="file-icon">
              <img
                src="/images/files/msmsgs.exe_14_5-0.png"
                alt="File Icon"
                width={32}
                height={32}
                className="icon-image"
              />
            </div>
            <div className="file-label">{getFileTitle(post)}</div>
            <a
              href={post}
              target="_blank"
              rel="noopener noreferrer"
              className="file-link"
              onClick={(e) => {
                if (draggedFile !== null) {
                  e.preventDefault();
                }
              }}
            >
              <span className="sr-only">Open LinkedIn Post</span>
            </a>
          </div>
        );
      })}

      <style jsx>{`
        .windows-desktop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          cursor: default;
          user-select: none;
          z-index: 1;
        }

        .desktop-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .desktop-file {
          position: absolute;
          width: 80px;
          height: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 8px 4px;
          border-radius: 4px;
          cursor: pointer;
          z-index: 10;
          transition: background-color 0.2s;
        }

        .desktop-file:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .desktop-file.dragging {
          opacity: 0.8;
          z-index: 100;
        }

        .file-icon {
          width: 32px;
          height: 32px;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-image {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }

        .file-label {
          font-family: 'Tahoma', 'MS Sans Serif', Geneva, sans-serif;
          font-size: 11px;
          color: white;
          text-align: center;
          line-height: 1.2;
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
          word-wrap: break-word;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .file-link {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 5;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Windows XP style selection */
        .desktop-file.selected {
          background-color: rgba(0, 102, 204, 0.3);
          border: 1px solid rgba(0, 102, 204, 0.8);
        }

        /* Double-click animation */
        @keyframes fileClick {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
          }
        }

        .desktop-file:active {
          animation: fileClick 0.1s ease-in-out;
        }
      `}</style>
    </div>
  );
}

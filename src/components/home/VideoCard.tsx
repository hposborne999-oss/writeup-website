"use client";

import { useEffect, useRef } from "react";
import { Container } from "../Container";

export function VideoCard() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 lg:py-[88px] bg-paper border-b border-rule">
      <Container>
        <div className="relative bg-petrol rounded-md aspect-video overflow-hidden shadow-[0_30px_60px_-20px_rgba(10,34,38,0.25),0_1px_0_rgba(0,0,0,0.04)]">
          <video
            ref={videoRef}
            src="/writeup-demo.mp4"
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-between items-baseline mt-[18px] text-[13px] text-slate-500 gap-4 flex-wrap">
          <div>An audit on a redacted draft.</div>
          <div className="font-mono text-slate-700">FIG. 01</div>
        </div>
      </Container>
    </section>
  );
}

"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

type Meteor = {
  left: number;
  top: number;
  animationDelay: number;
  animationDuration: number;
};

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteorCount = number || 20;
  const meteorRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>(() =>
    Array.from({ length: meteorCount }, (_, index) => ({
      left: (index / meteorCount) * 100,
      top: 0,
      animationDelay: (index % 5) * 0.2,
      animationDuration: 5,
    })),
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMeteors(
        Array.from({ length: meteorCount }, () => ({
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDelay: Math.random() * 5,
          animationDuration: Math.floor(Math.random() * (10 - 5) + 5),
        })),
      );
    });

    return () => window.cancelAnimationFrame(frame);
  }, [meteorCount]);

  useEffect(() => {
    const animations = meteors.map((meteor, index) => {
      const element = meteorRefs.current[index];
      if (!element) return null;

      return element.animate(
        [
          { transform: "rotate(215deg) translateX(0)", opacity: 1, offset: 0 },
          { opacity: 1, offset: 0.7 },
          {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: 0,
            offset: 1,
          },
        ],
        {
          duration: meteor.animationDuration * 1000,
          delay: meteor.animationDelay * 1000,
          iterations: Infinity,
          easing: "linear",
        },
      );
    });

    return () => {
      animations.forEach((animation) => animation?.cancel());
    };
  }, [meteors]);

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {meteors.map((meteor, idx) => (
        <span
          key={"meteor" + idx}
          ref={(element) => {
            meteorRefs.current[idx] = element;
          }}
          className={cn(
            "absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
            "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
          )}
          style={{
            top: `${meteor.top}%`,
            left: `${meteor.left}%`,
          }}
        />
      ))}
    </div>
  );
};

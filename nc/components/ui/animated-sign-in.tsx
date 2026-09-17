"use client";
import React, { useState, useRef, useEffect, ReactNode } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

// ==================== Ripple ====================
export function Ripple({
  mainCircleSize = 120,
  mainCircleOpacity = 0.22,
  numCircles = 8,
  color = "#29A9E1",
  className = "",
}: {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  color?: string;
  className?: string;
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 flex items-center justify-center", className)}>
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 62;
        const opacity = Math.max(mainCircleOpacity - i * 0.024, 0.02);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full border"
            style={{
              width: size,
              height: size,
              borderColor: color,
              borderWidth: 1,
              opacity,
            }}
            animate={{ scale: [1, 0.92, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
          />
        );
      })}
    </div>
  );
}

// ==================== Orbiting dots (colori brand, non loghi) ====================
function OrbitRing({
  radius,
  duration,
  reverse = false,
  dotColor,
  dotSize = 10,
}: {
  radius: number;
  duration: number;
  reverse?: boolean;
  dotColor: string;
  dotSize?: number;
}) {
  return (
    <>
      <svg className="pointer-events-none absolute inset-0 size-full">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={1}
        />
      </svg>
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <span
          className="absolute rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: dotColor,
            top: -dotSize / 2,
            left: "50%",
            transform: "translateX(-50%)",
            boxShadow: `0 0 12px ${dotColor}`,
          }}
        />
      </motion.div>
    </>
  );
}

export function TechOrbitDisplay({
  arcColors,
  text,
  subtitle,
}: {
  arcColors: string[];
  text: string;
  subtitle?: string;
  iconsArray?: unknown[]; // mantenuto per compatibilità di firma, non usato: niente loghi esterni
}) {
  const radii = [70, 110, 150, 190, 230];
  const [c1, c2, c3, c4, c5] = arcColors;

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-10">
      <span
        className="pointer-events-none select-none bg-clip-text text-center font-serif text-6xl font-medium leading-none text-transparent"
        style={{
          backgroundImage: `linear-gradient(90deg, ${c1}, ${c2}, ${c3}, ${c4}, ${c5})`,
        }}
      >
        {text}
      </span>

      {subtitle && (
        <span className="relative z-10 mt-4 max-w-[280px] text-center text-sm leading-relaxed text-[#616B7D]">
          {subtitle}
        </span>
      )}

      {radii.map((r, i) => (
        <OrbitRing
          key={r}
          radius={r}
          duration={14 + i * 4}
          reverse={i % 2 === 0}
          dotColor={arcColors[i % arcColors.length]}
        />
      ))}
    </div>
  );
}

// ==================== BoxReveal ====================
export function BoxReveal({
  children,
  width = "fit-content",
  boxColor = "#1B2740",
  duration = 0.5,
  className,
}: {
  children: ReactNode;
  width?: string;
  boxColor?: string;
  duration?: number;
  className?: string;
}) {
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      slideControls.start("visible");
      mainControls.start("visible");
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }} className={className}>
      <motion.div
        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration, delay: 0.15 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{ hidden: { left: 0 }, visible: { left: "100%" } }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor,
          borderRadius: 4,
        }}
      />
    </div>
  );
}

// ==================== Input con spotlight che segue il mouse ====================
export const SpotlightInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { spotlightColor?: string }
>(function SpotlightInput({ className, spotlightColor = "#29A9E1", ...props }, ref) {
  const radius = 110;
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      style={{
        background: useMotionTemplate`radial-gradient(${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`,
      }}
      className="rounded-xl p-[2px] transition duration-300"
    >
      <input
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-[10px] border-none bg-white/[0.06] px-4 text-[15px] text-white outline-none placeholder:text-white/35",
          className
        )}
        {...props}
      />
    </motion.div>
  );
});

export function BottomGradient() {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px bg-gradient-to-r from-transparent via-[#29A9E1] to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-[#3AA845] to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
}
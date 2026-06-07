/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number; // delay in milliseconds
  className?: string;
  classNameActive?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  classNameActive = ''
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersected, setIsIntersected] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          observer.unobserve(element); // Trigger once
        }
      },
      {
        threshold: 0.2, // Trigger at 20% threshold requested
        rootMargin: '0px 0px -50px 0px' // offset to ensure clean visual start
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`transition-all duration-600 ease-out-quint ${className} ${
        isIntersected
          ? `opacity-100 translate-y-0 ${classNameActive}`
          : 'opacity-0 translate-y-[30px] pointer-events-none'
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionProperty: 'opacity, transform',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}

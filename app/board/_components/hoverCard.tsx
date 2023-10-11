'use client';

import clsx from 'clsx';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
} from 'framer-motion';
import { useEffect, useState, type MouseEvent } from 'react';
import { useIsMobile } from '@/lib/useIsMobile';
import { cn } from '@/lib/utils';

type WrapperStyle = MotionStyle & {
  '--x': MotionValue<string>;
  '--y': MotionValue<string>;
};

interface CardProps {
    title: string;
    description: string;
    bgClass?: string;
    className?: string;
}

export function HoverCard({
    title,
    description,
    bgClass,
    children,
    className
}: CardProps & {
    children: React.ReactNode;
}) {
    const [mounted, setMounted] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const isMobile = useIsMobile();

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        if (isMobile) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <motion.div
            className={cn("animated-feature-cards relative w-full h-fit drop-shadow-[0_0_15px_rgba(49,49,49,0.2)] dark:drop-shadow-[0_0_15px_rgba(49,49,49,0.2)]", className)}
            onMouseMove={handleMouseMove}
            style={
                {
                    '--x': useMotionTemplate`${mouseX}px`,
                    '--y': useMotionTemplate`${mouseY}px`,
                } as WrapperStyle
            }
        >
            <div
                className={clsx(
                    'group relative w-full overflow-hidden rounded-3xl border bg-gradient-to-b from-neutral-50/90 to-neutral-100/90 transition duration-300 dark:from-neutral-950/90 dark:to-neutral-800/90',
                    'md:hover:border-transparent',
                    bgClass,
                )}
            >
                <div className="mx-5 my-5 w-full">
                    {mounted ? children : null}
                </div>
            </div>
        </motion.div>
    );
}
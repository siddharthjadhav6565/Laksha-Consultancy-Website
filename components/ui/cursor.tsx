import { useEffect, useState } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────────────────────── */
type CursorState = "default" | "pointer" | "text";

function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [cursorState, setCursorState] = useState<CursorState>("default");

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();
      const isPointer = ['a', 'button', 'select'].includes(tagName) || target.closest('a, button, [data-cursor="pointer"]');
      const isText = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'input', 'textarea', 'label'].includes(tagName);

      if (isPointer) setCursorState("pointer");
      else if (isText) setCursorState("text");
      else setCursorState("default");
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    return () => { window.removeEventListener("mousemove", moveCursor); window.removeEventListener("mouseover", handleMouseOver); };
  }, [cursorX, cursorY]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `* { cursor: none !important; }` }} />
      <motion.div style={{ x: cursorX, y: cursorY }} className="fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform hidden md:block">
        <AnimatePresence mode="wait">
          {cursorState === "default" && (
            <motion.svg key="default" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} width="24" height="24" viewBox="0 0 24 24" className="theme-text-primary drop-shadow-md origin-top-left">
              <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.94c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 0 0-.85.35z" fill="currentColor" stroke="var(--bg-base)" strokeWidth="1.5" strokeLinejoin="round"/>
            </motion.svg>
          )}
          {cursorState === "pointer" && (
            <motion.svg key="pointer" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1.1 }} exit={{ opacity: 0, scale: 0.8 }} width="24" height="24" viewBox="0 0 24 24" className="text-[#FF3E00] drop-shadow-lg origin-top-left">
              <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.94c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 0 0-.85.35z" fill="currentColor" stroke="var(--bg-base)" strokeWidth="1.5" strokeLinejoin="round"/>
            </motion.svg>
          )}
          {cursorState === "text" && (
            <motion.div key="text" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }} className="w-[2px] h-6 bg-[#FF3E00] -translate-x-1/2 -translate-y-1/2 shadow-sm rounded-full" />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export { CustomCursor };
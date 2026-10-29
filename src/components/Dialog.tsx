import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";

// Shared open-dialog stack so nested dialogs cooperate: only the topmost open
// dialog traps focus and handles Escape, so an inner confirm dialog does not
// fight its parent for focus or get dismissed together
const dialogStack: string[] = [];
const stackListeners = new Set<() => void>();

const notifyStack = () => {
  for (const listener of stackListeners) listener();
};

const pushDialog = (id: string) => {
  dialogStack.push(id);
  notifyStack();
};

const removeDialog = (id: string) => {
  const index = dialogStack.indexOf(id);
  if (index !== -1) dialogStack.splice(index, 1);
  notifyStack();
};

const topDialog = (): string | undefined => dialogStack[dialogStack.length - 1];

// Elements that can receive focus inside the dialog, used for the focus trap
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const getFocusable = (container: HTMLElement): HTMLElement[] =>
  Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter((el) => el.offsetParent !== null || el === document.activeElement);

type DialogProps = {
  /** Render nothing when false */
  open: boolean;
  /** Called on Escape or backdrop click, never while busy */
  onClose: () => void;
  /**
   * Blocks dismissal while an action is in flight, so an in-progress mutation
   * cannot be interrupted by Escape or a backdrop click
   */
  busy?: boolean;
  /** id of the heading element the children render, labels the dialog */
  labelledBy: string;
  /** Panel classes, e.g. width, max height, and flex layout */
  className?: string;
  children: ReactNode;
};

/**
 * Accessible modal primitive
 *
 * Renders a focus-trapped `role="dialog"` container labelled by the caller's
 * heading. It closes on Escape and backdrop click (unless busy), restores
 * focus to the trigger on close, and cooperates with nested dialogs so only
 * the topmost one traps focus and handles Escape. Implemented with refs and
 * effects so it adds no dependency
 */
function Dialog({
  open,
  onClose,
  busy = false,
  labelledBy,
  className,
  children,
}: DialogProps) {
  const id = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [isTop, setIsTop] = useState(false);

  // Register on the shared stack while open so the topmost dialog can be
  // identified, and keep this instance's view of whether it is on top in sync
  useEffect(() => {
    if (!open) return;
    pushDialog(id);
    const update = () => setIsTop(topDialog() === id);
    stackListeners.add(update);
    update();
    return () => {
      stackListeners.delete(update);
      removeDialog(id);
    };
  }, [open, id]);

  // Move focus into the panel on open and restore it to whatever was focused
  // before (the trigger, or the parent dialog's control) on close
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    if (panel) {
      const focusable = getFocusable(panel);
      (focusable[0] ?? panel).focus();
    }
    return () => {
      previouslyFocused?.focus?.();
    };
  }, [open]);

  // Trap Tab within the panel and close on Escape, but only for the topmost
  // dialog so a parent never steals the interaction from a child
  useEffect(() => {
    if (!open || !isTop) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (!busy) {
          event.stopPropagation();
          onClose();
        }
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = getFocusable(panel);
      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey) {
        if (active === first || !panel.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !panel.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [open, isTop, busy, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
      {/* Backdrop */}
      <button
        type="button"
        tabIndex={-1}
        className="absolute inset-0 bg-black/50"
        onClick={() => {
          if (!busy) onClose();
        }}
        disabled={busy}
        aria-label="Close dialog"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={`relative w-full rounded-lg border border-border bg-card p-6 shadow-lg focus:outline-none${
          className ? ` ${className}` : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Dialog;

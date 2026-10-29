import { Loader2Icon } from "lucide-react";
import { useId } from "react";

import Dialog from "@/components/Dialog";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel: string;
  cancelLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * Reusable confirmation dialog
 * While loading, the backdrop and cancel are disabled and the dialog cannot be dismissed
 */
function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  destructive = false,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const titleId = useId();

  const confirmClassName = destructive
    ? "inline-flex items-center gap-2 rounded-md bg-destructive px-4 py-2 font-medium text-destructive-foreground text-sm transition-colors hover:bg-destructive/90 disabled:pointer-events-none disabled:opacity-50"
    : "inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50";

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      busy={loading}
      labelledBy={titleId}
      className="max-w-md"
    >
      <h2 id={titleId} className="mb-2 font-semibold text-lg">
        {title}
      </h2>

      {description && (
        <p className="mb-4 text-muted-foreground text-sm">{description}</p>
      )}

      <div className="mt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className={confirmClassName}
        >
          {loading && <Loader2Icon className="size-4 animate-spin" />}
          {confirmLabel}
        </button>
      </div>
    </Dialog>
  );
}

export default ConfirmDialog;

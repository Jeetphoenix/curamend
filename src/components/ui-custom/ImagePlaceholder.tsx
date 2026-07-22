import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  label: string;
  className?: string;
  /** aspect ratio, e.g. "4 / 5" or "16 / 9" */
  ratio?: string;
  rounded?: string;
};

export function ImagePlaceholder({
  label,
  className,
  ratio = "4 / 3",
  rounded = "rounded-2xl",
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      style={{ aspectRatio: ratio }}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-3 border-2 border-dashed border-violet/40 bg-violet/[0.06] p-6 text-center",
        rounded,
        className,
      )}
    >
      <ImageIcon className="h-10 w-10 text-violet/80" strokeWidth={1.5} />
      <span className="font-ui text-sm font-medium text-platinum/90">{label}</span>
      <span className="font-ui text-xs text-muted-ink">Upload image here</span>
    </div>
  );
}

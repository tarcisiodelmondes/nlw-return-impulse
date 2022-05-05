import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";
import { useState } from "react";
import { Loading } from "./Loading";

interface ScreenshotButtonProps {
  onScreenshotTook: (screenshot: string | null) => void;
  screenshot: string | null;
}

export function ScreenshotButton({
  onScreenshotTook,
  screenshot,
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector("html")!);
    const base64image = canvas.toDataURL("image/png");

    onScreenshotTook(base64image);

    setIsTakingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        onClick={() => onScreenshotTook(null)}
        className={`
            p-1  w-10  h-10 rounded-md border-transparent
            flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors
        `}
        style={{ backgroundImage: `url(${screenshot}` }}
      >
        <Trash weight="fill" />
      </button>
    );
  }

  return (
    <button
      onClick={handleTakeScreenshot}
      disabled={isTakingScreenshot}
      type="button"
      className={`
        p-2 bg-zinc-800 hover:bg-zinc-700 rounded-md border-transparent
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-offset-zinc-900 focus:ring-brand-500
        transition-colors disable:opacity-50 disabled:hover:bg-zinc-800
  `}
    >
      {isTakingScreenshot ? (
        <Loading />
      ) : (
        <Camera className="w-6 h-6 text-zinc-100" />
      )}
    </button>
  );
}

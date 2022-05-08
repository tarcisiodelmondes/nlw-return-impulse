import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../../ScreenshotButton";
import { Loading } from "../../Loading";
import { api } from "../../../lib/api";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: (value: boolean) => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleFeedbackComment(event: FormEvent) {
    event.preventDefault();

    setIsSendingFeedback(true);

    try {
      await api.post("feedback", {
        screenshot,
        comment,
        type: feedbackType,
      });

      setIsSendingFeedback(false);
      onFeedbackSent(true);
    } catch (error) {
      console.log(error);
      setIsSendingFeedback(false);
    }
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="h-4 w-4" />
        </button>

        <span className="flex items-center gap-2 font-medium text-xl leading-6">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleFeedbackComment} className="my-4 w-full">
        <textarea
          className={`
          min-w-[304px] w-full min-h-[112px] text-sm
          placeholder-zinc-400 text-zinc-100 bg-transparent
          border-zinc-600 rounded-md focus:border-brand-500
          focus:ring-brand-500 focus:ring-1 focus:outline-none
          resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent
          scrollbar-thin 
          `}
          placeholder="Teve uma ideia de melhoria ou de nova funcionalidade? Conta pra gente!"
          onChange={(event) => setComment(event.target.value)}
          value={comment}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />

          <button
            type="submit"
            disabled={comment.length <= 0 || isSendingFeedback}
            className={`
            p-2 bg-brand-500 rounded-md border-transparent flex flex-1
            justify-center items-center text-sm hover:bg-brand-300
            transition-colors disabled:opacity-50 disabled:hover:bg-brand-500
            fucus-border-style 
         `}
          >
            {isSendingFeedback ? <Loading /> : "Enviar feedback"}
          </button>
        </footer>
      </form>
    </>
  );
}

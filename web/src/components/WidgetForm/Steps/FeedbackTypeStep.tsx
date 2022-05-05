import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

interface FeedbackTypeStepProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void;
}

export function FeedbackTypeStep({
  onFeedbackTypeChanged,
}: FeedbackTypeStepProps) {
  return (
    <>
      <header>
        <span className="font-medium text-xl leading-6">
          Deixe seu feedback
        </span>

        <CloseButton />
      </header>

      <div className="flex my-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([key, feedback]) => {
          return (
            <button
              key={feedback.image.source}
              type="button"
              onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
              className={`
          flex flex-col items-center gap-2 w-24 flex-1 py-5 bg-zinc-800
          rounded-lg border-2 border-transparent hover:border-[#7B61FF]
          focus:border-[#7B61FF] focus:outline-none
        `}
            >
              <img src={feedback.image.source} alt={feedback.image.alt} />

              <span className="font-medium text-sm leading-6">
                {feedback.title}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

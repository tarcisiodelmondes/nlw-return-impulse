import { useState } from "react";

import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import otherImageUrl from "../../assets/thought.svg";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: "Imagem de uma largata de cor roxa.",
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrl,
      alt: "Imagem de uma lâmpada acesa de cor amarela.",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      source: otherImageUrl,
      alt: "Imagem de uma nuvem de pensamento de cor azul claro.",
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div
      className={`
      bg-zinc-900 rounded-2xl relative p-4 mb-4 flex
      items-center justify-center flex-col shadow-lg 
      w-[calc(100vw-2rem)] md:w-auto`}
    >
      {feedbackSent ? (
        <FeedbackSuccessStep
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={setFeedbackSent}
            />
          )}
        </>
      )}

      <footer className="mt-4 font-medium text-xs text-zinc-400">
        Feito com ♥ pela{" "}
        <a
          href="https://www.rocketseat.com.br"
          className="underline underline-offset-2"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  );
}

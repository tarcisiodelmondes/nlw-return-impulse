import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepository: FeedbackRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute({ comment, type, screenshot }: SubmitFeedbackUseCaseRequest) {
    if (!type) throw new Error("Type is required.");

    if (!comment) throw new Error("Comment is required.");

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format.");
    }

    await this.feedbackRepository.create({ comment, type, screenshot });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        '<div style="font-family: sans-serif; font-size: 16px;">',
        `<p>Tipo do feedback: <span style="color: #0aff91;">${type}</span></p>`,
        `<p>Comentário: ${comment}`,
        "</div>",
      ].join("\n"),
    });
  }
}

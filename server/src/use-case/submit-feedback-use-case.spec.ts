import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  {
    create: createFeedbackSpy,
  },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    const dataMock = {
      comment: "fake comment",
      type: "BUG",
      screenshot: undefined,
    };

    await expect(submitFeedback.execute(dataMock)).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalledWith(dataMock);
    expect(createFeedbackSpy).toHaveBeenCalled();
  });

  it("should not be able to submit feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        comment: "fake comment",
        type: "",
        screenshot: undefined,
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        comment: "",
        type: "BUG",
        screenshot: undefined,
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        comment: "fake comment",
        type: "BUG",
        screenshot: "image.png",
      })
    ).rejects.toThrow();
  });
});

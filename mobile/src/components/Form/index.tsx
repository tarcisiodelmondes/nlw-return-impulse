import { ArrowLeft } from "phosphor-react-native";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { captureScreen } from "react-native-view-shot";
import { api } from "../../lib/api";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Button } from "../Button";
import { ScreenshotButton } from "../ScreenshotButton";
import { FeedbackType } from "../Widget";
import * as FileSystem from "expo-file-system";

import { styles } from "./styles";

interface FormProps {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
}: FormProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [comment, setComment] = useState("");

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleScreenshotTake() {
    try {
      const uri = await captureScreen({
        format: "png",
        quality: 0.8,
      });

      setScreenshot(uri);
    } catch (error) {
      console.log(error);
    }
  }

  function handleScreenshotRemove() {
    setScreenshot(null);
  }

  async function handleSendingFeedback() {
    if (isSendingFeedback) return;

    let screenshotBase64 = null;

    setIsSendingFeedback(true);

    if (screenshot) {
      screenshotBase64 = await FileSystem.readAsStringAsync(screenshot, {
        encoding: "base64",
      });
    }

    try {
      await api.post("/feedback", {
        type: feedbackType,
        comment,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
      });

      onFeedbackSent();
    } catch (error) {
      console.log(error);
      setIsSendingFeedback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />

          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput
        onChangeText={(text) => setComment(text)}
        value={comment}
        multiline
        style={styles.input}
        placeholder="Teve uma ideia de melhoria ou de nova funcionalidade? Conta pra gente!"
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onRemoveShot={handleScreenshotRemove}
          onTakeShot={handleScreenshotTake}
        />

        <Button
          isLoading={isSendingFeedback}
          onPress={handleSendingFeedback}
          disabled={isSendingFeedback}
        />
      </View>
    </View>
  );
}

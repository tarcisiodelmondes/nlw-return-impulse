import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import successImg from "../../assets/success.png";
import { Copyright } from "../Copyright";

import { styles } from "./styles";

interface SuccessProps {
  onRestartFeedback: () => void;
}

export function Success({ onRestartFeedback }: SuccessProps) {
  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />

      <Text style={styles.title}>Agradecemos o feedback</Text>

      <TouchableOpacity style={styles.button} onPress={onRestartFeedback}>
        <Text style={styles.buttonTitle}>Quero enviar outro</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}

import React from "react";
import {
  ImageProps,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  Image,
} from "react-native";

import { styles } from "./styles";

interface OptionProps extends TouchableOpacityProps {
  title: string;

  image: ImageProps;
}

export function Option({ title, image, ...rest }: OptionProps) {
  return (
    <TouchableOpacity {...rest} style={styles.container}>
      <Image style={styles.image} source={image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

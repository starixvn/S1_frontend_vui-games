"use client";

import { Container, Sprite, Stage, Text } from "@pixi/react";
import { BlurFilter, TextStyle } from "pixi.js";
import { useMemo } from "react";
const styles = new TextStyle({
  fill: "red",
});
export const SampleScreen = () => {
  const blurFilter = useMemo(() => new BlurFilter(4), []);

  return (
    <Stage width={300} height={300}>
      <Sprite
        image="https://pixijs.io/pixi-react/img/bunny.png"
        anchor={{ x: 0.5, y: 0.5 }}
      />

      <Container x={100} y={100}>
        <Text
          style={styles}
          text="Hello World"
          anchor={{ x: 0.5, y: 0.5 }}
          filters={[blurFilter]}
        />
      </Container>
    </Stage>
  );
};

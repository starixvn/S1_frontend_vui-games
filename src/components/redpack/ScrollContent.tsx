import { Container, Graphics, Text } from "@pixi/react";
import { ISize, TextStyle } from "pixi.js";
import RedPack, { REDPACK_RATIO } from "./RedPack";
import DebugLine from "@/utils/DebugLine";
import { useMemo } from "react";

type Props = {
  size: ISize;
};

const NUM_REDPACK = 6;
const NUM_PER_ROW = 3;
const DISPLAY_ROW = NUM_REDPACK / NUM_PER_ROW;
const NUM_SPACE = DISPLAY_ROW + 1;

export default function ScrollContent({ size, ...rest }: Props) {
  const redpackDimension = useMemo(() => {
    const redPackContainerParentRatio = 0.78;
    const redPackContainerHeight = size.height * redPackContainerParentRatio;
    // const spacePerUnit = redPackContainerHeight * 0;

    const redPackHeight = redPackContainerHeight / DISPLAY_ROW;
    //   (redPackContainerHeight - NUM_SPACE * spacePerUnit) / DISPLAY_ROW;

    const redPackSize = {
      height: redPackHeight,
      width: redPackHeight * REDPACK_RATIO,
    };

    const redPackContainerPos = {
      x: -size.width / 2,
      y:
        -size.height * 0.5 +
        size.height * (1 - redPackContainerParentRatio) +
        redPackHeight * 0.5,
    };

    return {
      //   spacePerUnit,
      redPackSize,
      redPackContainerPos,
    };
  }, [size.height, size.width]);

  const { redPackSize, redPackContainerPos } = redpackDimension;

  return (
    <Container {...rest}>
      {/* <DebugLine size={size} color="blue" /> */}
      <Text
        y={-size.height / 2 + 5}
        anchor={{ x: 0.5, y: 0 }}
        text={"Choose Your Lucky Angpao".toUpperCase()}
        style={
          new TextStyle({
            align: "center",
            fontFamily: "AvertaStd-Black",
            fontSize: 35,
            fill: "#950000",
            wordWrap: true,
            wordWrapWidth: size.width,
          })
        }
      />
      <Container {...redPackContainerPos}>
        {Array.from(Array(NUM_REDPACK), (_, i) => {
          return (
            <RedPack
              key={i}
              seal={i + 1}
              size={redPackSize}
              x={
                (i % NUM_PER_ROW) * (size.width / NUM_PER_ROW) +
                (size.width / NUM_PER_ROW) * 0.5
              }
              y={
                Math.floor(i / NUM_PER_ROW) * redPackSize.height
                // Math.floor(i / NUM_PER_ROW) *
                //   (redPackSize.height + spacePerUnit) +
                // spacePerUnit
              }
            />
          );
        })}
      </Container>
    </Container>
  );
}

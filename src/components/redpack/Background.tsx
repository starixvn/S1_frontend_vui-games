import { useWindowSize } from "@/utils/resize/ResizeProvider";
import { Sprite, TilingSprite, useApp } from "@pixi/react";

type Props = {};

export default function Background({}: Props) {
  const app = useApp();
  const { width, height } = useWindowSize();

  return (
    <Sprite image="./assets/redpack/bg.png" width={width} height={height} />
  );
}

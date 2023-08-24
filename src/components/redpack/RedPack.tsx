import { ISprite } from "@/type/pixi";
import { Container, PixiRef, Sprite, Text } from "@pixi/react";
import { gsap } from "gsap";
import { ISize, TextStyle, Texture } from "pixi.js";
import { useRef, useState } from "react";

import { PixiPlugin } from "gsap/PixiPlugin";
import * as PIXI from "pixi.js";

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

type Props = {
  size: ISize;
  seal: string;
} & IContainer;

export const REDPACK_RATIO = 180 / 230;
export const COVER_RATIO = 180 / 130;
const SEAL_RATIO = 0.5;

export default function RedPack({ size, seal, ...rest }: Props) {
  const lidHeight = size.width / COVER_RATIO;
  const sealRef = useRef<PixiRef<ISprite>>(null);
  const lidRef = useRef<PixiRef<ISprite>>(null);
  const lidOpenedShadowRef = useRef<PixiRef<ISprite>>(null);
  const [isOpened, setOpened] = useState(false);

  function openPack() {
    if (sealRef.current) {
      gsap.to(sealRef.current, {
        alpha: 0,
        y: 100,
      });

      gsap.to(lidRef.current, {
        pixi: { scaleY: -1 },
        duration: 1,
      });

      setOpened(true);

      requestAnimationFrame(() => {
        if (lidOpenedShadowRef.current) {
          gsap.to(lidRef.current, {
            pixi: { alpha: 0 },
            duration: 1,
          });
        }
      });
    }
  }

  return (
    <Container
      interactive
      pointerdown={() => {
        openPack();
      }}
      {...rest}
    >
      <Sprite
        anchor={{ x: 0.5, y: 0.5 }}
        image="assets/redpack/front.png"
        {...size}
      />
      <Sprite
        ref={lidOpenedShadowRef}
        y={-size.height * 0.43}
        width={size.width}
        image="assets/redpack/shadow.png"
      />
      <Container ref={lidRef} y={-size.height * 0.4}>
        <Sprite
          image="assets/redpack/cover.png"
          width={size.width}
          height={lidHeight}
          x={-size.width / 2}
        />
      </Container>
      <Container ref={sealRef}>
        <Sprite
          anchor={0.5}
          y={2} // balance the shadow at bottom
          width={size.width * SEAL_RATIO}
          height={size.width * SEAL_RATIO}
          image="assets/redpack/seal.png"
        />
        {seal && (
          <Text
            text={seal}
            anchor={0.5}
            style={
              new TextStyle({
                fill: "#e4901f",
                fontFamily: "AvertaStd-Black",
                fontSize: 30,
              })
            }
          />
        )}
      </Container>
    </Container>
  );
}

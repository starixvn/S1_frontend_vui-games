import { useWindowSize } from "@/utils/resize/ResizeProvider";
import { Container, PixiRef, Sprite, TilingSprite } from "@pixi/react";
import { Sprite as AnimatedSprite, Graphics } from "@pixi/react-animated";
import { ISize, Rectangle } from "pixi.js";
import { useEffect, useRef } from "react";
import { config, useSpring } from "react-spring";
import ScrollContent from "./ScrollContent";
import DebugLine from "@/utils/DebugLine";

type Props = {};

export default function Scroll({}: Props) {
  const { width, height } = useWindowSize();

  const bgWidth = Math.min(400, width);
  const bgHeight = Math.max(bgWidth / (668 / 900), bgWidth);

  const posY = bgHeight > height ? 10 : height / 2;
  const posX = bgWidth > width ? 10 : width / 2;

  const scrollSectionHeight = bgHeight * 0.8;

  return (
    <Container x={posX} y={0}>
      <BG
        y={posY + scrollSectionHeight * 0.2}
        size={{ width: bgWidth, height: scrollSectionHeight }}
      >
        <ScrollContent
          size={{ width: bgWidth - 40, height: scrollSectionHeight - 40 }}
        />
      </BG>
      <Sprite
        y={
          posY +
          scrollSectionHeight * 0.2 -
          scrollSectionHeight * 0.5 +
          ((bgWidth * 0.6) / (381 / 316)) * 0.07
        }
        anchor={{ x: 0.5, y: 1 }}
        image="assets/redpack/lion.png"
        width={bgWidth * 0.6}
        height={(bgWidth * 0.6) / (381 / 316)}
      />
    </Container>
  );
}

type IContainer = typeof Container;
interface BGProps extends IContainer {
  size: ISize;
}

const BG = ({ size, children, ...rest }: BGProps) => {
  const [spring, setSpring] = useSpring(() => ({
    height: 0,
    config: config.slow,
  }));

  useEffect(() => {
    setSpring({ height: size.height });
  }, [setSpring, size.height]);

  const mask = useRef<PixiRef<typeof Graphics>>(null);

  const contentPadding = 20;
  const contentSize = new Rectangle(
    -size.width / 2 + contentPadding,
    -size.height / 2 + contentPadding,
    size.width - contentPadding * 2,
    size.height - contentPadding * 2
  );

  const handlerWidth = size.width * 1.1;
  const handlerHeight = handlerWidth / (718 / 78);

  return (
    <Container {...rest}>
      {/* <DebugLine size={size} /> */}
      <Container mask={mask.current}>
        <Graphics
          x={-size.width / 2}
          y={-size.height / 2}
          draw={(g) => {
            g.clear();
            g.beginFill("#950101");
            g.drawRect(0, 0, size.width, size.height);
            g.endFill();
          }}
        />
        <TilingSprite
          tilePosition={0}
          image="assets/redpack/cut.jpg"
          tileScale={0.5}
          {...contentSize}
        />
        {children}
      </Container>
      <Graphics
        x={-size.width / 2}
        y={-size.height / 2}
        draw={(g) => {
          g.clear();
          g.beginFill(0x000000);
          g.drawRect(0, 0, size.width, size.height);
          g.endFill();
        }}
        ref={mask}
        {...spring}
      />
      <Sprite
        anchor={0.5}
        y={-size.height / 2}
        image="assets/redpack/scroll_head.png"
        width={handlerWidth}
        height={handlerHeight}
      />
      <AnimatedSprite
        anchor={0.5}
        y={spring.height.to(
          [0, size.height],
          [
            -size.height * 0.5,
            -size.height * 0.5 + size.height + 10,
          ]
        )}
        image="assets/redpack/scroll_head.png"
        width={handlerWidth}
        height={handlerHeight}
      />
    </Container>
  );
};

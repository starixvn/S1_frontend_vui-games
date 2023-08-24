"use client";

import useResize from "@/utils/useResize";
import { Sprite, Stage, TilingSprite, useApp } from "@pixi/react";
import React, { useEffect } from "react";
import Background from "./Background";
import ResizeProvider from "@/utils/resize/ResizeProvider";
import Scroll from "./Scroll";

type Props = {};

export default function RedPackGame({}: Props) {
  useEffect(() => {
    // app.resizeTo = window;
  }, []);

  return (
    <Stage
      options={{
        autoDensity: false,
        hello: true,
        resolution: Math.max(window.devicePixelRatio, 2),
        backgroundColor: 0xffffff,
        antialias: true,
      }}
    >
      <ResizeProvider>
        <Background />
        <Scroll />
      </ResizeProvider>
    </Stage>
  );
}

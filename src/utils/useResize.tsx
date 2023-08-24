import { useApp } from "@pixi/react";
import React, { useEffect, useState } from "react";

type Props = {};
const minWidth = 375;
const minHeight = 700;

export default function useResize() {
  const app = useApp();

  function getSize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate renderer and canvas sizes based on current dimensions
    const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
    const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
    const scale = scaleX > scaleY ? scaleX : scaleY;
    const width = windowWidth * scale;
    const height = windowHeight * scale;

    return { width, height };
  }

  function resize() {
    const { width, height } = getSize();
    // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
    //   app.view.style.width = `${windowWidth}px`;
    //   app.view.style.height = `${windowHeight}px`;
    app.renderer.view.style.width = `${window.innerWidth}px`;
    app.renderer.view.style.height = `${window.innerHeight}px`;
    window.scrollTo(0, 0);

    // Update renderer  and navigation screens dimensions
    app.renderer.resize(width, height);
    // app.renderer.render(app.stage);
  }

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
}

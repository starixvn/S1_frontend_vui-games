"use client";

import React, { useEffect } from "react";
import * as Puzzle from "@games/puzzling-potions/src/main";

type Props = {};

export default function PuzzlePage({}: Props) {
  useEffect(() => {
    Puzzle.init();
  }, []);

  return <div id="pixi-canvas"></div>;
}

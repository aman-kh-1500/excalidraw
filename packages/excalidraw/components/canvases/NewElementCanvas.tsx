import { useContext, useEffect, useRef } from "react";

import type { NonDeletedSceneElementsMap } from "@excalidraw/element/types";

import { AppPropsContext } from "../App";
import { isRenderThrottlingEnabled } from "../../reactUtils";
import { renderNewElementScene } from "../../renderer/renderNewElementScene";

import type {
  RenderableElementsMap,
  StaticCanvasRenderConfig,
} from "../../scene/types";
import type { AppState } from "../../types";
import type { RoughCanvas } from "roughjs/bin/canvas";

interface NewElementCanvasProps {
  appState: AppState;
  elementsMap: RenderableElementsMap;
  allElementsMap: NonDeletedSceneElementsMap;
  scale: number;
  rc: RoughCanvas;
  renderConfig: StaticCanvasRenderConfig;
}

const NewElementCanvas = (props: NewElementCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appProps = useContext(AppPropsContext);
  const canvasWidth = appProps.canvasSize?.width ?? props.appState.width;
  const canvasHeight = appProps.canvasSize?.height ?? props.appState.height;

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    renderNewElementScene(
      {
        canvas: canvasRef.current,
        scale: props.scale,
        newElement: props.appState.newElement,
        elementsMap: props.elementsMap,
        allElementsMap: props.allElementsMap,
        rc: props.rc,
        renderConfig: props.renderConfig,
        appState: props.appState,
      },
      isRenderThrottlingEnabled(),
    );
  });

  return (
    <canvas
      className="excalidraw__canvas"
      style={{
        width: canvasWidth,
        height: canvasHeight,
      }}
      width={canvasWidth * props.scale}
      height={canvasHeight * props.scale}
      ref={canvasRef}
    />
  );
};

export default NewElementCanvas;

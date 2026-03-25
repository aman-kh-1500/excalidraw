import clsx from "clsx";

import "./ToolIcon.scss";

import { PenModeIcon } from "./icons";

import type { ToolButtonSize } from "./ToolButton";

type PenModeIconProps = {
  title?: string;
  name?: string;
  checked: boolean;
  onChange?(): void;
  zenModeEnabled?: boolean;
  isMobile?: boolean;
  penDetected: boolean;
  isTouchScreen?: boolean;
};

const DEFAULT_SIZE: ToolButtonSize = "medium";

export const PenModeButton = (props: PenModeIconProps) => {
  if (!props.penDetected && !props.isTouchScreen) {
    return null;
  }

  return (
    <button
      className={clsx(
        "ToolIcon ToolIcon_type_button ToolIcon__penMode",
        `ToolIcon_size_${DEFAULT_SIZE}`,
        {
          "is-mobile": props.isMobile,
          "ToolIcon--selected": props.checked,
        },
      )}
      title={`${props.title}`}
      type="button"
      aria-label={props.title}
      aria-pressed={props.checked}
      onClick={props.onChange}
    >
      <div className="ToolIcon__icon">{PenModeIcon}</div>
    </button>
  );
};

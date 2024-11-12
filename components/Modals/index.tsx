import { classNames } from "@/utils/styling";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { ShowWhen } from "../Utils";

interface Props {
  children: ReactNode;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  size?: "md" | "lg" | "sm";
  className?: string;
  showCloseBtn?: boolean;
}

export function Modal({
  children,
  setShowModal,
  size,
  className,
  showCloseBtn = true,
}: Props) {
  function onClick() {
    setShowModal((prev) => !prev);
  }

  const closeBtn = (
    <button
      role="button"
      aria-label="Close"
      className="absolute appearance-none select-none top-1 right-1 p-2 text-foreground-500 rounded-full hover:bg-default-100 active:bg-default-200 tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2"
      type="button"
      onClick={onClick}
    >
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        width="1em"
      >
        <path d="M18 6L6 18M6 6l12 12"></path>
      </svg>
    </button>
  );

  return (
    <div tabIndex={-1}>
      <div
        className="z-50 bg-overlay/50 backdrop-opacity-disabled w-screen h-screen fixed inset-0"
        aria-hidden="true"
      />
      <div
        className="flex w-screen h-[100dvh] fixed inset-0 z-50 overflow-x-auto justify-center [--scale-enter:100%] [--scale-exit:100%] [--slide-enter:0px] [--slide-exit:80px] sm:[--scale-enter:100%] sm:[--scale-exit:103%] sm:[--slide-enter:0px] sm:[--slide-exit:0px] items-end sm:items-center bg-neutral-950/30 backdrop-blur-md"
        style={{
          opacity: 1,
          transform: "translateY(0px) scale(1) translateZ(0px)",
        }}
      >
        <section
          role="dialog"
          tabIndex={-1}
          className={classNames(
            "flex flex-col relative bg-black border-[1px] border-solid border-white/50 z-50 box-border outline-none sm:mx-6 sm:my-16 shadow-small overflow-y-hidden w-full mx-4 my-auto rounded-xl py-16 md:rounded-2xl shadow-input bg-neutral-900",
            size === "lg"
              ? "max-w-[40rem]"
              : size === "sm"
              ? "max-w-sm"
              : "max-w-[32rem]",
            className || ""
          )}
          id=":rh:"
          data-open="true"
          data-dismissable="true"
          aria-modal="true"
          aria-labelledby=":ri:"
          aria-describedby=":rj:"
        >
          <div
            style={{
              border: "0px",
              clip: "rect(0px, 0px, 0px, 0px)",
              clipPath: "inset(50%)",
              height: "1px",
              margin: "-1px",
              overflow: "hidden",
              padding: "0px",
              position: "absolute",
              width: "1px",
              whiteSpace: "nowrap",
            }}
          >
            <button
              id="react-aria5441171583-:rq:"
              aria-label="Dismiss"
              tabIndex={-1}
              style={{
                width: "1px",
                height: "1px",
              }}
            ></button>
          </div>

          <ShowWhen component={closeBtn} when={showCloseBtn} />
          {children}
        </section>
      </div>
    </div>
  );
}

export * from "./RegisterUsernameModal";

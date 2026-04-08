import * as React from "react";

type ContainerProps = React.PropsWithChildren<{ className?: string }>;

export function Container({ className, children }: ContainerProps) {
  const classes = ["mx-auto w-full max-w-6xl px-6", className]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}

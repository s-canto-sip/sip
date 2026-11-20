import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-[box-shadow,border-color,transform] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:opacity-50",
  {
    variants: {
      variant: {
        // primary pill — the single accent action
        // `text-[color:...]` (not `text-[#...]`) so tailwind-merge can't confuse it with the font-size utility
        accent:
          "rounded-full bg-accent text-[color:#04140f] text-[15px] hover:opacity-[.88] active:translate-y-px",
        // ghost pill
        ghost:
          "rounded-full border border-[rgba(255,255,255,.22)] bg-transparent text-bone text-[15px] hover:border-bone",
      },
      size: {
        default: "px-[24px] py-[14px]",
        sm: "px-[18px] py-[10px]",
        lg: "px-[24px] py-[14px]",
      },
    },
    defaultVariants: { variant: "accent", size: "default" },
  }
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & { className?: string };

// With `href` renders an <a> styled as a button — never nest a <button> inside an <a>.
export type ButtonProps = ButtonBaseProps &
  (
    | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  );

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));
    if (props.href !== undefined) {
      return (
        <a
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      );
    }
    return (
      <button
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

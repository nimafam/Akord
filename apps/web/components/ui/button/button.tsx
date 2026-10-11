import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    [
        "group/button",
        "inline-flex",
        "shrink-0",
        "items-center",
        "justify-center",
        "whitespace-nowrap",
        "rounded-md",
        "border",
        "border-transparent",
        "bg-clip-padding",
        "text-sm",
        "font-medium",
        "outline-none",
        "select-none",
        "cursor-pointer",
        "transition-all",
        "duration-200",
        "ease-out",

        "focus-visible:border-ring",
        "focus-visible:ring-3",
        "focus-visible:ring-ring/50",

        "active:not-aria-[haspopup]:translate-y-px",

        "disabled:pointer-events-none",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",

        "aria-invalid:border-destructive",
        "aria-invalid:ring-3",
        "aria-invalid:ring-destructive/20",

        "dark:aria-invalid:border-destructive/50",
        "dark:aria-invalid:ring-destructive/40",

        "[&_svg]:pointer-events-none",
        "[&_svg]:shrink-0",
        "[&_svg:not([class*='size-'])]:size-4",
    ],
    {
        variants: {
            variant: {
                primary:
                    "bg-primary text-primary-foreground hover:brightness-90",

                secondary:
                    "bg-secondary text-secondary-foreground hover:brightness-90",

                accent:
                    "bg-accent text-accent-foreground hover:brightness-95",

                outline:
                    "border-border bg-background shadow-xs hover:bg-muted hover:text-foreground",

                ghost:
                    "bg-transparent text-foreground hover:bg-muted hover:text-primary",

                link:
                    "h-auto rounded-none border-0 bg-transparent p-0 text-primary shadow-none underline-offset-4 hover:text-secondary hover:underline",

                plain:
                    "h-auto rounded-none border-0 bg-transparent p-0 text-foreground shadow-none hover:text-primary",
                destructive:
                    "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40"
            },

            size: {
                default:
                    "h-9 gap-1.5 px-4",

                xs:
                    "h-7 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",

                sm:
                    "h-8 gap-1.5 px-3",

                lg:
                    "h-11 gap-2 px-6 text-base",

                icon:
                    "size-9",

                "icon-xs":
                    "size-7",

                "icon-sm":
                    "size-8",

                "icon-lg":
                    "size-11",
            },
        },

        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
);

function Button({
    className,
    variant = "primary",
    size = "default",
    ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
    return (
        <ButtonPrimitive
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    )
}

export { Button, buttonVariants }

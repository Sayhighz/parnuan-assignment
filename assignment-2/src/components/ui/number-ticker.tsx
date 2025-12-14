import type { ComponentPropsWithoutRef } from "react"
import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  startValue?: number
  direction?: "up" | "down"
  delay?: number
  decimalPlaces?: number
  locale?: string
  currency?: string
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 1,
  className,
  decimalPlaces = 0,
  locale,
  currency,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === "down" ? value : startValue)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "0px" })

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(direction === "down" ? startValue : value)
      }, delay * 1)
      return () => clearTimeout(timer)
    }
  }, [motionValue, isInView, delay, value, direction, startValue])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          const formatter = currency
            ? new Intl.NumberFormat(locale || "th-TH", {
                style: "currency",
                currency,
              })
            : new Intl.NumberFormat(locale || "en-US", {
                minimumFractionDigits: decimalPlaces,
                maximumFractionDigits: decimalPlaces,
              });
          ref.current.textContent = formatter.format(Number(latest.toFixed(decimalPlaces)));
        }
      }),
    [springValue, decimalPlaces, locale, currency]
  )

  const initialFormatter = currency
    ? new Intl.NumberFormat(locale || "th-TH", {
        style: "currency",
        currency,
      })
    : new Intl.NumberFormat(locale || "en-US", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      });

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tracking-wider text-black tabular-nums dark:text-white",
        className
      )}
      {...props}
    >
      {initialFormatter.format(startValue)}
    </span>
  )
}

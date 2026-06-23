// Tiny className merger — avoids pulling in clsx for our scale
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

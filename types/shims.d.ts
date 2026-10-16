// Ambient modules so the library type-checks without a framework installed.
declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}

// next/link and next/image: real types come from `next` in the consuming app.
declare module "next/link" {
  import type { AnchorHTMLAttributes, ReactNode } from "react";
  const Link: (props: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children?: ReactNode }) => JSX.Element;
  export default Link;
}
declare module "next/image" {
  import type { ImgHTMLAttributes } from "react";
  const Image: (props: ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string; width?: number; height?: number }) => JSX.Element;
  export default Image;
}

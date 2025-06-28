/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"

interface ImgproxyLoaderProps {
  src: string
  width?: number
  height?: number
  quality?: number
}

export const imgproxyLoader = ({ src, width, height, quality }: ImgproxyLoaderProps) => {
  const options = `/s:${width ? width : 0}:${height ? height : 0}${quality ? `/q:${quality}` : ``}` // /sh:0.5
  return `${process.env.NEXT_PUBLIC_IMGPROXY_SERVER}${options}/src${src}`
}

const IMAGE_SIZES = [160, 320, 640, 960, 1280, 1920, 2560] as const
export type T_ImageSizes = (typeof IMAGE_SIZES)[number]

export const createImageSrc = (src: string, width: T_ImageSizes) => {
  return `${process.env.NEXT_PUBLIC_IMGPROXY_SERVER}/s:${width}:0/src${src}`
}

export const createImageSrcSet = (src: string, min?: T_ImageSizes, max?: T_ImageSizes) => {
  const minWidth = min ?? 160
  const maxWidth = max ?? 2560
  return IMAGE_SIZES.filter((width) => width >= minWidth && width <= maxWidth)
    .map((width) => `${process.env.NEXT_PUBLIC_IMGPROXY_SERVER}/s:${width}:0/src${src} ${width}w`)
    .join(", ")
}

export const createThumbnailSrc = (src: string) => {
  return `${process.env.NEXT_PUBLIC_IMGPROXY_SERVER}/s:150:0/src${src}`
}

export const createBlurCssUrl = (src: string) => {
  return `url(${process.env.NEXT_PUBLIC_IMGPROXY_SERVER}/s:320:0/bl:10/q:50/src${src})`
}

export const ImageOptimize = ({
  fetchSrc,
  fetchRemote = false,
  fetchWidth,
  srcSet,
  sizes,
  alt,
  loading = "lazy",
  decoding = "async",
  backgroundBlurLoad,
  ...props
}: {
  fetchSrc: string
  fetchRemote?: boolean
  fetchWidth?: T_ImageSizes
  srcSet?: {
    minWidth: T_ImageSizes
    maxWidth: T_ImageSizes
  }
  sizes?: string
  alt: string
  backgroundBlurLoad?: boolean
} & Omit<React.ComponentProps<"img">, "src" | "srcSet" | "sizes">) => {
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <img
      {...props}
      className={cn("size-full object-cover object-center select-none", props.className)}
      src={!fetchRemote && fetchWidth ? createImageSrc(fetchSrc, fetchWidth) : fetchSrc}
      srcSet={srcSet ? createImageSrcSet(fetchSrc, srcSet.minWidth, srcSet.maxWidth) : undefined}
      sizes={sizes}
      alt={alt}
      loading={loading}
      decoding={decoding}
      style={
        backgroundBlurLoad && !isLoaded
          ? {
              backgroundImage: createBlurCssUrl(fetchSrc),
              backgroundPosition: "center center",
              backgroundSize: "cover",
              ...props.style
            }
          : (props.style ?? undefined)
      }
      onLoad={() => setIsLoaded(true)}
    />
  )
}
ImageOptimize.displayName = "ImageOptimize"

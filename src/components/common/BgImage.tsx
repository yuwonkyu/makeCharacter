import Image from "next/image";

type BgImageProps = {
  src: string;
  alt?: string;
  overlay?: "top-bottom" | "full";
  className?: string;
  priority?: boolean;
  unoptimized?: boolean;
  sizes?: string;
};

export default function BgImage({
  src,
  alt = "",
  overlay = "full",
  className = "",
  priority = false,
  unoptimized = process.env.NODE_ENV === "development",
  sizes = "100vw",
}: BgImageProps) {
  return (
    <div className={`absolute inset-0 w-full h-full z-0 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
        unoptimized={unoptimized}
        sizes={sizes}
        draggable={false}
      />
      {overlay === "full" && (
        <div className="absolute inset-0 bg-black/50 z-10" />
      )}
      {overlay === "top-bottom" && (
        <>
          <div className="absolute top-0 left-0 w-full h-[20%] z-10 bg-gradient-to-b from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[20%] z-10 bg-gradient-to-t from-black/50 to-transparent" />
        </>
      )}
    </div>
  );
}

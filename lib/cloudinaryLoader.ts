
import { ImageLoaderProps } from "next/image";

const cloudinaryLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  if (src.startsWith("http")) {
    return src; // ✅ already a secure_url
  }

  const q = quality || 75;
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_${q},w_${width}/${src}`;
};

export default cloudinaryLoader;

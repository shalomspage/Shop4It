
interface CloudinaryUploadResult {
  event: string;
  info: {
    secure_url: string;
    [key: string]: unknown;
  };
}

interface Cloudinary {
  createUploadWidget: (
    options: Record<string, unknown>,
    callback: (error: Error | null, result: CloudinaryUploadResult) => void
  ) => { open: () => void };
}

declare global {
  interface Window {
    cloudinary?: Cloudinary;
  }
}

export {};


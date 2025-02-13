// import { generateComponents, generateUploadButton, generateUploadDropzone, generateUploader } from "@uploadthing/react";
import { generateUploadDropzone } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { generateUploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

// export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>();

// export const { Uploader } = generateUploader<OurFileRouter>()
// export const { UploadDropzone } = generateUploadDropzone<OurFileRouter>()

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const { uploadFiles } = generateReactHelpers<OurFileRouter>();

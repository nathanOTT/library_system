"use client";

import React, { useRef } from "react";
import {
  IKImage,
  IKVideo,
  ImageKitProvider,
  IKUpload,
  ImageKitContext,
} from "imagekitio-next";
import config from "@/lib/config";
import UploadIcon from "./icons/UploadIcon";
import { toast } from "@/hooks/use-toast";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Failed to authenticate: ${error.message}`);
  }
};
const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const iKUploadRef = useRef(null);
  const [file, setFile] = React.useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.error("Error uploading file", error);
    toast({
      title: "Error uploading file",
      description: `Error uploading file: ${error.message} Please try again.`,
      variant: "destructive",
    });
  };
  const onSuccess = (response: any) => {
    setFile(response);
    onFileChange(response.filePath);
    toast({
      title: "Image uploaded successfully",
      description: `File uploaded to ${response.filePath}`,
    });
  };
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="test-file-upload"
        className="object-contain hidden"
        ref={iKUploadRef}
        onError={onError}
        onSuccess={onSuccess}
      />
      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          if (iKUploadRef.current) {
            // @ts-ignore
            iKUploadRef.current?.click();
          }
        }}
      >
        <UploadIcon />
        <p className="text-gray-100">Upload a File</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && (
        <ImageKitContext.Consumer>
          {(context) => (
            <IKImage
              lqip={{ active: true }}
              path={file.filePath}
              width={300}
              height={300}
              className="object-contain"
              alt="Uploaded file"
            />
          )}
        </ImageKitContext.Consumer>
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;

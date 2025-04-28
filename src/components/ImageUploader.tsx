"use client";

import type React from "react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  imagePreview: string | null;
  isLoading?: boolean;
}

export function ImageUploader({
  onImageChange,
  imagePreview,
  isLoading = false,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageChange(e.target.files[0]);
    }
  };

  const handleImageChange = (file: File) => {
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Please select an image less than 2MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file (JPG, PNG, GIF).");
      return;
    }
    onImageChange(file);
  };

  const handleRemoveImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onImageChange(null);
  };

  return (
    <div
      className={`flex h-64 w-full flex-col items-center justify-center rounded-md border-2 border-dashed p-4 transition-colors ${
        isDragging ? "border-green-500 bg-green-50" : "border-gray-300"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {imagePreview ? (
        <div className="relative h-full w-full">
          <img
            src={imagePreview || "/placeholder.svg"}
            alt="Article cover"
            className="h-full w-full object-contain"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="absolute right-2 bottom-2 border-[0.01rem]"
            onClick={handleRemoveImage}
            disabled={isLoading}
          >
            Change Image
          </Button>
        </div>
      ) : (
        <>
          <Upload className="mb-4 h-10 w-10 text-gray-400" />
          <p className="mb-2 text-sm font-medium">
            Drag and drop your image here, or click to select
          </p>
          <p className="text-xs text-gray-500">JPG, PNG or GIF. 2MB max.</p>
          <Button
            variant="outline"
            onClick={() => document.getElementById("article-image")?.click()}
            className="mt-4 border-[0.01rem]"
            type="button"
            disabled={isLoading}
          >
            Select Image
          </Button>
        </>
      )}
      <Input
        ref={fileInputRef}
        id="article-image"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
        disabled={isLoading}
      />
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import {
  Upload,
  X,
  Copy,
  Image,
  Check,
  AlertTriangle,
  Loader,
  RefreshCw,
} from "lucide-react";
import confetti from "canvas-confetti";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Refresh AOS when component state changes
    AOS.refresh();
  }, [file, preview, uploadResult, error]);

  // Trigger confetti on successful upload
  useEffect(() => {
    if (uploadResult) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  }, [uploadResult]);

  // Simulated progress for demo purposes
  useEffect(() => {
    let interval;
    if (isUploading) {
      setUploadProgress(0);
      interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + Math.random() * 10;
        });
      }, 300);
    } else if (uploadResult) {
      setUploadProgress(100);
    }

    return () => clearInterval(interval);
  }, [isUploading, uploadResult]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    setFile(selectedFile);
    setUploadResult(null);
    setError(null);
    setUploadStatus("");

    // Create a preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    if (!droppedFile.type.startsWith("image/")) {
      setError("Please drop an image file");
      return;
    }

    setFile(droppedFile);
    setUploadResult(null);
    setError(null);
    setUploadStatus("");

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(droppedFile);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image first");
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadStatus("Uploading to server...");

    const formData = new FormData();
    formData.append("image", file);

    try {
      // Simulating network delay for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      setUploadStatus("Processing response...");

      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text();
        throw new Error("Server returned an invalid response format");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      setUploadResult(data);
      setUploadStatus("Upload complete!");
    } catch (err) {
      setError(err.message || "An error occurred during upload");
      setUploadStatus("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setUploadResult(null);
    setError(null);
    setUploadStatus("");
    setUploadProgress(0);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="w-full" data-aos="fade-up" data-aos-delay="200">
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            isDragging
              ? "border-[#FEC563] bg-[#FEC563]/10"
              : error
              ? "border-red-500/50 bg-[#1E1E1F]"
              : "border-[#373737] bg-[#1E1E1F] hover:bg-[#282829]"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#53C7C0] mb-2">
                Image Upload
              </h2>
              <p className="text-gray-400 mb-6">
                Upload your images to get cdn link
              </p>

              <label
                htmlFor="image-upload"
                className="block mb-4 text-lg font-medium text-gray-300"
              >
                {preview
                  ? "Selected image:"
                  : "Select an image or drag and drop here:"}
              </label>

              <div className="mt-4 flex flex-col items-center">
                <input
                  type="file"
                  id="image-upload"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!preview && (
                  <div className="mb-6">
                    <div className="w-24 h-24 rounded-full bg-[#282829] flex items-center justify-center mb-4 mx-auto">
                      <Upload size={36} className="text-[#53C7C0]" />
                    </div>
                  </div>
                )}

                {preview && (
                  <div className="mt-6 mb-6">
                    <div className="flex justify-center">
                      <div className="relative group">
                        <div className="rounded-lg overflow-hidden shadow-lg border border-[#373737] bg-black/20">
                          <img
                            src={preview}
                            alt="Preview"
                            className="max-w-xs max-h-48 object-contain"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setPreview(null)}
                          className="absolute -top-2 -right-2 bg-[#1E1E1F] text-gray-400 hover:text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      {file?.name} ({(file?.size / 1024).toFixed(1)} KB)
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="px-6 py-3 text-sm font-medium text-white bg-[#53C7C0] rounded-lg shadow-md hover:bg-[#53C7C0]/90 focus:outline-none transition-all transform hover:scale-105"
                >
                  {preview ? (
                    <span className="flex items-center">
                      <RefreshCw size={16} className="mr-2" />
                      Choose Another Image
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Image size={16} className="mr-2" />
                      Browse Files
                    </span>
                  )}
                </button>

                {!preview && (
                  <p className="mt-4 text-sm text-gray-400">
                    or drag and drop your image here
                  </p>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-900/20 text-red-400 p-4 rounded-lg flex items-center">
                <AlertTriangle size={20} className="mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {uploadStatus && !error && (
              <div
                className={`p-4 rounded-lg ${
                  isUploading
                    ? "bg-blue-900/20 text-blue-400"
                    : uploadResult
                    ? "bg-green-900/20 text-green-400"
                    : "bg-[#282829] text-gray-400"
                }`}
              >
                <div className="flex items-center mb-2">
                  {isUploading ? (
                    <Loader size={20} className="mr-2 animate-spin" />
                  ) : uploadResult ? (
                    <Check size={20} className="mr-2" />
                  ) : (
                    <Image size={20} className="mr-2" />
                  )}
                  <span>{uploadStatus}</span>
                </div>

                {isUploading && (
                  <div className="w-full bg-[#1E1E1F] rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={!file || isUploading}
              className={`w-full py-3 px-4 rounded-lg shadow text-white font-medium transition-all transform hover:scale-105 ${
                !file || isUploading
                  ? "bg-[#373737] cursor-not-allowed"
                  : "bg-[#53C7C0] hover:bg-[#53C7C0]/90"
              }`}
            >
              {isUploading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Upload size={18} className="mr-2" />
                  Upload Image
                </span>
              )}
            </button>
          </form>
        </div>
      </div>

      {uploadResult && (
        <div
          className="bg-gradient-to-br from-[#282829] to-[#1E1E1F] p-8 rounded-xl shadow-xl border border-[#373737]"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h2 className="text-2xl font-bold text-[#27B173] mb-6 flex items-center">
            <Check className="h-6 w-6 mr-2" />
            Upload Successful!
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-medium text-gray-300 mb-2">Your CDN URL:</p>
              <div className="flex">
                <input
                  type="text"
                  value={
                    uploadResult.cdnUrl ||
                    "https://cdn.piclink.io/images/a7f3b9c2.jpg"
                  }
                  readOnly
                  className="flex-grow px-3 py-2 border border-[#373737] rounded-l-md bg-[#17171A] text-gray-300 text-sm focus:outline-none"
                />
                <button
                  onClick={() =>
                    copyToClipboard(
                      uploadResult.cdnUrl ||
                        "https://cdn.piclink.io/images/a7f3b9c2.jpg"
                    )
                  }
                  className="px-4 py-2 bg-[#53C7C0] hover:bg-[#53C7C0]/90 text-white font-medium rounded-r-md transition-colors flex items-center"
                >
                  {isCopied ? (
                    <span className="flex items-center">
                      <Check size={16} className="mr-1" />
                      Copied!
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Copy size={16} className="mr-1" />
                      Copy
                    </span>
                  )}
                </button>
              </div>

              <div className="mt-6">
                <p className="font-medium text-gray-300 mb-2">Image Details:</p>
                <div className="bg-[#1E1E1F] p-4 rounded-md text-sm text-gray-400">
                  <div className="grid grid-cols-2 gap-2">
                    <span>File name:</span>
                    <span className="text-gray-300">
                      {file?.name || "image.jpg"}
                    </span>

                    <span>Size:</span>
                    <span className="text-gray-300">
                      {file
                        ? (file.size / 1024).toFixed(1) + " KB"
                        : "240.5 KB"}
                    </span>

                    <span>Type:</span>
                    <span className="text-gray-300">
                      {file?.type || "image/jpeg"}
                    </span>

                    <span>Upload date:</span>
                    <span className="text-gray-300">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="font-medium text-gray-300 mb-2">Image from CDN:</p>
              <div className="bg-black/30 p-2 rounded-md border border-[#373737]">
                <img
                  src={uploadResult.cdnUrl || preview}
                  alt="Uploaded"
                  className="rounded-md shadow-md w-full h-64 object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = preview;
                  }}
                />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-[#FEC563] hover:bg-[#FEC563]/90 text-white rounded-lg transition-all transform hover:scale-105 font-medium flex items-center"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Upload Another
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadForm;

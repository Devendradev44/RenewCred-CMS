"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Media {
  _id: string;
  filename: string;
  url: string;
  createdAt: string;
}

export default function MediaPage() {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/media");
      setImages(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load images");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadImage = async () => {
    if (!file) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/media",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Image uploaded!");

      setFile(null);

      fetchImages();
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Media Library</h1>

      <div className="flex items-center gap-4 mb-8">
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFile(e.target.files ? e.target.files[0] : null)
          }
        />

        <button
          onClick={uploadImage}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div
            key={image._id}
            className="border rounded-lg shadow p-3"
          >
            <img
              src={`http://localhost:5000${image.url}`}
              alt={image.filename}
              className="w-full h-48 object-cover rounded"
            />

            <p className="text-sm mt-3 break-all">
              {image.filename}
            </p>
            
            <p className="text-xs text-gray-500 mt-1">
                {new Date(image.createdAt).toLocaleString()}
            </p>


            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `http://localhost:5000${image.url}`
                );
                toast.success("URL copied!");
              }}
              className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
            >
              Copy URL
            </button>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <p className="text-gray-500 mt-8 text-center">
          No images uploaded yet.
        </p>
      )}
    </div>
  );
}
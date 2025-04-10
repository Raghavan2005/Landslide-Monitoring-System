"use client";
import { useState } from 'react';
import { Upload, FileImage, CheckCircle, AlertCircle } from 'lucide-react';

export default function ImageUploadSection() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{ detected: boolean; message: string; filename: string } | null>(null);
  const [error, setError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      setSelectedImage(file);
      setError('');
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid image file');
      setSelectedImage(null);
      setPreviewUrl('');
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setIsLoading(true);
    setError('');
    setResults(null);

    try {
      // Simulate processing time
      await new Promise((res) => setTimeout(res, 1000));

      const fileName = selectedImage.name.toLowerCase();
      const isLandslide = fileName.includes('land');

      setResults({
        detected: isLandslide,
        message: isLandslide
          ? '🌋 Landslide detected in the image.'
          : '✅ No landslide detected in the image.',
        filename: selectedImage.name,
      });
    } catch (err) {
      console.error('Error analyzing image:', err);
      setError('Something went wrong while analyzing the image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <FileImage className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-700">Landslide Image Analysis</h2>
      </div>

      <div className="space-y-4">
        {/* Upload area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex flex-col items-center justify-center">
              <Upload className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-gray-600 mb-1">Drag and drop an image or click to browse</p>
              <p className="text-xs text-gray-500">JPG, PNG, GIF up to 10MB</p>
            </div>
          </label>
        </div>

        {/* Preview */}
        {previewUrl && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Selected image:</p>
            <div className="relative aspect-video w-full max-h-64 rounded-lg overflow-hidden bg-gray-100">
              <img src={previewUrl} alt="Preview" className="object-contain w-full h-full" />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center text-red-500 mt-2">
            <AlertCircle className="h-4 w-4 mr-1" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Upload button */}
        <button
          onClick={handleUpload}
          disabled={!selectedImage || isLoading}
          className={`w-full py-2 px-4 rounded-lg flex items-center justify-center ${
            !selectedImage || isLoading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isLoading ? (
            <>
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
              Analyzing...
            </>
          ) : (
            <>Analyze Image</>
          )}
        </button>

        {/* Results */}
        {results && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <CheckCircle
                className={`h-5 w-5 ${
                  results.detected ? 'text-red-500' : 'text-green-500'
                } mr-2`}
              />
              <h3 className="font-medium text-gray-700">Analysis Results</h3>
            </div>
            <div
              className={`p-3 rounded text-sm font-medium ${
                results.detected ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'
              }`}
            >
              {results.message}
            </div>
            <p className="text-xs text-gray-500 mt-1">File analyzed: {results.filename}</p>
          </div>
        )}
      </div>
    </div>
  );
}

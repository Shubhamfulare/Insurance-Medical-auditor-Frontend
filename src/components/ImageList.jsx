import React from "react";

export default function ImageList({ images }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Processed Images</h2>

      {images.length === 0 && ( 
        <p className="text-gray-600">No images processed yet.</p>
      )}

      <div className="space-y-4">
        {images.map((img, idx) => (
          <div key={idx} className="border p-4 rounded shadow-sm bg-gray-50">
            <p className="font-semibold">Image: {img.filename}</p>

            <img
              src={img.url}
              alt="uploaded"
              className="h-32 object-cover rounded mt-2"
            />

            <p className="mt-3 text-sm text-gray-700">
              <strong>Extracted Text:</strong>  
              {img.text ? img.text : "No text extracted"}
            </p>

            <p className="text-sm mt-1">
              <strong>Status:</strong> {img.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { postUploadImage } from "../api/analytics";

export default function ImageChatUpload() {
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [scale, setScale] = useState(1);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    // Show preview immediately in chat
    const previewMsg = {
      role: "user",
      type: "image",
      content: URL.createObjectURL(file),
    };

    setMessages((prev) => [...prev, previewMsg]);
  };

  // Upload image safely
  const uploadImage = async () => {
    if (!selectedFile) return;

    setLoading(true);

    try {
      // Create a copy of the file to avoid ERR_UPLOAD_FILE_CHANGED
      const fileCopy = new File([selectedFile], selectedFile.name, {
        type: selectedFile.type,
      });

      const formData = new FormData();
      formData.append("file", fileCopy);

      const response = await postUploadImage(formData);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          type: "structured",
          content: response?.claim,
          meta: {
            status: response?.claim.status,
            reason: response?.claim.reason,
            patient_id: response?.claim.patient_id,
            policy_number: response?.claim.policy_number,
          },
        },
      ]);

      // Clear selected file after upload succeeds
      setSelectedFile(null);
    } catch (err) {
      console.log('error  ddddddddd')
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          type: "structured",
          content: {
            error: 'Failed to process image',
          },
          meta: {}
        },
      ]);
    }

    setLoading(false);
  };

  const handleRetry = () => {
    uploadImage(); // or your API call
  };

  // Render structured assistant messages
  const renderAssistantMessage = (data) => {
    if (!data || typeof data !== "object") return null;

    return (
      <div className="space-y-3 text-sm">{console.log(data, 'datassssss')}

        {data?.error ?
          <div className="flex items-start justify-between gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            <div className="flex gap-2">
              <span className="text-red-500 text-base">⚠️</span>
              <span className="leading-5">{data?.error}</span>
            </div>

            <button
              onClick={handleRetry}
              className="shrink-0 text-xs font-medium text-red-600 hover:text-red-700 underline underline-offset-2"
            >
              Retry
            </button>
          </div>
          :
          <>
            <div className="text-xs font-semibold text-green-600">
              Claim Status: {data?.status || "UNKNOWN"}
            </div>
            <div className="font-semibold text-black">
              Claim Reason: {data?.reason || "UNKNOWN"}
            </div>
            {/* <div>Policy Number: {data?.policy_number || "UNKNOWN"}</div>
            <div>Patient Id: {data?.patient_id || "UNKNOWN"}</div> */}
            {data?.content && <div>contet: {data?.content || "UNKNOWN"}</div>}
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              {data &&
                Object.entries(data)
                  .filter(([label]) => !["status", "reason",'ocr_text','raw_text'].includes(label))
                  .map(([label, value]) => (
                    <div key={label} className="grid grid-cols-2 gap-3">
                      <span className="text-gray-600 font-medium capitalize">
                        {label.replace(/_/g, " ")}
                      </span>

                      <span className="text-gray-900">
                        {value === null || value === undefined
                          ? "—"
                          : typeof value === "object"
                            ? JSON.stringify(value)
                            : value}
                      </span>
                    </div>
                  ))}
            </div>
          </>
        }
      </div>
    );
  };

  // Handle Escape key to close preview
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setPreviewImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const steps = [
    "Analyzing...",
    "Thinking...",
    "Generating response...",
    "Finalizing..."
  ];

  const [stepIndex, setStepIndex] = useState(0);


  useEffect(() => {
    if (stepIndex >= steps.length - 1) return; // stop at Finalizing

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [stepIndex]);

  useEffect(() => {
    if (loading) {
      setStepIndex(0);
    }
  }, [loading]);

  return (
    <div className="w-full mx-auto border rounded-xl shadow-md min-h-[450px] h-[calc(100vh-200px)] flex flex-col overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`max-w-[75%] p-3 rounded-lg ${msg.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 border"
                }`}
            >
              {msg.type === "image" ? (
                <img
                  src={msg.content}
                  alt="preview"
                  className="rounded max-h-60 cursor-zoom-in"
                  onClick={() => {
                    setPreviewImage(msg.content);
                    setScale(1);
                  }}
                />
              ) : (
                renderAssistantMessage(msg.content)
              )}
            </div>
          </div>
        ))}

        {/* Loading animation */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border rounded-lg px-4 py-2 text-sm text-black flex items-center gap-3">
              🤖

              <div className="relative inline-block overflow-hidden font-medium">
                <span className="relative z-10 px-1 transition-opacity duration-300">
                  {steps[stepIndex]}
                </span>

                {/* Thought flow animation */}
                <span className="absolute top-0 left-[-50%] w-[200%] h-full pointer-events-none">
                  <span
                    className="absolute top-0 left-0 h-full w-6
            bg-gradient-to-r from-transparent via-blue-400/70 to-transparent
            blur-sm
            animate-[thinkflow_2.2s_ease-in-out_infinite]"
                  />
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t p-3 flex items-center gap-2 bg-white">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="flex-1 text-sm"
        />
        <button
          onClick={uploadImage}
          disabled={!selectedFile || loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>

      {/* Fullscreen Image Preview */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Full Preview"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => {
              e.preventDefault();
              setScale((prev) =>
                Math.min(3, Math.max(0.5, prev - e.deltaY * 0.001))
              );
            }}
            style={{ transform: `scale(${scale})` }}
            className="max-h-[90vh] max-w-[90vw] transition-transform duration-150 cursor-zoom-in"
          />

          <div className="absolute bottom-6 right-6 text-white text-sm">
            Zoom: {(scale * 100).toFixed(0)}%
          </div>
        </div>
      )}
    </div>
  );
}

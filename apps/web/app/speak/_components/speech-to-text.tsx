"use client";
import "regenerator-runtime/runtime";
import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function SpeechToText() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  return (
    <div className="p-4 space-y-4">
      <p>Microphone: {listening ? "🎙️ On" : "💤 Off"}</p>
      <div className="space-x-2">
        <button
          onClick={() => SpeechRecognition.startListening({ continuous: true })}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Start
        </button>
        <button
          onClick={SpeechRecognition.stopListening}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Stop
        </button>
        <button
          onClick={resetTranscript}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
      <div className="p-4 border rounded min-h-[100px] bg-slate-50">
        {transcript || "Speak into your mic to see text..."}
      </div>
    </div>
  );
}

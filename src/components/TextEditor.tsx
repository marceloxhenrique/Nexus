"use client";
import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextEditor = ({ value, onChange }: TextEditorProps) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }],
    ],
  };
  const { quill, quillRef } = useQuill({ modules });

  useEffect(() => {
    if (!quill) return;

    const handleChange = () => {
      onChange(quill.root.innerHTML);
    };

    quill.on("text-change", handleChange);

    return () => {
      quill.off("text-change", handleChange);
    };
  }, [quill]);

  useEffect(() => {
    if (value !== quill?.root.innerHTML) {
      quill?.clipboard.dangerouslyPasteHTML(value);
    }
  }, [value]);

  return (
    <div className="flex w-full flex-wrap rounded-md">
      <div
        ref={quillRef}
        className="overflow-wrap-anywhere w-full border-[0.01rem] border-gray-400"
      />
    </div>
  );
};
export default TextEditor;

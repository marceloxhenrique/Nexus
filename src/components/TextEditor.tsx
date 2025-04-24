"use client";

import { useState, useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TextEditor({
  value,
  onChange,
  placeholder = "Write your article content here...",
}: TextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (editorRef.current && value) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  // Update editor content when value changes from outside
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML && mounted) {
      editorRef.current.innerHTML = value;
    }
  }, [value, mounted]);

  const handleEditorChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value = "") => {
    document.execCommand(command, false, value);
    handleEditorChange();
    editorRef.current?.focus();
  };

  const handleHeadingFormat = (level: number) => {
    execCommand("formatBlock", `<h${level}>`);
  };

  const handleColorChange = (color: string) => {
    execCommand("foreColor", color);
  };

  const colors = [
    { name: "Black", value: "#000000" },
    { name: "Dark Gray", value: "#333333" },
    { name: "Gray", value: "#666666" },
    { name: "Green", value: "#15803d" },
    { name: "Blue", value: "#1d4ed8" },
    { name: "Red", value: "#b91c1c" },
    { name: "Purple", value: "#7e22ce" },
  ];

  return (
    <div className="rounded-md border">
      <div className="flex flex-wrap gap-1 border-b p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Type className="mr-1 h-4 w-4" />
              <span>Heading</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleHeadingFormat(1)}>
              <span className="text-xl font-bold">Heading 1</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleHeadingFormat(2)}>
              <span className="text-lg font-bold">Heading 2</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleHeadingFormat(3)}>
              <span className="text-md font-bold">Heading 3</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => execCommand("formatBlock", "<p>")}>
              <span>Normal Text</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="ghost"
          type="button"
          size="icon"
          onClick={() => execCommand("bold")}
          className="h-8 w-8"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          type="button"
          size="icon"
          onClick={() => execCommand("italic")}
          className="h-8 w-8"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          type="button"
          size="icon"
          onClick={() => execCommand("underline")}
          className="h-8 w-8"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <div className="mx-1 h-8 w-px bg-gray-200"></div>
        <Button
          variant="ghost"
          type="button"
          size="icon"
          onClick={() => execCommand("justifyLeft")}
          className="h-8 w-8"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          type="button"
          size="icon"
          onClick={() => execCommand("justifyCenter")}
          className="h-8 w-8"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          type="button"
          size="icon"
          onClick={() => execCommand("justifyRight")}
          className="h-8 w-8"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <div className="mx-1 h-8 w-px bg-gray-200"></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              type="button"
            >
              <Palette className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {colors.map((color) => (
              <DropdownMenuItem
                key={color.value}
                onClick={() => handleColorChange(color.value)}
              >
                <div className="flex items-center">
                  <div
                    className="mr-2 h-4 w-4 rounded-full"
                    style={{ backgroundColor: color.value }}
                  ></div>
                  <span>{color.name}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="prose prose-sm overflow-wrap-anywhere min-h-[300px] max-w-none p-4 focus:outline-none"
        onInput={handleEditorChange}
        onBlur={handleEditorChange}
      />
    </div>
  );
}

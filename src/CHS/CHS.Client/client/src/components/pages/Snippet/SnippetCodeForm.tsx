import React, { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import * as esprima from "esprima";
import * as escodegen from "escodegen";
import SnippetTextarea from "./SnippetTextarea"; // Adjust the import based on your file structure

interface SnippetTextareaProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

interface SnippetFormProps {
  setCodeOtherFile: (code: string) => void;
}

export default function SnippetForm({ setCodeOtherFile }: SnippetFormProps) {
  const [code, setCode] = useState<string>("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Function to format code using Esprima and Escodegen
  const formatCode = () => {
    try {
      if (!code) return;

      // Parse the code to an AST (Abstract Syntax Tree)
      const ast = esprima.parseScript(code, { tolerant: true, range: true });

      // Generate formatted code from the AST
      const formattedCode = escodegen.generate(ast, {
        format: {
          indent: {
            style: "  ", // 2 spaces indentation
            base: 0,
          },
          quotes: "single", // Use single quotes
          semicolons: true, // Add semicolons
          compact: false, // Use a readable format (not compact)
          newline: "\n", // Use newline characters
          preserveBlankLines: true, // Preserve blank lines
        },
      });

      // Set the formatted code
      setCode(formattedCode);
      setCodeOtherFile(formattedCode);
    } catch (error) {
      console.error("Formatting error:", error);
    }
  };

  // Handle code changes
  const handleCodeChange = (value: string) => {
    setCode(value);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      formatCode();
    }, 500); // Adjusted debounce time
  };

  // Handle blur event to auto format
  const handleBlur = () => {
    formatCode(); // Format on blur
  };

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="code" className="text-right">
        Kode
      </Label>
      <div className="col-span-3">
        <SnippetTextarea value={code} onChange={handleCodeChange} onBlur={handleBlur} />
      </div>
    </div>
  );
}
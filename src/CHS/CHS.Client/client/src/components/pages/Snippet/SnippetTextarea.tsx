import React from "react";
import { Textarea } from "@/components/ui/textarea";

type SnippetTextareaProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

const SnippetTextarea: React.FC<SnippetTextareaProps> = ({
  value,
  onChange,
  onBlur,
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <Textarea
      value={value}
      onChange={handleTextChange}
      onBlur={onBlur}
      className="w-full h-40"
      placeholder="Write your code here..."
    />
  );
};

export default SnippetTextarea;

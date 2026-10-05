import type { BaseSyntheticEvent, ChangeEvent } from "react";

export interface TextInputProps {
  className?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent) => void;
  onKeyDown?: (e: BaseSyntheticEvent) => void;
}

function TextInput({
  className,
  placeholder,
  value,
  onChange,
  onKeyDown,
}: TextInputProps) {
  return (
    <input
      type="text"
      className={className ?? "text-input"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

export default TextInput;

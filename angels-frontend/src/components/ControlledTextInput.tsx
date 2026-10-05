import {
  type BaseSyntheticEvent,
  type ChangeEvent,
  type ReactNode,
} from "react";
import TextInput from "./TextInput";

interface Props {
  className: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent) => void;
  onKeyDown: (e: BaseSyntheticEvent) => void;
  children?: ReactNode;
}

function ControlledTextInput({
  className,
  placeholder,
  value,
  onChange,
  onKeyDown,
  children,
}: Props) {
  return (
    <div>
      <TextInput
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {children && children}
    </div>
  );
}

export default ControlledTextInput;

"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "../../../lib/utils";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterSelectProps {
  /** The currently selected value */
  value?: string | undefined;
  /** Function to call when the value changes */
  onChange?: ((value: string) => void) | undefined;
  /** The list of options to display */
  options: FilterOption[];
  /** Optional placeholder text when no value is selected */
  placeholder?: string | undefined;
  /** Optional custom CSS classes for the trigger */
  className?: string | undefined;
  /** Optional id or name for the select */
  id?: string | undefined;
  /** Optional disabled state */
  disabled?: boolean | undefined;
}

/**
 * FilterSelect component for consistent dropdown filtering across data views.
 */
export function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
  className,
  id,
  disabled,
}: FilterSelectProps) {
  const safeValue = value === "" ? "_empty" : value;

  const handleValueChange = React.useCallback((v: string) => {
    if (onChange) {
      onChange(v === "_empty" ? "" : v);
    }
  }, [onChange]);

  return (
    <Select
      {...(safeValue !== undefined ? { value: safeValue } : {})}
      onValueChange={handleValueChange}
      {...(disabled !== undefined ? { disabled } : {})}
    >
      <SelectTrigger id={id} className={cn("bg-white", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options?.length ? (
          options?.map((option) => {
            const optValue = option.value === "" ? "_empty" : option.value;
            return (
              <SelectItem key={optValue} value={optValue}>
                {option.label}
              </SelectItem>
            );
          })
        ) : (
          <SelectItem value="_empty" disabled>
            No options available
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}

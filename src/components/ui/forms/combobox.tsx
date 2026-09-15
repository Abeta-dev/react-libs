"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../overlays/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../core/popover";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  value?: string;
  defaultValue?: string;
  options: ComboboxOption[];
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  disabled?: boolean;
  emptyText?: string;
  searchPlaceholder?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

export const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      value: valueProp,
      defaultValue,
      options = [],
      onChange,
      readOnly = false,
      placeholder = "Select an option",
      disabled = false,
      emptyText = "No options found.",
      searchPlaceholder,
      triggerClassName,
      contentClassName,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [uncontrolledValue, setUncontrolledValue] = React.useState<
      string | undefined
    >(defaultValue);

    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : uncontrolledValue;

    const initialControlledRef = React.useRef(isControlled);
    const hasWarnedRef = React.useRef(false);

    React.useEffect(() => {
      if (typeof process !== "undefined" && (process as { env?: { NODE_ENV?: string } }).env?.NODE_ENV !== "production") {
        if (initialControlledRef.current !== isControlled && !hasWarnedRef.current) {
          hasWarnedRef.current = true;
          const from = initialControlledRef.current ? "controlled" : "uncontrolled";
          const to = isControlled ? "controlled" : "uncontrolled";
          console.warn(
            `[react-libs] A component is changing an ${from} Combobox to be ${to}. ` +
            `This is likely caused by the value changing from undefined to a defined value (or vice versa). ` +
            `Decide between using a controlled or uncontrolled Combobox for the lifetime of the component.`
          );
        }
      }
    }, [isControlled]);

    React.useEffect(() => {
      if (typeof process !== "undefined" && (process as { env?: { NODE_ENV?: string } }).env?.NODE_ENV !== "production") {
        if (isControlled && !onChange && !readOnly) {
          console.warn(
            `[react-libs] You provided a \`value\` prop to <Combobox /> without an \`onChange\` handler. ` +
            `This will render a read-only field. If the field should be mutable use \`defaultValue\`. ` +
            `Otherwise, set either \`onChange\` or \`readOnly\`.`
          );
        }
      }
    }, [isControlled, onChange, readOnly]);

    const selectedOption = options.find((option) => option.value === value);

    const handleSelect = (optionValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(optionValue);
      }
      onChange?.(optionValue);
      setOpen(false);
    };

    return (
      <Popover modal={false} open={readOnly ? false : open} onOpenChange={(next) => { if (!readOnly) setOpen(next); }}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-readonly={readOnly || undefined}
            disabled={disabled}
            onKeyDown={(e) => {
              if (readOnly || disabled) return;
              if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !open) {
                e.preventDefault();
                setOpen(true);
              }
            }}
            className={cn(
              "w-full justify-between bg-white font-normal text-left dark:bg-slate-950 dark:border-slate-800",
              !selectedOption && "text-slate-500 dark:text-slate-400",
              triggerClassName
            )}
          >
            <span className="truncate">
              {selectedOption?.label ?? placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className={cn(
            "w-[var(--radix-popover-trigger-width)] p-0",
            contentClassName
          )}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <Command>
            <CommandInput
              placeholder={
                searchPlaceholder ?? `Search ${placeholder.toLowerCase()}...`
              }
            />
            <CommandList className="max-h-72 overflow-y-auto">
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    {...(option.disabled !== undefined ? { disabled: option.disabled } : {})}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="truncate">{option.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
Combobox.displayName = "Combobox";

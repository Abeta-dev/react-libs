import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MultiSelect, Option } from "../multi-select";

const options: Option[] = [
  { label: "Option Alpha", value: "alpha" },
  { label: "Option Beta", value: "beta" },
  { label: "Option Gamma", value: "gamma" },
];

describe("MultiSelect", () => {
  it("renders placeholder when no options are selected", () => {
    render(<MultiSelect options={options} placeholder="Pick elements" />);
    expect(screen.getByText("Pick elements")).toBeInTheDocument();
  });

  it("renders selected option badges", () => {
    render(<MultiSelect options={options} value={["alpha", "beta"]} readOnly />);
    expect(screen.getByText("Option Alpha")).toBeInTheDocument();
    expect(screen.getByText("Option Beta")).toBeInTheDocument();
  });

  it("toggles options on click from dropdown", () => {
    const handleChange = vi.fn();
    render(<MultiSelect options={options} value={["alpha"]} onChange={handleChange} />);

    const combobox = screen.getByRole("combobox");
    fireEvent.click(combobox);

    const betaOption = screen.getByText("Option Beta");
    fireEvent.click(betaOption);

    expect(handleChange).toHaveBeenCalledWith(["alpha", "beta"]);
  });

  it("handles remove tag button click", () => {
    const handleChange = vi.fn();
    render(<MultiSelect options={options} value={["alpha", "beta"]} onChange={handleChange} />);

    const removeBtn = screen.getByLabelText("Remove Option Alpha");
    fireEvent.click(removeBtn);

    expect(handleChange).toHaveBeenCalledWith(["beta"]);
  });

  it("handles clear all click", () => {
    const handleChange = vi.fn();
    render(<MultiSelect options={options} value={["alpha", "beta"]} onChange={handleChange} />);

    const clearBtn = screen.getByLabelText("Clear all selections");
    fireEvent.click(clearBtn);

    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it("respects disabled state", () => {
    render(<MultiSelect options={options} disabled placeholder="Disabled multi-select" />);
    const combobox = screen.getByRole("combobox");
    expect(combobox).toHaveAttribute("aria-disabled", "true");
  });

  describe("max selected limit", () => {
    it("prevents selecting more items when maxSelected limit is reached", () => {
      const handleChange = vi.fn();
      render(
        <MultiSelect
          options={options}
          value={["alpha", "beta"]}
          maxSelected={2}
          onChange={handleChange}
        />
      );

      const combobox = screen.getByRole("combobox");
      fireEvent.click(combobox);

      const gammaOption = screen.getByText("Option Gamma");
      fireEvent.click(gammaOption);

      // Should not call onChange because limit of 2 is reached
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("marks unselected options as aria-disabled when maxSelected is reached", () => {
      render(
        <MultiSelect
          options={options}
          value={["alpha", "beta"]}
          maxSelected={2}
          onChange={() => {}}
        />
      );

      const combobox = screen.getByRole("combobox");
      fireEvent.click(combobox);

      const listbox = screen.getByRole("listbox");
      const gammaItem = listbox.querySelector('[aria-disabled="true"]');
      expect(gammaItem).toBeInTheDocument();
      expect(gammaItem).toHaveTextContent("Option Gamma");
    });

    it("limits Select All to maxSelected items when configured", () => {
      const handleChange = vi.fn();
      render(
        <MultiSelect
          options={options}
          defaultValue={[]}
          maxSelected={2}
          onChange={handleChange}
        />
      );

      const combobox = screen.getByRole("combobox");
      fireEvent.click(combobox);

      const selectAllBtn = screen.getByRole("button", { name: /select all/i });
      fireEvent.click(selectAllBtn);

      expect(handleChange).toHaveBeenCalledWith(["alpha", "beta"]);
    });
  });

  describe("keyboard chip removal (Backspace)", () => {
    it("removes item when Backspace key is pressed on chip remove button", () => {
      const handleChange = vi.fn();
      render(
        <MultiSelect
          options={options}
          value={["alpha", "beta"]}
          onChange={handleChange}
        />
      );

      const removeBtn = screen.getByLabelText("Remove Option Alpha");
      fireEvent.keyDown(removeBtn, { key: "Backspace" });

      expect(handleChange).toHaveBeenCalledWith(["beta"]);
    });

    it("removes item when Delete key is pressed on chip remove button", () => {
      const handleChange = vi.fn();
      render(
        <MultiSelect
          options={options}
          value={["alpha", "beta"]}
          onChange={handleChange}
        />
      );

      const removeBtn = screen.getByLabelText("Remove Option Beta");
      fireEvent.keyDown(removeBtn, { key: "Delete" });

      expect(handleChange).toHaveBeenCalledWith(["alpha"]);
    });

    it("removes the last selected item when Backspace is pressed on trigger while closed", () => {
      const handleChange = vi.fn();
      render(
        <MultiSelect
          options={options}
          value={["alpha", "beta"]}
          onChange={handleChange}
        />
      );

      const combobox = screen.getByRole("combobox");
      fireEvent.keyDown(combobox, { key: "Backspace" });

      expect(handleChange).toHaveBeenCalledWith(["alpha"]);
    });
  });

  describe("readOnly mode", () => {
    it("has aria-readonly attribute and prevents item removal via chip button", () => {
      const handleChange = vi.fn();
      render(
        <MultiSelect
          options={options}
          value={["alpha", "beta"]}
          readOnly={true}
          onChange={handleChange}
        />
      );

      const combobox = screen.getByRole("combobox");
      expect(combobox).toHaveAttribute("aria-readonly", "true");

      const removeBtn = screen.getByLabelText("Remove Option Alpha");
      expect(removeBtn).toHaveAttribute("aria-disabled", "true");

      fireEvent.click(removeBtn);
      expect(handleChange).not.toHaveBeenCalled();

      fireEvent.keyDown(removeBtn, { key: "Backspace" });
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("prevents item addition in readOnly mode", () => {
      const handleChange = vi.fn();
      render(
        <MultiSelect
          options={options}
          value={["alpha"]}
          readOnly={true}
          onChange={handleChange}
        />
      );

      const combobox = screen.getByRole("combobox");
      fireEvent.click(combobox);

      const betaOption = screen.getByText("Option Beta");
      fireEvent.click(betaOption);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("does not warn about missing onChange when readOnly is true", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      render(
        <MultiSelect
          options={options}
          value={["alpha"]}
          readOnly={true}
        />
      );

      expect(warnSpy).not.toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });

  describe("controlled vs uncontrolled warning", () => {
    it("warns in non-production when switching from uncontrolled to controlled", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const { rerender } = render(
        <MultiSelect
          options={options}
          placeholder="Pick items"
        />
      );

      expect(warnSpy).not.toHaveBeenCalled();

      // Switch to controlled
      rerender(
        <MultiSelect
          options={options}
          value={["alpha"]}
          onChange={() => {}}
          placeholder="Pick items"
        />
      );

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("A component is changing an uncontrolled MultiSelect to be controlled")
      );

      warnSpy.mockRestore();
    });

    it("warns in non-production when controlled value is provided without onChange or readOnly", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      render(
        <MultiSelect
          options={options}
          value={["alpha"]}
        />
      );

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("You provided a `value` prop to <MultiSelect /> without an `onChange` handler")
      );

      warnSpy.mockRestore();
    });
  });
});

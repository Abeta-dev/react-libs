import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Combobox } from "../combobox";

describe("Combobox", () => {
  const options = [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
  ];

  it("renders with placeholder when no value is selected", () => {
    render(
      <Combobox
        options={options}
        onChange={() => {}}
        placeholder="Select framework"
      />
    );
    expect(screen.getByText("Select framework")).toBeInTheDocument();
  });

  it("renders selected option label", () => {
    render(
      <Combobox
        options={options}
        value="vue"
        onChange={() => {}}
      />
    );
    expect(screen.getByText("Vue")).toBeInTheDocument();
  });

  it("forwards ref to trigger button", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Combobox
        ref={ref}
        options={options}
        placeholder="Select framework"
      />
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toHaveAttribute("role", "combobox");
  });

  it("supports uncontrolled mode with defaultValue", () => {
    render(
      <Combobox
        options={options}
        defaultValue="svelte"
      />
    );
    expect(screen.getByText("Svelte")).toBeInTheDocument();
  });

  it("supports uncontrolled mode without value and onChange props", () => {
    render(
      <Combobox
        options={options}
        placeholder="Select framework"
      />
    );
    expect(screen.getByText("Select framework")).toBeInTheDocument();
  });

  describe("keyboard navigation", () => {
    it("navigates options via ArrowDown, ArrowUp and selects via Enter", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Combobox
          options={options}
          onChange={handleChange}
          placeholder="Select framework"
        />
      );
      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      const input = screen.getByPlaceholderText("Search select framework...");
      expect(input).toBeInTheDocument();

      // Navigate down to Vue
      await user.keyboard("{ArrowDown}");
      // Navigate down to Svelte
      await user.keyboard("{ArrowDown}");
      // Navigate up back to Vue
      await user.keyboard("{ArrowUp}");
      // Select Vue with Enter
      await user.keyboard("{Enter}");

      expect(handleChange).toHaveBeenCalledWith("vue");
      // Popover closes on select
      expect(screen.queryByPlaceholderText("Search select framework...")).not.toBeInTheDocument();
    });

    it("opens popover with ArrowDown when trigger button is focused", async () => {
      const user = userEvent.setup();
      render(
        <Combobox
          options={options}
          placeholder="Select framework"
        />
      );
      const trigger = screen.getByRole("combobox");
      trigger.focus();
      expect(trigger).toHaveFocus();

      await user.keyboard("{ArrowDown}");
      expect(screen.getByPlaceholderText("Search select framework...")).toBeInTheDocument();
    });

    it("closes popover when Escape key is pressed", async () => {
      const user = userEvent.setup();
      render(
        <Combobox
          options={options}
          placeholder="Select framework"
        />
      );
      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      expect(screen.getByPlaceholderText("Search select framework...")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      expect(screen.queryByPlaceholderText("Search select framework...")).not.toBeInTheDocument();
    });
  });

  describe("controlled vs uncontrolled warning", () => {
    it("warns in non-production when switching from uncontrolled to controlled", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const { rerender } = render(
        <Combobox
          options={options}
          placeholder="Select framework"
        />
      );

      expect(warnSpy).not.toHaveBeenCalled();

      // Switch to controlled by providing value
      rerender(
        <Combobox
          options={options}
          value="vue"
          onChange={() => {}}
          placeholder="Select framework"
        />
      );

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("A component is changing an uncontrolled Combobox to be controlled")
      );

      warnSpy.mockRestore();
    });

    it("warns in non-production when controlled value is provided without onChange or readOnly", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      render(
        <Combobox
          options={options}
          value="react"
        />
      );

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("You provided a `value` prop to <Combobox /> without an `onChange` handler")
      );

      warnSpy.mockRestore();
    });
  });

  describe("readOnly mode", () => {
    it("prevents popover from opening on click and has aria-readonly attribute", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Combobox
          options={options}
          value="react"
          readOnly={true}
          onChange={handleChange}
          placeholder="Select framework"
        />
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveAttribute("aria-readonly", "true");

      await user.click(trigger);
      expect(screen.queryByPlaceholderText("Search select framework...")).not.toBeInTheDocument();
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("prevents opening via keyboard ArrowDown in readOnly mode", async () => {
      const user = userEvent.setup();
      render(
        <Combobox
          options={options}
          value="react"
          readOnly={true}
          placeholder="Select framework"
        />
      );

      const trigger = screen.getByRole("combobox");
      trigger.focus();

      await user.keyboard("{ArrowDown}");
      expect(screen.queryByPlaceholderText("Search select framework...")).not.toBeInTheDocument();
    });

    it("does not emit missing onChange warning when readOnly is true", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      render(
        <Combobox
          options={options}
          value="react"
          readOnly={true}
        />
      );

      expect(warnSpy).not.toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });

  describe("search filtering and empty state", () => {
    it("filters options based on search input", async () => {
      const user = userEvent.setup();
      render(
        <Combobox
          options={options}
          placeholder="Select framework"
        />
      );

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      const input = screen.getByPlaceholderText("Search select framework...");
      await user.type(input, "Vue");

      expect(screen.getByText("Vue")).toBeInTheDocument();
      expect(screen.queryByText("React")).not.toBeInTheDocument();
      expect(screen.queryByText("Svelte")).not.toBeInTheDocument();
    });

    it("displays default empty text when no options match search query", async () => {
      const user = userEvent.setup();
      render(
        <Combobox
          options={options}
          placeholder="Select framework"
        />
      );

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      const input = screen.getByPlaceholderText("Search select framework...");
      await user.type(input, "Angular");

      expect(screen.getByText("No options found.")).toBeInTheDocument();
      expect(screen.queryByText("React")).not.toBeInTheDocument();
      expect(screen.queryByText("Vue")).not.toBeInTheDocument();
      expect(screen.queryByText("Svelte")).not.toBeInTheDocument();
    });

    it("displays custom emptyText when configured and no match is found", async () => {
      const user = userEvent.setup();
      render(
        <Combobox
          options={options}
          placeholder="Select framework"
          emptyText="No matching framework available."
        />
      );

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      const input = screen.getByPlaceholderText("Search select framework...");
      await user.type(input, "Ember");

      expect(screen.getByText("No matching framework available.")).toBeInTheDocument();
    });
  });
});


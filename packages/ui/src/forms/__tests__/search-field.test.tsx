import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchField } from "../search-field";

describe("SearchField", () => {
  it("renders with placeholder and handles onChange", () => {
    const handleChange = vi.fn();
    render(<SearchField value="" onChange={handleChange} placeholder="Search items..." />);

    const input = screen.getByPlaceholderText("Search items...");
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Sample Query" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("clears search input when clear button is clicked", () => {
    const handleClear = vi.fn();
    render(
      <SearchField
        value="Steel"
        onChange={() => {}}
        onClear={handleClear}
        placeholder="Search..."
      />
    );

    const clearButton = screen.getByRole("button", { name: /clear search/i });
    fireEvent.click(clearButton);

    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it("supports uncontrolled mode: reveals clear button on typing and clears value on click", () => {
    const handleClear = vi.fn();
    render(<SearchField onClear={handleClear} placeholder="Search items..." />);

    const input = screen.getByPlaceholderText("Search items...");
    expect(screen.queryByRole("button", { name: /clear search/i })).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Turbine" } });
    expect(input).toHaveValue("Turbine");

    const clearButton = screen.getByRole("button", { name: /clear search/i });
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("");
    expect(screen.queryByRole("button", { name: /clear search/i })).not.toBeInTheDocument();
  });

  it("supports uncontrolled mode with defaultValue", () => {
    render(<SearchField defaultValue="Initial Query" placeholder="Search..." />);

    const input = screen.getByPlaceholderText("Search...");
    expect(input).toHaveValue("Initial Query");
    expect(screen.getByRole("button", { name: /clear search/i })).toBeInTheDocument();
  });
});

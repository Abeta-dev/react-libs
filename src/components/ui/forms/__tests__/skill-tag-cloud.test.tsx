import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SkillTagCloud, SkillTag } from "../skill-tag-cloud";

describe("SkillTagCloud", () => {
  const sampleTags: SkillTag[] = [
    { id: "1", name: "Golang", level: "Expert", verified: true },
    { id: "2", name: "React 19", level: "Advanced" },
    { id: "3", name: "Kubernetes", level: "Intermediate" },
  ];

  it("renders skill tags and handles removal and addition via click", () => {
    const handleRemove = vi.fn();
    const handleAdd = vi.fn();

    render(
      <SkillTagCloud
        tags={sampleTags}
        onRemoveTag={handleRemove}
        onAddTag={handleAdd}
      />
    );

    expect(screen.getByText("Golang")).toBeInTheDocument();
    expect(screen.getByText("React 19")).toBeInTheDocument();
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();

    const removeBtn = screen.getByRole("button", { name: "Remove Golang" });
    fireEvent.click(removeBtn);
    expect(handleRemove).toHaveBeenCalledWith(expect.objectContaining({ name: "Golang" }));

    const input = screen.getByPlaceholderText(/Add skill/i);
    fireEvent.change(input, { target: { value: "PostgreSQL" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(handleAdd).toHaveBeenCalledWith("PostgreSQL");
    // Input should be reset
    expect(input).toHaveValue("");
  });

  it("adds a tag when pressing Enter key in input", () => {
    const handleAdd = vi.fn();
    render(<SkillTagCloud tags={sampleTags} onAddTag={handleAdd} />);

    const input = screen.getByPlaceholderText(/Add skill/i);
    fireEvent.change(input, { target: { value: "TypeScript" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(handleAdd).toHaveBeenCalledWith("TypeScript");
    expect(input).toHaveValue("");
  });

  it("does not trigger onAddTag when input contains only whitespace", () => {
    const handleAdd = vi.fn();
    render(<SkillTagCloud tags={sampleTags} onAddTag={handleAdd} />);

    const input = screen.getByPlaceholderText(/Add skill/i);
    const addBtn = screen.getByRole("button", { name: "Add" });

    // Initial state: button disabled
    expect(addBtn).toBeDisabled();

    // Spaces only
    fireEvent.change(input, { target: { value: "    " } });
    expect(addBtn).toBeDisabled();

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(handleAdd).not.toHaveBeenCalled();
  });

  it("trims whitespace from entered tag names", () => {
    const handleAdd = vi.fn();
    render(<SkillTagCloud tags={sampleTags} onAddTag={handleAdd} />);

    const input = screen.getByPlaceholderText(/Add skill/i);
    fireEvent.change(input, { target: { value: "   Docker Engine   " } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    expect(handleAdd).toHaveBeenCalledWith("Docker Engine");
  });

  it("renders distinct badge styling for each skill level", () => {
    const levelTags: SkillTag[] = [
      { name: "Expert Tag", level: "Expert" },
      { name: "Advanced Tag", level: "Advanced" },
      { name: "Intermediate Tag", level: "Intermediate" },
      { name: "Beginner Tag", level: "Beginner" },
      { name: "Default Tag" },
    ];

    const { container } = render(<SkillTagCloud tags={levelTags} />);
    const badges = container.querySelectorAll(".inline-flex.items-center");

    expect(badges[0]!.className).toContain("bg-purple-50");
    expect(badges[1]!.className).toContain("bg-emerald-50");
    expect(badges[2]!.className).toContain("bg-sky-50");
    expect(badges[3]!.className).toContain("bg-slate-100");
    expect(badges[4]!.className).toContain("bg-slate-100");
  });

  it("renders in readOnly mode without remove buttons or add form", () => {
    const handleRemove = vi.fn();
    render(
      <SkillTagCloud
        tags={sampleTags}
        readOnly={true}
        onRemoveTag={handleRemove}
      />
    );

    expect(screen.queryByRole("button", { name: /remove/i })).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/add skill/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Add" })).not.toBeInTheDocument();
  });

  it("displays 'No skills listed' when tags array is empty in readOnly mode", () => {
    render(<SkillTagCloud tags={[]} readOnly={true} />);
    expect(screen.getByText("No skills listed")).toBeInTheDocument();
  });

  it("hides the add tag input when tag count reaches maxTags", () => {
    const { rerender } = render(
      <SkillTagCloud tags={sampleTags} maxTags={3} />
    );

    // 3 tags with maxTags=3: input should be hidden
    expect(screen.queryByPlaceholderText(/add skill/i)).not.toBeInTheDocument();

    // Rerender with maxTags=4: input should be visible
    rerender(<SkillTagCloud tags={sampleTags} maxTags={4} />);
    expect(screen.getByPlaceholderText(/add skill/i)).toBeInTheDocument();
  });

  it("renders categoryLabel, custom placeholder, and passes custom HTML attributes", () => {
    render(
      <SkillTagCloud
        tags={sampleTags}
        categoryLabel="Core Competencies"
        placeholder="Type technology..."
        className="custom-tag-cloud"
        data-testid="skill-cloud-root"
      />
    );

    expect(screen.getByText("Core Competencies")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type technology...")).toBeInTheDocument();

    const root = screen.getByTestId("skill-cloud-root");
    expect(root).toHaveClass("custom-tag-cloud");
    expect(root).toHaveClass("space-y-2.5");
  });
});

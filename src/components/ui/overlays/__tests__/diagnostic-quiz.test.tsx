import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DiagnosticQuiz, QuizQuestion } from "../diagnostic-quiz";

describe("DiagnosticQuiz", () => {
  const sampleQuestions: QuizQuestion[] = [
    {
      id: "q-1",
      title: "What is your primary architectural focus?",
      category: "Architecture",
      options: [
        { label: "Frontend & Design Systems", trackAffinity: "frontend", weight: 2 },
        { label: "Distributed Systems & Cloud", trackAffinity: "backend", weight: 2 },
      ],
    },
    {
      id: "q-2",
      title: "Which language do you prefer for production?",
      category: "Languages",
      options: [
        { label: "TypeScript / React", trackAffinity: "frontend", weight: 1 },
        { label: "Rust / Go", trackAffinity: "backend", weight: 3 },
      ],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders active question and options with radio semantics", () => {
    render(
      <DiagnosticQuiz
        open={true}
        onOpenChange={vi.fn()}
        questions={sampleQuestions}
        onComplete={vi.fn()}
      />
    );

    expect(screen.getByText("What is your primary architectural focus?")).toBeInTheDocument();
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();

    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(2);
    expect(radios[0]).toHaveAttribute("aria-checked", "false");
    expect(radios[1]).toHaveAttribute("aria-checked", "false");

    // Select first option
    fireEvent.click(radios[0]!);
    expect(radios[0]).toHaveAttribute("aria-checked", "true");
  });

  it("navigates through questions and calculates recommended track", () => {
    const onComplete = vi.fn();
    render(
      <DiagnosticQuiz
        open={true}
        onOpenChange={vi.fn()}
        questions={sampleQuestions}
        onComplete={onComplete}
      />
    );

    // Q1: Select Backend
    const q1Radios = screen.getAllByRole("radio");
    fireEvent.click(q1Radios[1]!); // Backend (weight 2)

    // Next
    const nextBtn = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextBtn);

    // Q2: Select Backend
    expect(screen.getByText("Which language do you prefer for production?")).toBeInTheDocument();
    const q2Radios = screen.getAllByRole("radio");
    fireEvent.click(q2Radios[1]!); // Rust/Go (weight 3)

    // Complete & Recommend
    const completeBtn = screen.getByRole("button", { name: /complete & recommend/i });
    fireEvent.click(completeBtn);

    // Assert onComplete was called with highest scoring track (backend = 5)
    expect(onComplete).toHaveBeenCalledWith("backend", { backend: 5 });

    // Assert result view renders accessible DialogTitle
    expect(screen.getByRole("heading", { name: /recommended track: backend/i })).toBeInTheDocument();
    expect(screen.getByText(/diagnosis complete/i)).toBeInTheDocument();
  });

  it("allows retaking the quiz and resets progress", () => {
    render(
      <DiagnosticQuiz
        open={true}
        onOpenChange={vi.fn()}
        questions={sampleQuestions}
        onComplete={vi.fn()}
      />
    );

    // Select Q1 and proceed
    fireEvent.click(screen.getAllByRole("radio")[0]!);
    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    // Select Q2 and complete
    fireEvent.click(screen.getAllByRole("radio")[0]!);
    fireEvent.click(screen.getByRole("button", { name: /complete & recommend/i }));

    expect(screen.getByText(/recommended track:/i)).toBeInTheDocument();

    // Click Retake Quiz
    fireEvent.click(screen.getByRole("button", { name: /retake quiz/i }));

    // Should return to Q1
    expect(screen.getByText("What is your primary architectural focus?")).toBeInTheDocument();
    const radios = screen.getAllByRole("radio");
    expect(radios[0]).toHaveAttribute("aria-checked", "false");
  });

  it("handles empty questions array gracefully without crashing or NaN", () => {
    render(
      <DiagnosticQuiz
        open={true}
        onOpenChange={vi.fn()}
        questions={[]}
        onComplete={vi.fn()}
      />
    );

    expect(screen.getByText("No Questions Available")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /close/i })[0]).toBeInTheDocument();
  });
});

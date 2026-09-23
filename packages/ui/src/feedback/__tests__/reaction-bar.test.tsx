import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ReactionBar } from "../reaction-bar";

describe("ReactionBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("increments claps up to maxClapsPerUser", () => {
    const onClap = vi.fn();
    render(
      <ReactionBar
        initialClaps={5}
        maxClapsPerUser={2}
        onClap={onClap}
      />
    );

    const clapBtn = screen.getByRole("button", { name: /clap for this article/i });
    expect(clapBtn).toHaveTextContent("5");

    fireEvent.click(clapBtn);
    expect(onClap).toHaveBeenCalledWith(6);
    expect(clapBtn).toHaveTextContent("6");

    fireEvent.click(clapBtn);
    expect(onClap).toHaveBeenCalledWith(7);
    expect(clapBtn).toHaveTextContent("7");

    // Reached maxClapsPerUser limit (2 clicks)
    expect(clapBtn).toBeDisabled();
    fireEvent.click(clapBtn);
    expect(onClap).toHaveBeenCalledTimes(2);
  });

  it("toggles bookmark in uncontrolled and controlled modes", () => {
    const onToggleBookmark = vi.fn();
    const { rerender } = render(
      <ReactionBar onToggleBookmark={onToggleBookmark} />
    );

    const bookmarkBtn = screen.getByRole("button", { name: /bookmark article/i });
    fireEvent.click(bookmarkBtn);
    expect(onToggleBookmark).toHaveBeenCalledWith(true);

    // Controlled mode
    rerender(
      <ReactionBar
        isBookmarked={true}
        onToggleBookmark={onToggleBookmark}
      />
    );
    expect(screen.getByRole("button", { name: /remove bookmark/i })).toBeInTheDocument();
  });

  it("handles share and falls back to clipboard with accessible status", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      share: undefined,
      clipboard: { writeText },
    });

    render(
      <ReactionBar
        shareUrl="https://example.com/post-1"
        shareTitle="Great Article"
      />
    );

    const shareBtn = screen.getByRole("button", { name: /share article/i });
    await act(async () => {
      fireEvent.click(shareBtn);
    });

    expect(writeText).toHaveBeenCalledWith("https://example.com/post-1");
    expect(screen.getByRole("status")).toHaveTextContent("Link copied to clipboard");
  });

  it("calculates reading progress safely and handles totalHeight <= 0 without NaN", () => {
    // Test custom scroll element where scrollHeight <= innerHeight
    const mockElement = {
      scrollHeight: 500,
      getBoundingClientRect: () => ({ top: 0 }),
    } as unknown as HTMLElement;

    window.innerHeight = 800; // scrollHeight (500) <= innerHeight (800) -> totalHeight <= 0

    const targetRef = { current: mockElement };

    render(
      <ReactionBar
        scrollTargetRef={targetRef}
        showReadingProgress={true}
      />
    );

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "100");
    expect(screen.getByText("100% read")).toBeInTheDocument();
  });
});

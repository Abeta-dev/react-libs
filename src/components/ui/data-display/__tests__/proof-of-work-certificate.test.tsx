import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ProofOfWorkCertificate } from "../proof-of-work-certificate";

describe("ProofOfWorkCertificate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders recipient, project title, certificateId, issuer, and skills", () => {
    render(
      <ProofOfWorkCertificate
        certificateId="CERT-9988-XYZ"
        recipientName="Alice Engineer"
        projectTitle="Zero-Knowledge Rollup"
        issuerName="Crypto Academy"
        skills={["Rust", "ZkSNARKs", "Solidity"]}
      />
    );

    expect(screen.getByText("Alice Engineer")).toBeInTheDocument();
    expect(screen.getByText("Zero-Knowledge Rollup")).toBeInTheDocument();
    expect(screen.getByText("ID: CERT-9988-XYZ")).toBeInTheDocument();
    expect(screen.getByText("Crypto Academy")).toBeInTheDocument();
    expect(screen.getByText("Rust")).toBeInTheDocument();
    expect(screen.getByText("ZkSNARKs")).toBeInTheDocument();
    expect(screen.getByText("Solidity")).toBeInTheDocument();
  });

  it("renders recipient handle and custom issuer logo", () => {
    render(
      <ProofOfWorkCertificate
        certificateId="CERT-1234"
        recipientName="Bob Designer"
        recipientHandle="@bob_ux"
        projectTitle="Design Systems"
        issuerLogoUrl="https://example.com/logo.png"
        projectSlug="design-systems-course"
      />
    );

    expect(screen.getByText("@bob_ux")).toBeInTheDocument();
    const logo = screen.getByRole("img", { name: "Abeta Studio & Open Lab" });
    expect(logo).toHaveAttribute("src", "https://example.com/logo.png");
    expect(screen.getByTitle("design-systems-course (CERT-1234)")).toBeInTheDocument();
  });

  it("triggers custom onPrint or window.print", () => {
    const onPrint = vi.fn();
    const { rerender } = render(
      <ProofOfWorkCertificate
        certificateId="CERT-PRINT"
        recipientName="Charlie"
        projectTitle="Printing Milestone"
        onPrint={onPrint}
      />
    );

    const printBtn = screen.getByRole("button", { name: /print/i });
    fireEvent.click(printBtn);
    expect(onPrint).toHaveBeenCalledTimes(1);

    // Test window.print fallback
    const windowPrintSpy = vi.fn();
    window.print = windowPrintSpy;
    rerender(
      <ProofOfWorkCertificate
        certificateId="CERT-PRINT"
        recipientName="Charlie"
        projectTitle="Printing Milestone"
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /print/i }));
    expect(windowPrintSpy).toHaveBeenCalledTimes(1);
  });

  it("copies link to clipboard and updates accessible status", async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
    });

    render(
      <ProofOfWorkCertificate
        certificateId="CERT-CLIPBOARD"
        recipientName="Dave"
        projectTitle="Clipboard Milestone"
        verificationUrl="https://verify.example.com/cert/123"
      />
    );

    const copyBtn = screen.getByRole("button", { name: /copy verification link/i });
    fireEvent.click(copyBtn);

    expect(writeText).toHaveBeenCalledWith("https://verify.example.com/cert/123");
    expect(screen.getByRole("button", { name: /copied/i })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Verification link copied to clipboard");

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByRole("button", { name: /copy verification link/i })).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("handles navigator.share success, cancellation, and fallback", async () => {
    const shareMock = vi.fn();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      share: shareMock,
      clipboard: { writeText },
    });

    // 1. Share success
    shareMock.mockResolvedValueOnce(undefined);
    render(
      <ProofOfWorkCertificate
        certificateId="CERT-SHARE"
        recipientName="Eve"
        projectTitle="Share Milestone"
      />
    );

    const shareBtn = screen.getByRole("button", { name: /share certificate/i });
    await act(async () => {
      fireEvent.click(shareBtn);
    });
    expect(shareMock).toHaveBeenCalledTimes(1);
    expect(writeText).not.toHaveBeenCalled();

    // 2. User cancels share sheet (AbortError) - must NOT fall back to copying
    const abortErr = new Error("Share cancelled");
    abortErr.name = "AbortError";
    shareMock.mockRejectedValueOnce(abortErr);

    await act(async () => {
      fireEvent.click(shareBtn);
    });
    expect(writeText).not.toHaveBeenCalled();

    // 3. Share fails with other error - should fall back to clipboard
    shareMock.mockRejectedValueOnce(new Error("Network error"));
    await act(async () => {
      fireEvent.click(shareBtn);
    });
    expect(writeText).toHaveBeenCalled();
  });

  it("hides action toolbar when showActions is false", () => {
    render(
      <ProofOfWorkCertificate
        certificateId="CERT-NO-ACTIONS"
        recipientName="Frank"
        projectTitle="No Actions"
        showActions={false}
      />
    );

    expect(screen.queryByRole("button", { name: /print/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /share/i })).not.toBeInTheDocument();
  });
});

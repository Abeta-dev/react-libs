import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FileUpload, FileItem } from "../file-upload";

describe("FileUpload", () => {
  it("renders upload dropzone with label and description", () => {
    render(
      <FileUpload
        label="Upload documents"
        description="PDF up to 5MB"
      />
    );
    expect(screen.getByText("Upload documents")).toBeInTheDocument();
    expect(screen.getByText("PDF up to 5MB")).toBeInTheDocument();
  });

  it("renders list of files with remove buttons", () => {
    const mockFiles: FileItem[] = [
      {
        id: "1",
        file: new File(["hello world"], "test.pdf", { type: "application/pdf" }),
      },
    ];
    const handleChange = vi.fn();

    render(
      <FileUpload
        value={mockFiles}
        onChange={handleChange}
      />
    );

    expect(screen.getByText("test.pdf")).toBeInTheDocument();
    const removeBtn = screen.getByRole("button", { name: /remove test\.pdf/i });
    fireEvent.click(removeBtn);
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it("handles file input change event", () => {
    const handleChange = vi.fn();
    render(<FileUpload onChange={handleChange} />);

    const input = screen.getByTestId("file-upload-input");
    const file = new File(["dummy content"], "invoice.png", { type: "image/png" });

    // Mock URL.createObjectURL
    global.URL.createObjectURL = vi.fn(() => "blob:http://localhost/dummy");

    fireEvent.change(input, { target: { files: [file] } });

    expect(handleChange).toHaveBeenCalled();
    const passedFiles = handleChange.mock.calls[0]![0];
    expect(passedFiles.length).toBe(1);
    expect(passedFiles[0]!.file.name).toBe("invoice.png");
  });

  it("displays custom error message", () => {
    render(<FileUpload error="File is corrupted" />);
    expect(screen.getByText("File is corrupted")).toBeInTheDocument();
  });

  it("respects disabled state", () => {
    render(<FileUpload disabled label="Disabled upload" />);
    const dropzone = screen.getByRole("button");
    expect(dropzone).toHaveAttribute("aria-disabled", "true");
  });

  describe("drag-and-drop events", () => {
    it("updates visual state on dragEnter, dragOver, dragLeave, and handles drop", () => {
      const handleChange = vi.fn();
      global.URL.createObjectURL = vi.fn(() => "blob:http://localhost/dummy");

      render(<FileUpload onChange={handleChange} label="Dropzone Area" />);
      const dropzone = screen.getByRole("button");

      // dragEnter adds active dragging styles
      fireEvent.dragEnter(dropzone);
      expect(dropzone.classList.contains("border-primary")).toBe(true);
      expect(dropzone.classList.contains("bg-primary/5")).toBe(true);

      // dragOver maintains active dragging styles
      fireEvent.dragOver(dropzone);
      expect(dropzone.classList.contains("border-primary")).toBe(true);

      // dragLeave clears active dragging styles
      fireEvent.dragLeave(dropzone);
      expect(dropzone.classList.contains("border-primary")).toBe(false);
      expect(dropzone.classList.contains("bg-primary/5")).toBe(false);

      // drop processes files and resets dragging style
      const droppedFile = new File(["sample content"], "report.pdf", { type: "application/pdf" });
      fireEvent.drop(dropzone, {
        dataTransfer: {
          files: [droppedFile],
        },
      });

      expect(dropzone.classList.contains("border-primary")).toBe(false);
      expect(dropzone.classList.contains("bg-primary/5")).toBe(false);
      expect(handleChange).toHaveBeenCalled();
      const filesArg = handleChange.mock.calls[0]![0];
      expect(filesArg[0]!.file.name).toBe("report.pdf");
    });

    it("ignores drop event when disabled", () => {
      const handleChange = vi.fn();
      render(<FileUpload disabled onChange={handleChange} label="Disabled dropzone" />);
      const dropzone = screen.getByRole("button");

      const droppedFile = new File(["test"], "test.pdf", { type: "application/pdf" });
      fireEvent.drop(dropzone, {
        dataTransfer: {
          files: [droppedFile],
        },
      });

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("file rejection by file size and MIME type", () => {
    it("rejects file exceeding maxSize and renders alert message", () => {
      const handleChange = vi.fn();
      // 1024 bytes limit
      render(
        <FileUpload
          maxSize={1024}
          onChange={handleChange}
        />
      );

      const dropzone = screen.getByRole("button");
      const largeFile = new File(["x".repeat(2048)], "large-file.pdf", { type: "application/pdf" });

      fireEvent.drop(dropzone, {
        dataTransfer: {
          files: [largeFile],
        },
      });

      expect(handleChange).not.toHaveBeenCalled();
      const alert = screen.getByRole("alert");
      expect(alert).toHaveTextContent(/exceeds max allowed size/i);
      expect(alert).toHaveTextContent("large-file.pdf");
    });

    it("rejects file not matching MIME type specified in accept prop", () => {
      const handleChange = vi.fn();
      render(
        <FileUpload
          accept="image/png, image/jpeg"
          onChange={handleChange}
        />
      );

      const dropzone = screen.getByRole("button");
      const textFile = new File(["hello text"], "notes.txt", { type: "text/plain" });

      fireEvent.drop(dropzone, {
        dataTransfer: {
          files: [textFile],
        },
      });

      expect(handleChange).not.toHaveBeenCalled();
      const alert = screen.getByRole("alert");
      expect(alert).toHaveTextContent('File "notes.txt" is not an accepted file type');
    });

    it("accepts file matching wildcard MIME type in accept prop", () => {
      const handleChange = vi.fn();
      global.URL.createObjectURL = vi.fn(() => "blob:http://localhost/image-preview");

      render(
        <FileUpload
          accept="image/*"
          onChange={handleChange}
        />
      );

      const dropzone = screen.getByRole("button");
      const imageFile = new File(["image data"], "graphic.png", { type: "image/png" });

      fireEvent.drop(dropzone, {
        dataTransfer: {
          files: [imageFile],
        },
      });

      expect(handleChange).toHaveBeenCalled();
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("accepts file matching extension in accept prop and rejects non-matching", () => {
      const handleChange = vi.fn();
      render(
        <FileUpload
          accept=".pdf,.docx"
          onChange={handleChange}
        />
      );

      const dropzone = screen.getByRole("button");
      const invalidFile = new File(["archive data"], "backup.zip", { type: "application/zip" });

      fireEvent.drop(dropzone, {
        dataTransfer: {
          files: [invalidFile],
        },
      });

      expect(handleChange).not.toHaveBeenCalled();
      expect(screen.getByRole("alert")).toHaveTextContent('File "backup.zip" is not an accepted file type');
    });
  });

  describe("multiple file uploads and removal of individual files", () => {
    it("handles multiple file uploads simultaneously", () => {
      const handleChange = vi.fn();
      global.URL.createObjectURL = vi.fn(() => "blob:http://localhost/preview");

      render(<FileUpload multiple={true} onChange={handleChange} />);

      const file1 = new File(["file 1 content"], "first.pdf", { type: "application/pdf" });
      const file2 = new File(["file 2 content"], "second.png", { type: "image/png" });

      const dropzone = screen.getByRole("button");
      fireEvent.drop(dropzone, {
        dataTransfer: {
          files: [file1, file2],
        },
      });

      expect(handleChange).toHaveBeenCalled();
      const passedFiles: FileItem[] = handleChange.mock.calls[0]![0];
      expect(passedFiles.length).toBe(2);
      expect(passedFiles[0]!.file.name).toBe("first.pdf");
      expect(passedFiles[1]!.file.name).toBe("second.png");
    });

    it("removes an individual file while preserving other files", () => {
      const handleChange = vi.fn();
      const revokeSpy = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});

      const mockFiles: FileItem[] = [
        {
          id: "file-1",
          file: new File(["alpha"], "alpha.pdf", { type: "application/pdf" }),
          previewUrl: "blob:http://localhost/alpha",
        },
        {
          id: "file-2",
          file: new File(["beta"], "beta.pdf", { type: "application/pdf" }),
          previewUrl: "blob:http://localhost/beta",
        },
      ];

      render(<FileUpload value={mockFiles} onChange={handleChange} />);

      expect(screen.getByText("alpha.pdf")).toBeInTheDocument();
      expect(screen.getByText("beta.pdf")).toBeInTheDocument();

      const removeAlphaBtn = screen.getByRole("button", { name: /remove alpha\.pdf/i });
      fireEvent.click(removeAlphaBtn);

      expect(handleChange).toHaveBeenCalledWith([mockFiles[1]]);
      expect(revokeSpy).toHaveBeenCalledWith("blob:http://localhost/alpha");

      revokeSpy.mockRestore();
    });

    it("rejects multiple files when multiple=false", () => {
      const handleChange = vi.fn();
      render(<FileUpload multiple={false} onChange={handleChange} />);

      const file1 = new File(["1"], "1.pdf", { type: "application/pdf" });
      const file2 = new File(["2"], "2.pdf", { type: "application/pdf" });

      const dropzone = screen.getByRole("button");
      fireEvent.drop(dropzone, {
        dataTransfer: {
          files: [file1, file2],
        },
      });

      expect(handleChange).not.toHaveBeenCalled();
      expect(screen.getByRole("alert")).toHaveTextContent("Only single file upload is allowed");
    });

    it("rejects uploads exceeding maxFiles limit", () => {
      const handleChange = vi.fn();
      render(
        <FileUpload
          maxFiles={2}
          value={[
            { id: "1", file: new File(["1"], "existing.pdf", { type: "application/pdf" }) },
          ]}
          onChange={handleChange}
        />
      );

      const file2 = new File(["2"], "new1.pdf", { type: "application/pdf" });
      const file3 = new File(["3"], "new2.pdf", { type: "application/pdf" });

      const dropzone = screen.getByRole("button", { name: /click or drag files to upload/i });
      fireEvent.drop(dropzone, {
        dataTransfer: {
          files: [file2, file3],
        },
      });

      expect(handleChange).not.toHaveBeenCalled();
      expect(screen.getByRole("alert")).toHaveTextContent("You can only upload up to 2 files");
    });
  });
});

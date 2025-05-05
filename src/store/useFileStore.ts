import { create } from "zustand";

type FileStatus = "idle" | "uploading" | "done";

interface FileState {
  progress: number;
  uploadedBytes: number;
  status: FileStatus;
  error: string;

  setProgress: (value: number) => void;
  setUploadedBytes: (value: number) => void;
  setStatus: (value: FileStatus) => void;
  setError: (value: string) => void;
  reset: () => void;
}

export const useFileStore = create<FileState>((set) => ({
  progress: 0,
  uploadedBytes: 0,
  status: "idle",
  error: "",

  setProgress: (progress) => set({ progress }),
  setUploadedBytes: (uploadedBytes) => set({ uploadedBytes }),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      progress: 0,
      uploadedBytes: 0,
      status: "idle",
      error: "",
    }),
}));

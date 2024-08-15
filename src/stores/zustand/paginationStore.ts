import { create } from "zustand";

type PaginationState = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const usePaginationStore = create<PaginationState>((set) => ({
  currentPage: 1,
  setCurrentPage: (page: number) => set({ currentPage: page })
}));

export default usePaginationStore;

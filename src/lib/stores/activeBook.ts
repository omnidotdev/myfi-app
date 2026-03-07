import { create } from "zustand";
import { persist } from "zustand/middleware";

type ActiveBookStore = {
  activeBookId: string | null;
  setActiveBookId: (id: string | null) => void;
};

const useActiveBookStore = create<ActiveBookStore>()(
  persist(
    (set) => ({
      activeBookId: null,
      setActiveBookId: (id) => set({ activeBookId: id }),
    }),
    { name: "myfi-active-book" },
  ),
);

export default useActiveBookStore;

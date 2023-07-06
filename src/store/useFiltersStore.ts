import { create } from "zustand";

interface State {
  isLoading: boolean;
  error: any;
  filterClientName: string[];
  filterAgentsName: string[];
  filterTeamLeadsName: string[];
  filterOMsName: string[];
  filterCSMsName: string[];
  startingDateFilter: string;
  endingDateFilter: string;
}

interface Actions {
  addClientNames: (name: string[]) => void;
  addAgentsNames: (name: string[]) => void;
  addTeamLeadsNames: (name: string[]) => void;
  addOmsNames: (name: string[]) => void;
  addCsmsNames: (name: string[]) => void;
  addstartingdate: (date: string) => void;
  addendingdate: (date: string) => void;
}

const INITIAL_STATE: State = {
  isLoading: false,
  error: null,
  filterClientName: [],
  filterAgentsName: [],
  filterTeamLeadsName: [],
  filterOMsName: [],
  filterCSMsName: [],
  startingDateFilter: "",
  endingDateFilter: "",
};

export const useFiltersStore = create<State & Actions>((set) => ({
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  filterClientName: INITIAL_STATE.filterClientName,
  filterAgentsName: INITIAL_STATE.filterAgentsName,
  filterTeamLeadsName: INITIAL_STATE.filterTeamLeadsName,
  filterOMsName: INITIAL_STATE.filterOMsName,
  filterCSMsName: INITIAL_STATE.filterCSMsName,
  startingDateFilter: INITIAL_STATE.startingDateFilter,
  endingDateFilter: INITIAL_STATE.endingDateFilter,
  addClientNames: (name) => {
    try {
      return set((state) => ({
        isLoading: false,
        error: null,
        filterClientName: name,
      }));
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
  addAgentsNames: (name) => {
    try {
      return set((state) => ({
        isLoading: false,
        error: null,
        filterAgentsName: name,
      }));
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
  addTeamLeadsNames: (name) => {
    try {
      return set((state) => ({
        isLoading: false,
        error: null,
        filterTeamLeadsName: name,
      }));
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
  addOmsNames: (name) => {
    try {
      return set((state) => ({
        isLoading: false,
        error: null,
        filterOMsName: name,
      }));
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
  addCsmsNames: (name) => {
    try {
      return set((state) => ({
        isLoading: false,
        error: null,
        filterCSMsName: name,
      }));
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
  addstartingdate: (date) => {
    try {
      return set((state) => ({
        isLoading: false,
        error: null,
        startingDateFilter: date,
      }));
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
  addendingdate: (date) => {
    try {
      return set((state) => ({
        isLoading: false,
        error: null,
        endingDateFilter: date,
      }));
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));

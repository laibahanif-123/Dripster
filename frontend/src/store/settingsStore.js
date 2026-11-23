import { create } from "zustand";
import api from "../services/api";

export const useSettingsStore = create((set) => ({
  settings: {
    cafeName: "Dripster",
    location: "Mian Channu, Punjab, Pakistan",
    phone: "+92 300 0000000",
    email: "hello@dripster.pk",
    openingHours: "7:00 AM – 9:00 PM (Daily)",
    established: "2026",
    tagline: "Where Every Sip Hits The Spot",
    website: "https://dripster.pk",
  },
  loading: false,
  error: null,

  fetchSettings: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/settings");
      set({ settings: data, loading: false });
    } catch (err) {
      console.error("Failed to load settings from server:", err);
      set({ loading: false, error: "Failed to load settings." });
    }
  },

  updateSettings: async (newSettings) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.put("/settings", newSettings);
      set({ settings: data, loading: false });
      return { success: true, data };
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update cafe settings.";
      set({ loading: false, error: message });
      return { success: false, message };
    }
  },
}));

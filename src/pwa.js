import { registerSW } from "virtual:pwa-register";

export function initPWA() {
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      // Why: explicit user action prevents accidental reloads mid-ride
      const ok = window.confirm(
        "A new version of Gofera is available. Reload now?"
      );
      if (ok) updateSW();
    },
    onOfflineReady() {
      console.log("[PWA] App ready to work offline");
    },
  });
}

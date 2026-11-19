document.addEventListener("DOMContentLoaded", () => {
  const tabs = Array.from(document.querySelectorAll('.tab-grid [role="tab"]'));
  const panels = Array.from(document.querySelectorAll('.tab-panel[role="tabpanel"]'));

  if (!tabs.length || !panels.length) return;

  const activateTab = (targetKey, updateHash = true) => {
    const matchedTab = tabs.find((tab) => tab.dataset.tab === targetKey) || tabs[0];
    const activeKey = matchedTab.dataset.tab;

    tabs.forEach((tab) => {
      const isSelected = tab.dataset.tab === activeKey;
      tab.setAttribute("aria-selected", String(isSelected));
      tab.setAttribute("tabindex", isSelected ? "0" : "-1");
    });

    panels.forEach((panel) => {
      const isMatch = panel.id === `panel-${activeKey}`;
      panel.hidden = !isMatch;
      panel.classList.toggle("is-active", isMatch);
    });

    if (updateHash && window.history && window.history.replaceState) {
      window.history.replaceState(null, "", `#${activeKey}`);
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateTab(tab.dataset.tab, true);
    });

    tab.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + dir + tabs.length) % tabs.length;
      tabs[nextIndex].focus();
      activateTab(tabs[nextIndex].dataset.tab, true);
    });
  });

  // Cek jika URL dibuka langsung dengan hash tertentu (mis. #course, #bootcamp, #certification)
  const initialHash = window.location.hash.replace("#", "").toLowerCase();
  if (initialHash) {
    if (initialHash === "register-bootcamp") {
      activateTab("bootcamp", false);
    } else if (initialHash === "register-certification") {
      activateTab("certification", false);
    } else if (tabs.some((tab) => tab.dataset.tab === initialHash)) {
      activateTab(initialHash, false);
    }
  }
});

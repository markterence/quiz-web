import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', () => {
  /** Global error. App should show a banner indicating the error */
  const error = ref(null);

  /** Global error. App should not be rendered */
  const fatalError = ref(null);

  const ui = reactive({
    /** Whether the side list panel is collapsed */
    sideListPanelCollapsed: false,

    /** Whether the side list panel button is hovered */
    sideListPanelButtonHovered: false,
  });

  function toggleHoverOnSideListPanel(show: boolean | null = null) {
    if (show !== null)
      ui.sideListPanelButtonHovered = show;
    else
      ui.sideListPanelButtonHovered = !ui.sideListPanelButtonHovered;
  }

  return {
    error,
    fatalError,
    ui,

    /** Methods */
    toggleHoverOnSideListPanel,
  };
});

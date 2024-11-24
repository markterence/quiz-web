<script setup lang="ts">
import { useMouseInElement, useTimeoutFn } from '@vueuse/core';
import { SIDE_LIST_PANEL_CLOSE_DELAY } from '~/constants/constants';
import { useAppStore } from '~/store/app';

interface SideListPanelProps {
  /**
   * CSS Class for the header container in
   * any format. (String, String Array, Object, etc.)
   */
  headerContainerClass?: string | any[] | object

  /**
   * CSS Classes for the ScrollPanel.
   */
  scrollPanelClass?: string | any[] | object
}

interface SlotScopedProperties {
  /**
   * `true` when the panel is expanded.
   */
  isExpanded: boolean
}

const props = defineProps<SideListPanelProps>();

const emit = defineEmits<{
  /**
   * Emitted when the left-side panel has opened.
   */
  shown: []

  /**
   * Emitted when the panel is expanded or collapsed.
   * @param visible `true` when the panel is expanded, `false` when collapsed.
   */
  change: [visible: boolean]
}>();

defineSlots<{
  /**
   * Content to place in the right side of the panel.
   */
  default(props: SlotScopedProperties): any

  /**
   * Content to place in optional header of the panel
   */
  header(props: SlotScopedProperties): any

  /**
   * Content to place in the left side of the panel.
   */
  listContent(props: SlotScopedProperties): any
}>();

const appStore = useAppStore();

const sideListPanelButtonRef = ref(null);

// Composable way to check if the mouse is outside of an element
const { isOutside } = useMouseInElement(sideListPanelButtonRef, { handleOutside: false });

const isExpanded = computed(() => !appStore.ui.sideListPanelCollapsed);

// Vue friendly version of setTimeout with a reactive delay
const sideListPanelTimeoutAnimation = reactive(useTimeoutFn(() => {
  isOutside.value = true;

  if (isExpanded.value) {
    // Emit the 'shown' event when the panel is expanded
    emit('shown');
  }
}, SIDE_LIST_PANEL_CLOSE_DELAY));

function collapseSideListPanel() {
  appStore.ui.sideListPanelCollapsed = !appStore.ui.sideListPanelCollapsed;

  emit('change', isExpanded.value);
  sideListPanelTimeoutAnimation.start();
}

function getTooltipOptions() {
  return {
    value: isExpanded.value ? 'Collapse' : 'Expand',
    pt: {
      arrow: {
        style: {
          display: 'none',
        },
      },
      text: 'text-sm p-1 px-2',
    },
  };
}
</script>

<!--
  Example Usage:

  <SideListPanel>
    <template v-slot:header="{ isExpanded }">
      <MyContentHeader />
    </template>
    <template v-slot:listContent="{ isExpanded }">
      <MySideListContent />
    </template>
    <template>
      <MyReadContent />
    </template>
  </SideListPanel>
 -->
<template>
  <div class="flex" data-component-name="SideListPanel">
    <div
      class="transition-all duration-200 ease-linear"
      :class="{
        'w-24 h-full border-r-solid border-1 border-gray-200': !isExpanded,
        'h-[calc(100vh-48px-48px-4px)] w-[700px]  border-r-solid border-1 border-gray-200': isExpanded,
        'border-r-3 border-r-blue-500': !isOutside,
      }"
    >
      <div
        class="flex justify-end pt-3 mb-3"
        :class="props.headerContainerClass"
      >
        <slot name="header" :is-expanded="isExpanded" />

        <Button
          ref="sideListPanelButtonRef"
          v-tooltip="getTooltipOptions()"
          rounded
          size="small" bg="white hover:blue-500"
          class="shrink-0 h-10 w-10
          border border-solid border-black border-opacity-10
          text-slate-800
          hover:text-slate-100 hover:shadow-md -mr-5
          flex items-center justify-center"
          aria-label="Submit"
          @click="collapseSideListPanel"
        >
          <font-awesome-icon v-if="isExpanded" :icon="['fas', 'chevron-left']" />
          <font-awesome-icon v-else :icon="['fas', 'chevron-right']" />
        </Button>
      </div>

      <ScrollPanel :class="props.scrollPanelClass">
        <slot name="listContent" :is-expanded="isExpanded" />
      </ScrollPanel>
    </div>
    <slot :is-expanded="isExpanded" />
  </div>
</template>

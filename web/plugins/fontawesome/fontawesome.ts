import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Icon usage:
// `<font-awesome-icon :icon="['fas', 'peso-sign']"/>`

/* import specific icons */
import {
  faBars,
  faCaretDown,
  faCaretUp,
  faChevronLeft,
  faChevronRight,
  faCircle,
  faCircleDown,
  faCirclePlus,
  faClipboardList,
  faCoins,
  faCube,
  faDownload,
  faFile,
  faFileImage,
  faFileInvoice,
  faFileInvoiceDollar,
  faFileLines,
  faMagnifyingGlassArrowRight,
  faPenToSquare,
  faPesoSign,
  faServer,
  faSquareMinus,
  faTrashCan,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

import {
  faCircleXmark as farCircleXmark,
} from '@fortawesome/free-regular-svg-icons';

import type { App } from 'vue';

library.add(
  faBars,
  faCaretDown,
  faCaretUp,
  faChevronLeft,
  faChevronRight,
  faCircle,
  faCircleDown,
  faCirclePlus,
  faClipboardList,
  faCoins,
  faCube,
  faDownload,
  faFile,
  faFileImage,
  faFileInvoice,
  faFileInvoiceDollar,
  faFileLines,
  faMagnifyingGlassArrowRight,
  faPenToSquare,
  faPesoSign,
  faServer,
  faSquareMinus,
  faTrashCan,
  faUsers,
);

export default function registerFontAwesome(app: App) {
  app.component('FontAwesomeIcon', FontAwesomeIcon);
}

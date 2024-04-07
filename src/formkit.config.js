import { es } from "@formkit/i18n";
import { defaultConfig, plugin } from "@formkit/vue";
import { rootClasses } from "../formkit.theme.mjs";
import {
  createProPlugin,
  toggle,
  rating,
  autocomplete,
  mask,
} from "@formkit/pro";
import { genesisIcons } from "@formkit/icons";

const formkit_pro = import.meta.env.VITE_FORMKIT_PRO;
const pro = createProPlugin(formkit_pro, {
  toggle,
  rating,
  autocomplete,
  mask,
});

export default defaultConfig({
  locales: { es },
  locale: "es",
  config: {
    rootClasses,
  },
  plugins: [pro],
  icons: { ...genesisIcons },
});

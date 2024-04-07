import { es } from "@formkit/i18n";
import { defaultConfig } from "@formkit/vue";
import { rootClasses } from "../formkit.theme.mjs";
import { createProPlugin, inputs } from "@formkit/pro";

const formkit_pro = import.meta.env.VITE_FORMKIT_PRO;
const pro = createProPlugin(formkit_pro, inputs);

export default defaultConfig({
  locales: { es },
  locale: "es",
  config: {
    rootClasses,
  },
  plugins: [pro],
});

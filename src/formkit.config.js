import { es } from "@formkit/i18n";
import { defaultConfig } from "@formkit/vue";
import { rootClasses } from "../formkit.theme.mjs";

export default defaultConfig({
  locales: { es },
  locale: "es",
  config: {
    rootClasses,
  },
});
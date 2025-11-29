import type { AppProps } from "next/app";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Theme appearance="dark" accentColor="indigo" panelBackground="solid">
      <Component {...pageProps} />
    </Theme>
  );
}

import { config } from "@/config/config";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <meta property="og:title" content={`like and recast to claim`}/>
        <meta property="og:image" content={`${config.hostUrl}/image.png`}/>
        <meta property="fc:frame" content={`vNext`}/>
        <meta property="fc:frame:image" content={`${config.hostUrl}/image.png`}/>
        <meta property="fc:frame:post_url" content={`${config.hostUrl}/api/mint`}/>
        <meta property="fc:frame:button:1" content={`Get Started`}/>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

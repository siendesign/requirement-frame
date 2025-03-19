import { config } from "@/config/config";

interface ComputeHtmlParameters {
  postType: string;
  content: string;
  imagePath: string;
}

export const computeHtml = ({
  postType,
  content,
  imagePath,
}: ComputeHtmlParameters) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
        <title>${content}</title>
            <meta property="og:title" content='like and recast to claim'/>
            <meta property="og:image" content='${config.hostUrl}${imagePath}'/>
            <meta property="fc:frame" content='vNext'/>
            <meta property="fc:frame:image" content='${config.hostUrl}${imagePath}'/>
            <meta property="fc:frame:post_url" content='${config.hostUrl}/api/mint?=${postType}'/>
            <meta property="fc:frame:button:1" content='${content}'/>
        </head>
        <body>
           
            <p>${content}</p>
        </body>
    </html>
    `;
};

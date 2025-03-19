// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ThirdWebEngine } from "@/classes/ThirdWebEngine";
import { Warpcast } from "@/classes/warpcast";
import { computeHtml } from "@/utils/compute-html";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { z } from "zod";

const requestBodyWarpcastSchema = z.object({
  trustedData: z.object({
    messageBytes: z.string().min(5),
  }),
});

const requestQuerySchema = z.object({
  type: z.union([z.literal("start"), z.literal("recast"), z.literal("mint")]),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ["GET", "POST"],
    origin: "*",
  });

  if (req.method !== "POST") {
    return res.status(400).send({ error: "Method not allowed" });
  }

  try {
    const { type } = requestQuerySchema.parse(req.query);
    const { trustedData } = requestBodyWarpcastSchema.parse(req.body);

    const action = await Warpcast.validateMessage(trustedData.messageBytes);

    if (type === "start"){
      const isNFTOwned = await ThirdWebEngine.isNFTOwned(
        action.interactor.custody_address,
      );

      if(isNFTOwned){
        return res.status(200).send(
          computeHtml({
            imagePath: "/image.png",
            postType: "start",
            content: "you already have an NFT",
          })
        );
      }

      return res.status(200).send(
        computeHtml({
          imagePath: "/image.png",
          postType: "recast",
          content: "like and recast to claim",
        })
      );
    }

    if (type === "recast") {
      const hasRecasted = await Warpcast.hasRecasted(action.interactor.fid);

      if (!hasRecasted) {
        return res.status(200).send(
          computeHtml({
            imagePath: "/image.png",
            postType: "recast",
            content: "recast required to mint",
          })
        );
      }

      const hasliked = await Warpcast.hasLiked(action.interactor.fid);

      if (!hasliked) {
        return res.status(200).send(
          computeHtml({
            imagePath: "/image.png",
            postType: "recast",
            content: "like required to mint",
          })
        );
      }

      return res.status(200).send(
        computeHtml({
          imagePath: "/image.png",
          postType: "mint",
          content: "mint your NFT",
        })
      );
    }

    if (type === "mint") {
      await ThirdWebEngine.mintNFT(action.interactor.custody_address);

      return res.status(200).send(
        computeHtml({
          imagePath: "/image.png",
          postType: "start",
          content: "NFT minted. congratulations!",
        })
      );
    }

  } catch (error) {
    return res.status(200).send(
      computeHtml({
        imagePath: "/image.png",
        postType: "start",
        content: "something went wrong. please try again.",
      })
    );
  }
}

// import { config } from "@/config/config";
// import { z } from "zod";
// import { Engine } from '@thirdweb-dev/engine'



// const mintResponseSchema = z.object({
//   result: z.object({
//     queueId: z.string(),
//   }),
// });

// const ownedResponseSchema = z.object({
//   result: z.array(
//     z.object({
//       owner: z.string().startsWith("0x"),
//       type: z.string(),
//       supply: z.string(),
//     })
//   ),
// });

// const engine = new Engine({
//     url: config.thirdweb.engine.url as string,
//     accessToken: config.thirdweb.engine.accessToken as string,
     
// })

// export const fetchIsOwned = async(reciever: string)=>{
//     const response = await engine.erc721.getOwned(
//         reciever,
//         config.thirdweb.chainId.toString(),
//         config.contractAddress as string
      
//     )

//     return ownedResponseSchema.parse(response)
// }

// export const mintNFT = async (receiver: string) => {
//     const response = await engine.erc721.claimTo(
//         config.thirdweb.chainId.toString(),
//         receiver,
//         1,
//         config.thirdweb.chainId.toString()
//     )

//     return mintResponseSchema.parse(response)
// }

// export const httpFetchBalanceStatus = async () => {
//   const response = await fetch(
//     `${config.thirdweb.engine.url}/backend-wallet/${config.thirdweb.chainId}/${config.thirdweb.engine.wallet}/get-balance`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${config.thirdweb.engine.accessToken}`,
//         "x-backend-wallet-address": config.thirdweb.engine.wallet!,
//       },
//     }
//   );

//   const result = await response.json();

//   return balanceResponseSchema.parse(result);
// };

// export const httpFetchOwned = async (reciever: string) => {
//   const response = await fetch(
//     `${config.thirdweb.engine.url}/contract/${config.thirdweb.chainId}/${
//       config.contractAddress
//     }/erc721/get-owned?walletAddress=${reciever.toLowerCase()}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${config.thirdweb.engine.accessToken}`,
//         "x-backend-wallet-address": config.thirdweb.engine.wallet!,
//       },
//     }
//   );

//   const result = await response.json();

//   return ownedResponseSchema.parse(result);
// };

// export const httpMint = async (receiver: string) => {
//   const response = await fetch(
//     `${config.thirdweb.engine.url}/contract/${config.thirdweb.chainId}/${config.contractAddress}/erc721/claim-to`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${config.thirdweb.engine.accessToken}`,
//         "x-backend-wallet-address": config.thirdweb.engine.wallet!,
//       },
//       body: JSON.stringify({ receiver: receiver.toLowerCase(), quantity: "1" }),
//     }
//   );

//   const result = await response.json();

//   return mintResponseSchema.parse(result);
// };
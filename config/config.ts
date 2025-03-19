export const config = {
    neynar:{
        apiKey: process.env.NEYNAR_API_KEY
    },
    contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    warpcast:{
        castHash: process.env.NEXT_PUBLIC_WARPCAST_CAST_HASH,
    },
    hostUrl: process.env.NEXT_PUBLIC_HOST_URL,
    thirdweb:{
        clientId: Number(process.env.NEXT_PUBLIC_CLIENT_ID),
        engine:{
            url: process.env.THRIDWEB_ENGINE_URL,
            wallet: process.env.THIRDWEB_ENGINE_WALLET,
            accessToken: process.env.THIRDWEB_ENGINE_ACCESS_TOKEN,
        }
    }
}
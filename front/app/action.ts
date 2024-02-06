"use server";

import axios, {AxiosResponse} from "axios";
import dotenv from "dotenv";
import {ethers} from "ethers";
import erc721abi from "@/assets/ERC721ABI.json";

dotenv.config();
const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY as string;
const pinataSecretApiKey = process.env
    .NEXT_PUBLIC_PINATA_SECRET_API_KEY as string;
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY as string;
const abi = erc721abi;

type FormData = {
    name: string;
    email: string;
    wallet: string;
};

export async function postToPinata(data: {
    name: string;
    description: string;
    image: string;
    attributes: any[];
}) {
    "use server";
    try {
        const response: AxiosResponse<{IpfsHash: { hash: string }}> = await axios.post(
            "https://api.pinata.cloud/pinning/pinJSONToIPFS",
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey,
                },
            },
        );

        return response.data.IpfsHash;
    } catch (error) {
        throw error;
    }
}

export async function mintNFT(data: FormData){
    try {
        const provider = ethers.getDefaultProvider(
            "https://eth-sepolia.g.alchemy.com/v2/Q2X3lkG-JLa37uT_aK78RmtR49_2DsHJ",
        );
        const wallet = new ethers.Wallet(privateKey, provider);
        const contract = new ethers.Contract(contractAddress, abi, wallet);

        let json = {
            name: "Proof-Of-Attandance InteliBlockchain Onboarding 2024",
            description: `Essa NFT prova que ${data.name} (${data.email}) participou do evento de onboarding da InteliBlockchain em 2024.`,
            image:
                "https://ipfs.io/ipfs/QmbB1kr63iGUHLFfibtHjabrpoQW41xBXMTZRTC8dQ1hRG",
            attributes: [],
        };

        const cid = await postToPinata(json);
        const transaction = await contract.safeMint(data.wallet, cid);
        const receipt = transaction.wait();

        return receipt.hash;
    } catch (error) {
        throw error;
    }
};
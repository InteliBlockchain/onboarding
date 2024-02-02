"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "@/app/logo.svg";
import github from "@/app/github.svg";
import wpp from "@/app/wpp.svg";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";
import erc721abi from "@/app/ERC721ABI.json";
import axios from "axios";
import dotenv from "dotenv";
import { toast } from "react-toastify";
// Configurar suas credenciais do Pinata
dotenv.config();
const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY as string;
const pinataSecretApiKey = process.env
  .NEXT_PUBLIC_PINATA_SECRET_API_KEY as string;

// Caminho para a imagem que você deseja enviar

type FormData = {
  name: string;
  email: string;
  wallet: string;
};

export default function Home() {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
  const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY as string;
  const abi = erc721abi;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string[]>([]);
  const [modalError, setModalError] = useState(false);

  async function postToPinata(data: {
    name: string;
    description: string;
    image: string;
    attributes: any[];
  }) {
    try {
      const response = await axios.post(
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

      const cid = response.data.IpfsHash;
      console.log("Post para o IPFS bem-sucedido. CID:", cid);
      return cid;
    } catch (error) {
      console.error("Erro ao postar para o IPFS:", error);
      throw error;
    }
  }

  const mintNFT = async (data: FormData) => {
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
      const receipt = await transaction.wait();

      console.log("Transação confirmada:", receipt);
      console.log(
        `Sua transação: https://sepolia.etherscan.io/tx/${receipt.hash}`,
      );
      console.log(
        `Confira sua NFT https://testnets.opensea.io/${data.wallet}/`,
      );
      return receipt;
    } catch (error) {
      console.error("Erro ao chamar a função safeMint:", error);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    toast.info("Trabalhando nisso...");

    try {
      const receipt = await mintNFT(data);
      setModalMessage([
        `Confira sua NFT: https://testnets.opensea.io/${data.wallet}/`,
        `Sua transação: https://sepolia.etherscan.io/tx/${receipt.hash}`,
      ]);
      setModalError(false);
      setModalOpen(true);
      console.log("Receipt:", receipt);
    } catch (error) {
      console.error("Erro ao criar NFT:", error);
      toast.error(
        "Algo de errado aconteceu criando a NFT... Contate um dos membros do clube",
      );
    }

    setLoading(false);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="flex min-h-screen w-full h-full items-center justify-center">
      <div className="flex flex-col items-center w-full justify-center min-h-screen">
        <a
          href="https://inteliblockchain.co"
          target="_blank"
          className="w-4/5 md:w-2/3 lg:w-1/2"
        >
          <Image
            alt="InteliBlockchain"
            src={logo}
            width={256}
            height={128}
            className="w-full mb-4"
          />
        </a>

        <div className="shadow-lg rounded-lg w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white text-white bg-opacity-20 px-4 py-8 backdrop-blur-lg">
          <p className="text-xl md:text-2xl mb-4">
            Receba sua Proof-Of-Attandance NFT
          </p>
          <p className="text-sm md:text-base text-gray-200">
            Para receber sua NFT você precisa ter participado do evento e ter
            uma carteira na rede Sepolia.{" "}
          </p>
          <p className="text-sm md:text-base text-gray-200 my-2">
            Ainda não tem uma carteira?{" "}
            <a
              target="_blank"
              href={"https://metamask.io/download/"}
              className="text-blue-500 hover:underline"
            >
              Clique aqui.
            </a>
          </p>
          <p className="text-sm md:text-base text-gray-200">
            Conecte sua carteira à Sepolia{" "}
            <a
              target="_blank"
              href={"https://chainlist.org/?search=11155111&testnets=true"}
              className="text-blue-500 hover:underline"
            >
              clicando aqui
            </a>
            .
          </p>

          <form
            className="flex flex-col mt-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="name">Seu nome</label>
            <span className="text-sm text-gray-200">
              Esse nome será gravado no NFT para provar sua presença
            </span>
            <input
              id="name"
              type="text"
              placeholder="Nome"
              className="p-2 text-black rounded-md shadow-md"
              {...register("name", {
                required: "Nome obrigatório",
                min: 3,
              })}
            />
            <span className="text-red-300">
              {errors.name && errors.name.message}
            </span>

            <label className="mt-4" htmlFor="wallet">
              Email
            </label>
            <span className="text-sm text-gray-200">
              Email para receber novidades
            </span>
            <input
              id="email"
              type="email"
              className="p-2 rounded-md shadow-md text-black"
              placeholder="your.email@email.com"
              {...register("email", {
                required: "Email obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
            <span className="text-red-300">
              {errors.email && errors.email.message}
            </span>

            <label className="mt-4" htmlFor="wallet">
              Wallet
            </label>
            <span className="text-sm text-gray-200">
              Carteira para receber o NFT na rede Sepolia
            </span>
            <input
              id="wallet"
              type="text"
              minLength={42}
              maxLength={42}
              className="p-2 rounded-md shadow-md text-black"
              {...register("wallet", { required: "Carteira obrigatória" })}
              placeholder="0x00...0000"
            />
            <span className="text-red-300">
              {errors.wallet && errors.wallet.message}
            </span>

            <button
              className="text-xl mt-4 p-2 bg-blue-500 text-white rounded-md shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {!loading ? (
                <span>Gerar NFT</span>
              ) : (
                <div className="flex justify-center items-center" role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8">
          <a
            href="https://github.com/InteliBlockchain/onboarding"
            target="_blank"
          >
            <span
              className="text-sm text-gray-400 flex flex-row"
              style={{ whiteSpace: "pre-wrap" }}
            >
              Todo o código pode ser encontrado aqui:{" "}
              <Image alt="GitHub" src={github} width={16} height={16} />
            </span>
          </a>
        </div>

        <div className="mt-4">
          <a
            href="https://chat.whatsapp.com/EoP5wbGPujg8vpG9f6KNWz"
            target="_blank"
          >
            <span
              className="text-sm text-gray-400 flex flex-row"
              style={{ whiteSpace: "pre-wrap" }}
            >
              Caso tenha alguma dúvida:{" "}
              <Image alt="WhatsApp" src={wpp} width={16} height={16} />
            </span>
          </a>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        message={modalMessage}
        onClose={closeModal}
        isError={modalError}
      />
    </div>
  );
}

const Modal = ({ isOpen, message, onClose, isError }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-sm mx-auto">
        <h2 className="font-bold text-lg">{isError ? "Erro" : "Sucesso"}</h2>
        <div>
          {message.map((mes: any, index: any) => {
            return (
              <p className="mb-2" key={index}>
                {mes}
              </p>
            );
          })}
        </div>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

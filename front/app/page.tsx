"use client";
import Image from "next/image";
import { useState } from "react";
import logo from "@/app/svgviewer-output.svg";

export default function Home() {
  // {
  // 	"attributes": [
  // 		{
  // 			"trait_type": "Shape",
  // 			"value": "Circle"
  // 		},
  // 		{
  // 			"trait_type": "Mood",
  // 			"value": "Sad"
  // 		}
  // 	],
  // 	"description": "A sad circle.",
  // 	"image": "https://i.imgur.com/Qkw9N0A.jpeg",
  // 	"name": "Sad Circle"
  // }

  let [name, setName] = useState("");
  let [wallet, setWallet] = useState("");

  return (
    <div className="flex min-h-screen w-full h-full items-center justify-center">
      <div className="flex flex-col py-8 px-4 shadow-md shadow-gray-300 rounded-lg w-4/5">
        <div className="flex">
          <Image
            alt="InteliBlockchain"
            src={logo}
            width={256}
            height={64}
            className="flex w-full"
          />
        </div>

        <div className="my-4">
          {" "}
          <p className="font-2xl">Receba sua Proof-Of-Attandance NFT</p>
          <span className="text-xs text-gray-500">
            Para receber sua NFT você precisa ter participado do evento e ter
            uma carteira na rede Sepolia.{" "}
          </span>
          Não tem uma carteira ainda?{" "}
          <a
            href="https://metamask.io/download"
            target="_blank"
            className="text-blue-500"
          >
            Baixe aqui
          </a>
          . Não se conectou à rede Sepolia?{" "}
          <a
            href="https://docs.sepolia.org/"
            target="_blank"
            className="text-blue-500"
          >
            Veja como
          </a>
          .
        </div>

        <div className="flex flex-col">
          <label htmlFor="name">Seu nome</label>
          <span className="text-xs text-gray-500">
            Esse nome será gravado no NFT para provar sua presença
          </span>
          <input
            id="name"
            type="text"
            placeholder="Nome"
            className="p-2 shadow-gray-300 rounded-md shadow-md"
            onChange={(e) => setName(e.target.value)}
          />

          <label className="mt-4" htmlFor="wallet">
            Wallet
          </label>
          <span className="text-xs text-gray-500">
            Carteira para receber o NFT na rede Sepolia
          </span>
          <input
            id="wallet"
            type="text"
            className="p-2 shadow-gray-300 rounded-md shadow-md"
            placeholder="0x00...0000"
            onChange={(e) => setWallet(e.target.value)}
          />

          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded-md shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!name || !wallet}
          >
            Gerar NFT
          </button>
        </div>
      </div>
    </div>
  );
}

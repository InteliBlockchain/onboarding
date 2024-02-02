const fs = require('fs');
const axios = require('axios');

// Configurar suas credenciais do Pinata
const pinataApiKey = '4a5dd9e3b8456f0238dd';
const pinataSecretApiKey = '9492141181a9ee2fb3b3f4f7df4356a00706d7f05a50777460fce109b22ebeaf';

// Caminho para a imagem que você deseja enviar
const caminhoDaImagem = '../assets/img/inteli_blockchain.jpeg';

// Função para fazer o upload da imagem para o IPFS usando o Pinata
async function enviarParaIPFS() {
  try {
    // Obter o token de acesso do Pinata
    const response = await axios.post('https://api.pinata.cloud/data/testAuthentication', {}, {
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': pinataApiKey,
        'pinata_secret_api_key': pinataSecretApiKey,
      },
    });

    const token = response.data.jwt;

    // Configurar dados do formulário para o upload
    const formData = new FormData();
    formData.append('file', fs.createReadStream(caminhoDaImagem));

    // Fazer o upload da imagem para o Pinata
    const uploadResponse = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=`,
        'Authorization': `Bearer ${token}`,
      },
    });

    // Obter o link IPFS da resposta
    const ipfsLink = uploadResponse.data.IpfsHash;
    console.log(`Imagem enviada com sucesso para o IPFS. Link IPFS: https://gateway.pinata.cloud/ipfs/${ipfsLink}`);
  } catch (error) {
    console.error('Erro ao enviar imagem para o IPFS:', (error as any).message || error);
  }
}
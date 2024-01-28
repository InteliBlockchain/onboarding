# Contracts

## 3. How to run:

For better interaction, enter the workspace within the "contracts" folder.

- *Run the command below to generate the .env file and install the project dependencies contained in the `./.gitmodules` file:*

```bash
make setup
```

- *Run the command below to execute the tests:*
```bash
make test
```

> [!IMPORTANT]
> Before running the command below, confirm that the `./.env` file contains all the necessary variables for deployment. For deploying on a local network, add the following values to the variables:

```env
RPC_URL="http://localhost:8545"
NETWORK="localhost"
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80" // You can use any private key from the local environment here.
TESTNET_BLOCKSCAN_API_KEY=""
```

- *Run the command below to deploy the contracts:*
```bash
make deploy
```

## Supported Networks:

Sepolia: https://sepolia.etherscan.io/address/0x7d50f2785ca051ce566e54a6f93a2980f5e3a798
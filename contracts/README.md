# Contracts
This project uses foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.

Foundry consists of:
-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

Follow the instructions provided [here](https://book.getfoundry.sh/getting-started/installation) for the installation process. Additionally, ensure that your computer has the [make](https://askubuntu.com/questions/161104/how-do-i-install-make) binary installed.

## 1. How to run:

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
> Before running the command below, confirm that the `./.env` file contains all the necessary variables for deployment.

- *Run the command below to deploy the contracts:*
```bash
make deploy
```

## 2. Supported Networks:

Sepolia: https://sepolia.etherscan.io/address/0xc5d1185d2a592fc1609f63a5f448805cff8d56ec

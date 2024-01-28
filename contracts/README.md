# Contracts

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

Sepolia: https://sepolia.etherscan.io/address/0x7d50f2785ca051ce566e54a6f93a2980f5e3a798

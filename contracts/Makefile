-include .env

.PHONY: deploy setup test

info: header

define HEADER    
                                                    
 ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  █████╗  ██████╗████████╗███████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██╔════╝
██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝███████║██║        ██║   ███████╗
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██╔══██║██║        ██║   ╚════██║
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║██║  ██║╚██████╗   ██║   ███████║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚══════╝

endef

export HEADER

START_LOG = @echo "======================================================= START OF LOG ========================================================="
END_LOG = @echo "======================================================== END OF LOG =========================================================="

DEPLOY_NETWORK_ARGS := script/Deploy.s.sol --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(TESTNET_BLOCKSCAN_API_KEY) -v

define test_contracts
	$(START_LOG)
	@forge test
	$(END_LOG)
endef

define deploy
	$(START_LOG)
	@forge script script/Deploy.s.sol --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(TESTNET_BLOCKSCAN_API_KEY) -v
	$(END_LOG)
endef

setup: .env.tmpl
	forge install
	cp .env.tmpl .env

test:
	@echo "$$HEADER"
	@$(test_contract)

deploy:
	@echo "$$HEADER"
	@$(deploy)
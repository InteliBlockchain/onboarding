// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {ERC721IB} from "../src/token/ERC721/ERC721IB.sol";

contract DeployContracts is Script {
    function run() external {
        bytes32 _salt = bytes32(abi.encode(2023));
        vm.startBroadcast();
        ERC721IB erc721 = new ERC721IB{salt: bytes32(_salt)}(msg.sender);
        vm.stopBroadcast();
        console.log(
            "ERC721IB address:",
            address(erc721),
            "at network:",
            block.chainid
        );
    }
}
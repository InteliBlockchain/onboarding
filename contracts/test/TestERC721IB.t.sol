//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {ERC721IB} from "../src/token/ERC721/ERC721IB.sol";

contract TestERC721Deroll is Test {
    ERC721IB erc721;

    address owner = address(1);
    address guest = address(2);

    function setUp() public {
        erc721 = new ERC721IB{salt: bytes32(abi.encode(2024))}(owner);
    }

    function testMintERC721Deroll() public {
        vm.prank(owner);
        erc721.safeMint(
            guest,
            "QmXqngKXVbY6qEhbTdENaSARNwHSnRFMQhBC5aycNW81S8"
        );
        assertTrue(erc721.balanceOf(guest) == 1);
    }
}
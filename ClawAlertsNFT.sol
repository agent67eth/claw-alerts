// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ClawAlertsNFT
 * @notice NFT contract for Claw Alerts access
 * @dev Simple ERC-721 with one-time minting for $0.0067 ETH
 */
contract ClawAlertsNFT is ERC721, Ownable {
    // Price in wei (0.0067 ETH at 1e18 = 67 * 1e15)
    uint256 public constant PRICE = 67 * 10**15;
    uint256 public constant TOTAL_SUPPLY = 1000; // Maximum 1000 Claw Alerts

    // Counter for minted tokens
    uint256 public mintedCount = 0;

    /**
     * @dev Constructor initializes the contract
     */
    constructor() ERC721("Claw Alerts", "CLA") {}

    /**
     * @notice Mints one Claw Alerts NFT
     * @dev Only callable if the exact price is sent
     * @dev Must be called with ETH
     */
    function mint() external payable {
        require(msg.value == PRICE, "Incorrect mint price");
        require(mintedCount < TOTAL_SUPPLY, "All NFTs already minted");

        _safeMint(msg.sender, mintedCount + 1);
        mintedCount++;
    }

    /**
     * @notice Withdraws contract balance to owner
     * @dev Only callable by owner
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");

        payable(owner()).transfer(balance);
    }

    /**
     * @notice Returns total minted count
     */
    function totalMinted() external view returns (uint256) {
        return mintedCount;
    }

    /**
     * @notice Returns if a specific address can mint
     * @dev Used for verification before minting
     */
    function canMint(address account) external view returns (bool) {
        return balanceOf(account) == 0;
    }
}

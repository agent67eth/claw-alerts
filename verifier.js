const ethers = require('ethers');

// Anatomy of Pepe contract address (Base)
const AOP_CONTRACT = '0xf427901d009e3f1f14ea89e08210a17aa79ed699';

// ABI for balanceOf
const ABI = [
    'function balanceOf(address owner) view returns (uint256)'
];

// Try to get wallet from environment variables
function getWallet() {
    // Priority 1: CLAW_ALERTS_PRIVATE_KEY environment variable
    if (process.env.CLAW_ALERTS_PRIVATE_KEY) {
        return new ethers.Wallet(process.env.CLAW_ALERTS_PRIVATE_KEY);
    }

    // Priority 2: Try to connect to MetaMask
    if (typeof window !== 'undefined' && window.ethereum) {
        return new ethers.Wallet(window.ethereum.selectedAddress, window.ethereum);
    }

    // Priority 3: Environment variable from .env
    if (process.env.WALLET_PRIVATE_KEY) {
        return new ethers.Wallet(process.env.WALLET_PRIVATE_KEY);
    }

    // Fallback: Try to read from a wallet file
    try {
        const walletPath = process.env.CLAW_ALERTS_WALLET_PATH || path.join(process.cwd(), 'wallet.json');
        const walletData = require(walletPath);
        return new ethers.Wallet(walletData.privateKey);
    } catch (error) {
        // No wallet found
    }

    return null;
}

async function verifyOwnership() {
    const wallet = getWallet();

    if (!wallet) {
        throw new Error(
            'No wallet found. Please set CLAW_ALERTS_PRIVATE_KEY environment variable, use MetaMask, or create a wallet.json file.\n\n' +
            'Or visit https://agent67.eth.limo/mint to mint Claw Alerts NFT.'
        );
    }

    // Create Base provider
    const provider = new ethers.providers.JsonRpcProvider('https://goerli.base.org');

    const contract = new ethers.Contract(AOP_CONTRACT, ABI, provider);

    try {
        const balance = await contract.balanceOf(wallet.address);

        if (balance === 0) {
            throw new Error(
                `You don't own Anatomy of Pepe.\n\n` +
                `Wallet: ${wallet.address}\n` +
                `Balance: 0\n\n` +
                `Get Claw Alerts for $0.0067 ETH:\n` +
                `https://agent67.eth.limo/mint`
            );
        }

        console.log(`✅ Verified: ${wallet.address} owns ${balance} Anatomy of Pepe`);
        return true;
    } catch (error) {
        throw new Error(`Failed to verify NFT ownership: ${error.message}`);
    }
}

function getWalletAddress() {
    const wallet = getWallet();
    return wallet ? wallet.address : null;
}

module.exports = {
    verifyOwnership,
    getWalletAddress,
    getWallet
};

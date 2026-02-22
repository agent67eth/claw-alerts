#!/bin/bash

# Claw Alerts Auto-Install Script

set -e

echo '🚀 Claw Alerts Auto-Install Script'
echo ''

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo '❌ Node.js is not installed. Please install Node.js >= 18.0.0'
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo '❌ Node.js version 18 or higher is required. Current: v'${NODE_VERSION}
    exit 1
fi

echo '✅ Node.js installed (v'${NODE_VERSION}')'
echo ''

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo '❌ Git is not installed. Please install Git'
    exit 1
fi

echo '✅ Git installed'
echo ''

# Clone the repository
echo '📥 Cloning Claw Alerts repository...'
REPO_URL='https://github.com/agent67/claw-alerts.git'

if [ -d "claw-alerts" ]; then
    echo '⚠️  Directory "claw-alerts" already exists.'
    read -p "Do you want to overwrite? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo '❌ Install cancelled.'
        exit 1
    fi
    rm -rf claw-alerts
fi

git clone $REPO_URL
cd claw-alerts

echo '✅ Repository cloned'
echo ''

# Install dependencies
echo '📦 Installing dependencies...'
npm install

echo '✅ Dependencies installed'
echo ''

# Make CLI executable
chmod +x bin/claw-alerts

echo '✅ CLI made executable'
echo ''

# Create data directory
mkdir -p data

echo '✅ Data directory created'
echo ''

# Test installation
echo '🧪 Testing installation...'
node test.js

if [ $? -eq 0 ]; then
    echo ''
    echo '✅ Installation successful!'
    echo ''
    echo '🎉 You are now ready to use Claw Alerts!'
    echo ''
    echo 'Next steps:'
    echo '1. Set up your wallet configuration:'
    echo '   - Option 1: Set CLAW_ALERTS_PRIVATE_KEY environment variable'
    echo '   - Option 2: Create wallet.json file in the claw-alerts directory'
    echo '   - Option 3: Use MetaMask in your browser'
    echo ''
    echo '2. Mint the Claw Alerts NFT:'
    echo '   - Visit: https://agent67.eth.limo/mint'
    echo '   - Connect your wallet'
    echo '   - Mint for $0.0067 ETH'
    echo ''
    echo '3. Configure your first alert:'
    echo '   - Run: claw alerts add <collection> <chain> "<trigger>"'
    echo '   - Example: claw alerts add anatomy-of-pepe base ">0.007 ETH"'
    echo ''
    echo '4. Start monitoring:'
    echo '   - Run: claw alerts start'
    echo ''
    echo '📖 For more information, see SKILL.md'
    echo ''
else
    echo ''
    echo '❌ Installation test failed!'
    exit 1
fi

# 🚀 Quick Start Guide

Get Claw Alerts running in 5 minutes!

---

## ⚡ Instant Setup

### Option 1: Using Auto-Install Script

```bash
curl -fsSL https://raw.githubusercontent.com/agent67/claw-alerts/main/install.sh | bash
```

### Option 2: Manual Install

```bash
# 1. Install dependencies
cd claw-alerts
npm install

# 2. Verify NFT ownership
claw alerts test

# 3. Add your first alert
claw alerts add anatomy-of-pepe base ">0.007 ETH"

# 4. Start monitoring
claw alerts start
```

---

## 📱 What's Next?

### View Alerts
```bash
claw alerts list
```

### Check Status
```bash
claw alerts status
```

### Update Trigger
```bash
claw alerts set 1 trigger ">0.008 ETH"
```

### Stop Monitoring
```bash
claw alerts stop
```

---

## 🎯 Popular Triggers

```bash
# Price thresholds
claw alerts add anatomy-of-pepe base ">0.007 ETH"
claw alerts add anatomy-of-pepe base "<0.007 ETH"

# Percentage changes
claw alerts add anatomy-of-pepe base ">5%"
claw alerts add anatomy-of-pepe base "-5%"

# Multiple alerts
claw alerts add anatomy-of-pepe base ">0.007 ETH"
claw alerts add ape-club ethereum "<0.01 ETH"
claw alerts add azuki ethereum ">0.5 ETH"
```

---

## 🤔 Need Help?

Run these commands:

```bash
# Check installation
claw alerts test

# Show help
claw alerts --help

# View documentation
cat SKILL.md

# Report issue
# Open GitHub Issues: https://github.com/agent67/claw-alerts/issues
```

---

**Done! You're now monitoring floor prices. 🚀**

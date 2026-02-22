---
name: claw-alerts
description: Programmable NFT floor price alerts for Anatomy of Pepe holders. Verify ownership, configure triggers, receive Telegram notifications.
tags: [nft, alerts, telegram, notification, utility, aop]
---

# 🚨 Claw Alerts

**"Stay on top of the floor. Get notified instantly."**

A powerful alert system for Anatomy of Pepe holders to track collection floor prices and receive real-time Telegram notifications.

## ✨ Features

- **NFT-Gated Access**: Only Anatomy of Pepe holders
- **Unlimited Alerts**: Set as many alerts as you want
- **Custom Triggers**: Percent changes, absolute price thresholds
- **Multi-Chain Support**: Base, Ethereum, Polygon, Arbitrum, Optimism
- **Telegram Notifications**: Direct alerts via OpenClaw
- **Full Customization**: Edit, remove, and manage alerts

## 🎯 When to Use

- Track Anatomy of Pepe floor price movements
- Get notified when floor drops below target
- Receive alerts when floor rises past threshold
- Monitor multiple collections in one place

**Don't use when:**
- You don't own Anatomy of Pepe (NFT-gated)
- You need token price alerts (focuses on NFTs only)

## 📦 Installation

### Option 1: Auto-Install Script (Recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/agent67/claw-alerts/main/install.sh | bash
```

### Option 2: Manual Install

1. Clone the repo:
   ```bash
   git clone https://github.com/agent67/claw-alerts.git
   cd claw-alerts
   npm install
   ```

2. Configure alerts:
   ```bash
   claw alerts add <collection> <chain> <trigger>
   ```

3. Start monitoring:
   ```bash
   claw alerts start
   ```

## 💰 Pricing

**One-time purchase:** $0.0067 ETH (≈ $13.30)
- Unlimited access forever
- No subscriptions
- Free updates

## 🔐 NFT-Gating

Claw Alerts is exclusive to Anatomy of Pepe holders. The skill verifies your NFT ownership on startup:

```bash
$ claw alerts start
❌ You don't own Anatomy of Pepe
🔗 Mint Claw Alerts for $0.0067 ETH: https://agent67.eth.limo/mint
```

## 🎛️ Commands

### Add Alert

```bash
claw alerts add <collection_slug> <chain> <trigger>
```

**Example:**
```bash
claw alerts add anatomy-of-pepe base ">0.007 ETH"
```

**Triggers:**
- `> <price>`: Alert when floor price exceeds
- `< <price>`: Alert when floor price drops below
- `> <percent>%`: Alert when floor rises by X%
- `< <percent>%`: Alert when floor drops by X%

### List Alerts

```bash
claw alerts list
```

**Output:**
```
ID  | Collection          | Chain | Trigger           | Last Check
----|---------------------|-------|-------------------|-------------
1   | anatomy-of-pepe     | base  | >0.007 ETH        | 2 mins ago
2   | ape-club            | eth   | <0.01 ETH         | 1 hour ago
```

### Remove Alert

```bash
claw alerts remove <id>
```

### Update Alert

```bash
claw alerts set <id> <option> <value>
```

**Options:**
- `trigger <value>`: Change alert trigger
- `channel <channel_name>`: Set notification channel
- `interval <minutes>`: Change polling interval

**Example:**
```bash
claw alerts set 1 trigger ">0.008 ETH"
claw alerts set 1 interval 30
```

### Test Notification

```bash
claw alerts test
```

Sends a test notification to verify channel configuration.

## 📊 Configuration

Alerts are stored in `data/alerts.json`:

```json
{
  "alerts": [
    {
      "id": 1,
      "collection": "anatomy-of-pepe",
      "chain": "base",
      "trigger": ">0.007 ETH",
      "lastPrice": 0.0079,
      "lastCheck": 1737647328,
      "interval": 5,
      "channel": "telegram"
    }
  ],
  "notifications": {
    "telegram": "8508657984"
  }
}
```

## 🔄 Monitoring

### Start Monitoring

```bash
claw alerts start
```

Monitors all active alerts in background.

### Stop Monitoring

```bash
claw alerts stop
```

### Status

```bash
claw alerts status
```

**Output:**
```
✅ Claw Alerts Running
📊 Active Alerts: 2
⏱ Last Check: 2 minutes ago
🔔 Channel: telegram
```

## 🔔 Notifications

### Telegram Alerts

You'll receive notifications in your Telegram:

```
🚨 Floor Price Alert: Anatomy of Pepe
📊 Current: 0.0082 ETH (+3.8%)
🎯 Trigger: >0.007 ETH
⏰ Time: Just now
```

### Error Notifications

If verification fails or API errors occur:

```
❌ Verification Failed
   Reason: You don't own Anatomy of Pepe
   Solution: Mint Claw Alerts: https://agent67.eth.limo/mint
```

## 🎁 Benefits

1. **Utility First**: Keep your NFTs valuable by tracking prices
2. **Never Miss an Opportunity**: Instant alerts on price movements
3. **No Subscription**: One-time payment, unlimited use
4. **Simple to Use**: CLI interface, no complex setup
5. **Always Current**: Free updates as long as you hold Claw Alerts NFT

## 🤝 Support

- **GitHub Issues**: https://github.com/agent67/claw-alerts/issues
- **Telegram**: @kjjk_eth
- **Mint Page**: https://agent67.eth.limo/mint

## 📜 License

MIT License - Use for personal purposes. Commercial use requires additional license.

---

**Get notified. Stay ahead. Never miss a price move.** 🚀

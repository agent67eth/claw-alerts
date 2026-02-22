# 🚨 Claw Alerts

**NFT-gated floor price monitoring for Anatomy of Pepe holders. Track prices. Get notified instantly. Never miss a move.**

![GitHub Actions](https://github.com/agent67/claw-alerts/actions/workflows/deploy.yml/badge.svg)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Pass-brightgreen.svg)

## ✨ Features

- **🔒 NFT-Gated Access**: Exclusive to Anatomy of Pepe holders
- **✨ Unlimited Alerts**: Set as many alerts as you want
- **🎯 Custom Triggers**: Price thresholds, percentage changes
- **🔔 Telegram Notifications**: Direct alerts via OpenClaw
- **⏱️ Real-Time Monitoring**: 5-minute polling intervals
- **💰 One-Time Purchase**: $0.0067 ETH ≈ $13.30
- **📦 Self-Hosted**: No subscriptions, free updates

## 🎯 When to Use

- Track Anatomy of Pepe floor price movements
- Get notified when floor drops below target
- Receive alerts when floor rises past threshold
- Monitor multiple collections in one place
- Never miss a buying/selling opportunity

## 📦 Installation

### Option 1: Auto-Install Script (Recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/agent67/claw-alerts/main/install.sh | bash
```

### Option 2: Manual Install

1. Clone the repository:
```bash
git clone https://github.com/agent67/claw-alerts.git
cd claw-alerts
npm install
```

2. Verify NFT ownership:
```bash
claw alerts test
```

3. Start monitoring:
```bash
claw alerts start
```

## 🎛️ Commands

### Add Alert
```bash
claw alerts add <collection> <chain> "<trigger>"
```

**Examples:**
```bash
claw alerts add anatomy-of-pepe base ">0.007 ETH"
claw alerts add anatomy-of-pepe base ">5%"
claw alerts add ape-club ethereum "<0.01 ETH"
```

**Trigger Types:**
- `> <price>`: Alert when floor exceeds
- `< <price>`: Alert when floor drops below
- `> <percent>%`: Alert when floor rises by X%
- `< <percent>%`: Alert when floor drops by X%

### List Alerts
```bash
claw alerts list
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
- `interval <minutes>`: Change polling interval

**Example:**
```bash
claw alerts set 1 trigger ">0.008 ETH"
claw alerts set 1 interval 30
```

### Check Status
```bash
claw alerts status
```

### Test Notification
```bash
claw alerts test
```

## 🔄 Monitoring

### Start Monitoring
```bash
claw alerts start
```

### Stop Monitoring
```bash
claw alerts stop
```

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
  ]
}
```

## 🎁 Benefits

1. **Utility First**: Keep your NFTs valuable by tracking prices
2. **Never Miss an Opportunity**: Instant alerts on price movements
3. **No Subscription**: One-time payment, unlimited use
4. **Simple to Use**: CLI interface, no complex setup
5. **Always Current**: Free updates as long as you hold Claw Alerts NFT

## 💰 Pricing

**One-time purchase:** $0.0067 ETH (≈ $13.30)

- Unlimited access forever
- No subscriptions
- Free updates
- Community support

## 🤝 Support

- **GitHub Issues**: https://github.com/agent67/claw-alerts/issues
- **Mint Page**: https://agent67.eth.limo/mint
- **Telegram**: @kjjk_eth

## 📜 License

MIT License - Use for personal purposes. Commercial use requires additional license.

## 🗺️ Roadmap

### v1.0 (Current)
- [x] NFT-gated access
- [x] OpenSea API integration
- [x] Telegram notifications
- [x] Multiple chain support
- [x] Custom triggers

### v1.1 (Upcoming)
- [ ] Discord notifications
- [ ] Email notifications
- [ ] Web dashboard
- [ ] Historical data tracking
- [ ] Export data (CSV/JSON)

### v1.2 (Future)
- [ ] Multiple notification channels
- [ ] Advanced analytics
- [ ] Price history charts
- [ ] Export/import alerts
- [ ] Mobile app (iOS/Android)

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - See LICENSE file for details

---

**Get notified. Stay ahead. Never miss a price move.** 🚀

Made with ❤️ by agent67.eth

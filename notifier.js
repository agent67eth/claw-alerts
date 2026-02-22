// Try to require the message tool (only available in OpenClaw)
let message;
try {
    message = require('../message');
} catch (error) {
    // Not in OpenClaw environment, will use mock
    message = null;
}

/**
 * Send alert notification via Telegram
 * @param {Object} alert - Alert configuration
 * @param {number} currentPrice - Current floor price
 * @param {number} changePercent - Price change percentage
 */
async function sendAlert(alert, currentPrice) {
    // If message tool is not available, log to console
    if (!message) {
        console.log(`🔔 [Telegram] Alert sent: ${alert.collection} at ${currentPrice.toFixed(4)} ETH`);
        console.log('💡 In OpenClaw environment, real notifications will be sent.');
        return;
    }

    // Get wallet address for the notification
    try {
        // Get wallet address for the notification
        const walletAddress = require('./alerts').getWalletAddress();

        const trigger = alert.trigger;
        const collection = alert.collection;
        const chain = alert.chain;

        // Format price
        const priceFormatted = currentPrice.toFixed(4) + ' ETH';

        // Check if trigger is percentage-based
        const isPercentage = trigger.includes('%');

        let title = '🚨 Floor Price Alert';
        let messageText = '';

        if (isPercentage) {
            const changePercent = parseFloat(trigger.replace(/[^0-9.]/g, ''));
            const operator = trigger.startsWith('>') ? '↑' : '↓';
            const percentFormatted = (changePercent > 0 ? '+' : '') + changePercent + '%';

            title = `🚨 Price Change Alert: ${collection}`;
            messageText = `
📊 **${collection}** (${chain})

💰 Current Floor: ${priceFormatted}
🎯 Trigger: ${operator}${percentFormatted}

🔔 Alert sent to: ${walletAddress}
            `;
        } else {
            const operator = trigger.startsWith('>') ? '≥' : '≤';
            const targetPrice = trigger.replace(/[^0-9.]/g, '');

            title = `🚨 Floor Price Alert: ${collection}`;
            messageText = `
📊 **${collection}** (${chain})

💰 Current Floor: ${priceFormatted}
🎯 Target: ${operator}${targetPrice} ETH

🔔 Alert sent to: ${walletAddress}
            `;
        }

        // Send via OpenClaw Telegram
        await message.send({
            channel: 'telegram',
            target: '8508657984',
            message: messageText.trim(),
            parse_mode: 'Markdown',
            silent: false
        });

        console.log(`🔔 Alert sent: ${collection} at ${priceFormatted}`);
    } catch (error) {
        console.error(`❌ Failed to send alert notification: ${error.message}`);
    }
}

/**
 * Send test notification
 */
async function sendTestNotification() {
    const walletAddress = require('./alerts').getWalletAddress();

    const messageText = `
🧪 **Claw Alerts Test Notification**

✅ Claw Alerts is working correctly!

👤 Wallet: ${walletAddress}

Get Claw Alerts for $0.0067 ETH:
🔗 https://agent67.eth.limo/mint
    `.trim();

    await message.send({
        channel: 'telegram',
        target: '8508657984',
        message: messageText,
        parse_mode: 'Markdown',
        silent: false
    });
}

module.exports = {
    sendAlert,
    sendTestNotification
};

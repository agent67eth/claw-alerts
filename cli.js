#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load modules
const verifier = require('./verifier');
const alerts = require('./alerts');
const api = require('./api');
const notifier = require('./notifier');

const dataDir = path.join(__dirname, '..', 'data');
const alertsFile = path.join(dataDir, 'alerts.json');

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Read existing alerts or create empty
let alertConfig = {};
if (fs.existsSync(alertsFile)) {
    alertConfig = JSON.parse(fs.readFileSync(alertsFile, 'utf8'));
}

// Ensure alerts array exists
if (!alertConfig.alerts) {
    alertConfig.alerts = [];
}

// Command handlers
const commands = {
    async add(args) {
        if (args.length < 3) {
            console.error('Usage: claw-alerts add <collection_slug> <chain> <trigger>');
            console.error('');
            console.error('Example: claw-alerts add anatomy-of-pepe base ">0.007 ETH"');
            process.exit(1);
        }

        const collection = args[0];
        const chain = args[1];
        const trigger = args.slice(2).join(' ');

        try {
            // Verify NFT ownership
            await verifier.verifyOwnership();

            // Add alert
            const alertId = alerts.add(alertConfig, {
                collection,
                chain,
                trigger,
                channel: 'telegram',
                interval: 5
            });

            // Save
            fs.writeFileSync(alertsFile, JSON.stringify(alertConfig, null, 2));

            console.log(`✅ Alert added (ID: ${alertId})`);
            console.log(`   Collection: ${collection}`);
            console.log(`   Chain: ${chain}`);
            console.log(`   Trigger: ${trigger}`);
            console.log('');
            console.log('💡 Tip: Run "claw alerts start" to begin monitoring');
        } catch (error) {
            console.error(`❌ Error: ${error.message}`);
            process.exit(1);
        }
    },

    async list() {
        const alertsList = alerts.list(alertConfig);

        if (alertsList.length === 0) {
            console.log('No active alerts. Add one with: claw alerts add <collection> <chain> <trigger>');
            return;
        }

        console.log('Active Alerts:');
        console.log('');
        console.log('ID  | Collection          | Chain | Trigger           | Last Check');
        console.log('----|---------------------|-------|-------------------|-------------');

        alertsList.forEach(alert => {
            const lastCheck = alert.lastCheck
                ? new Date(alert.lastCheck * 1000).toLocaleTimeString()
                : 'Never';
            console.log(`${String(alert.id).padEnd(4)} | ${String(alert.collection).padEnd(20)} | ${String(alert.chain).padEnd(6)} | ${String(alert.trigger).padEnd(17)} | ${lastCheck}`);
        });

        console.log('');
        console.log(`Total: ${alertsList.length} alert${alertsList.length !== 1 ? 's' : ''}`);
    },

    async remove(args) {
        if (args.length === 0) {
            console.error('Usage: claw-alerts remove <id>');
            process.exit(1);
        }

        const id = parseInt(args[0]);

        try {
            const remaining = alerts.remove(alertConfig, id);

            fs.writeFileSync(alertsFile, JSON.stringify(alertConfig, null, 2));

            if (remaining === 0) {
                console.log('✅ All alerts removed');
            } else {
                console.log(`✅ Alert removed (ID: ${id})`);
                console.log(`   Remaining: ${remaining} alert${remaining !== 1 ? 's' : ''}`);
            }
        } catch (error) {
            console.error(`❌ Error: ${error.message}`);
            process.exit(1);
        }
    },

    async set(args) {
        if (args.length < 3) {
            console.error('Usage: claw-alerts set <id> <option> <value>');
            console.error('');
            console.error('Options:');
            console.error('  trigger <value>   Change alert trigger');
            console.error('  channel <value>   Set notification channel');
            console.error('  interval <value>  Change polling interval (minutes)');
            process.exit(1);
        }

        const id = parseInt(args[0]);
        const option = args[1];
        const value = args.slice(2).join(' ');

        try {
            const remaining = alerts.set(alertConfig, id, option, value);

            fs.writeFileSync(alertsFile, JSON.stringify(alertConfig, null, 2));

            console.log(`✅ Alert updated (ID: ${id})`);
            console.log(`   ${option}: ${value}`);
        } catch (error) {
            console.error(`❌ Error: ${error.message}`);
            process.exit(1);
        }
    },

    async test() {
        try {
            await verifier.verifyOwnership();

            console.log('✅ Verification passed');
            console.log('📤 Sending test notification...');

            await notifier.sendTestNotification();

            console.log('✅ Test notification sent successfully!');
            console.log('💡 Check your Telegram for the test message.');
        } catch (error) {
            console.error(`❌ Error: ${error.message}`);
            process.exit(1);
        }
    },

    async start() {
        try {
            await verifier.verifyOwnership();

            const alertsList = alerts.list(alertConfig);

            if (alertsList.length === 0) {
                console.log('⚠️  No alerts configured');
                console.log('💡 Add an alert with: claw alerts add <collection> <chain> <trigger>');
                process.exit(0);
            }

            console.log('🚀 Starting Claw Alerts...');
            console.log('');
            console.log(`📊 Active alerts: ${alertsList.length}`);
            console.log('⏱️  Monitoring interval: 5 minutes');
            console.log('🔔 Channel: telegram');
            console.log('');

            // Start monitoring loop
            const intervalMs = 5 * 60 * 1000; // 5 minutes

            const checkAlerts = async () => {
                console.log(`\n⏰ Checking alerts... (${new Date().toLocaleTimeString()})`);

                for (const alert of alertsList) {
                    try {
                        const stats = await api.getCollectionStats(alert.collection, alert.chain);
                        const currentPrice = stats.floor_price;

                        const triggered = alerts.checkTrigger(alert, currentPrice);

                        if (triggered) {
                            await notifier.sendAlert(alert, currentPrice);
                        }

                        alert.lastCheck = Math.floor(Date.now() / 1000);
                    } catch (error) {
                        console.error(`❌ Error checking ${alert.collection}: ${error.message}`);
                    }
                }

                // Save last check times
                fs.writeFileSync(alertsFile, JSON.stringify(alertConfig, null, 2));
            };

            // Initial check
            await checkAlerts();

            // Schedule next check
            setInterval(checkAlerts, intervalMs);

        } catch (error) {
            console.error(`❌ Error: ${error.message}`);
            process.exit(1);
        }
    },

    async stop() {
        console.log('🛑 Claw Alerts stopped');
        process.exit(0);
    },

    async status() {
        try {
            await verifier.verifyOwnership();

            const alertsList = alerts.list(alertConfig);

            console.log('✅ Claw Alerts Running');
            console.log('');
            console.log(`📊 Active Alerts: ${alertsList.length}`);
            console.log('⏱️  Monitoring interval: 5 minutes');
            console.log('🔔 Channel: telegram');

            if (alertsList.length > 0) {
                console.log('');
                console.log('Recent alerts:');
                console.log('');
                console.log('ID  | Collection          | Last Check');
                console.log('----|---------------------|------------');

                const recentAlerts = alertsList.slice(0, 5);
                recentAlerts.forEach(alert => {
                    const lastCheck = alert.lastCheck
                        ? new Date(alert.lastCheck * 1000).toLocaleTimeString()
                        : 'Never';
                    console.log(`${String(alert.id).padEnd(4)} | ${String(alert.collection).padEnd(20)} | ${lastCheck}`);
                });
            }

        } catch (error) {
            console.error(`❌ Error: ${error.message}`);
            process.exit(1);
        }
    }
};

// Execute command
if (commands[command]) {
    commands[command](cmdArgs);
} else {
    console.error(`❌ Unknown command: ${command}`);
    console.error('');
    console.error('Available commands: add, list, remove, set, test, start, stop, status');
    process.exit(1);
}

const { getWalletAddress } = require('./verifier');

let idCounter = 1;

function generateId() {
    const id = idCounter++;
    return id;
}

function list(config) {
    return config.alerts || [];
}

function add(config, alertData) {
    const alertsList = config.alerts || [];

    const alert = {
        id: generateId(),
        ...alertData,
        lastCheck: null,
        lastPrice: null
    };

    alertsList.push(alert);
    config.alerts = alertsList;

    return alert.id;
}

function remove(config, id) {
    const alertsList = config.alerts || [];
    const initialLength = alertsList.length;

    const filtered = alertsList.filter(alert => alert.id !== id);

    config.alerts = filtered;

    return alertsList.length - filtered.length;
}

function set(config, id, option, value) {
    const alertsList = config.alerts || [];
    const alert = alertsList.find(a => a.id === id);

    if (!alert) {
        throw new Error(`Alert not found (ID: ${id})`);
    }

    switch (option) {
        case 'trigger':
            alert.trigger = value;
            break;
        case 'channel':
            alert.channel = value;
            break;
        case 'interval':
            alert.interval = parseInt(value);
            break;
        default:
            throw new Error(`Invalid option: ${option}`);
    }

    return alertsList.length;
}

function checkTrigger(alert, currentPrice) {
    // Parse trigger: ">0.007 ETH" or "<0.007 ETH" or ">5%" or "<5%"
    const match = alert.trigger.match(/^([<>])([\d.]+)?%?([\w\s]+)?$/i);

    if (!match) {
        console.error(`⚠️  Invalid trigger format: ${alert.trigger}`);
        return false;
    }

    const operator = match[1];
    const value = parseFloat(match[2]);
    const unit = (match[3] || '').trim().toLowerCase();

    let threshold = value;
    let change = null;

    // Check if it's a percentage
    if (unit.includes('%')) {
        change = value;
        if (operator === '>') {
            // Current price must be at least (100% + change)%
            return currentPrice > threshold;
        } else {
            // Current price must be at most (100% - change)%
            return currentPrice < threshold;
        }
    }

    // Price-based trigger
    if (operator === '>') {
        return currentPrice > value;
    } else if (operator === '<') {
        return currentPrice < value;
    }

    return false;
}

function formatTrigger(alert) {
    return alert.trigger;
}

function formatPrice(price) {
    return price.toFixed(4) + ' ETH';
}

module.exports = {
    list,
    add,
    remove,
    set,
    checkTrigger,
    formatTrigger,
    formatPrice,
    getWalletAddress
};

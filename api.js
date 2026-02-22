const fetch = require('node-fetch');

// OpenSea API endpoints
const API_BASE = 'https://api.opensea.io/api/v2';

// Chain mappings to OpenSea slugs
const CHAIN_MAP = {
    base: 'base',
    ethereum: 'ethereum',
    polygon: 'matic-network',
    arbitrum: 'arbitrum',
    optimism: 'optimism'
};

/**
 * Get collection stats from OpenSea
 * @param {string} collectionSlug - Collection slug (e.g., "anatomy-of-pepe")
 * @param {string} chain - Chain name (e.g., "base", "ethereum")
 * @returns {Promise<Object>} Collection stats including floor price
 */
async function getCollectionStats(collectionSlug, chain) {
    const chainSlug = CHAIN_MAP[chain.toLowerCase()] || chain.toLowerCase();

    const url = `${API_BASE}/collections/${collectionSlug}/stats`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`OpenSea API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.detail || 'Failed to fetch collection stats');
        }

        return data.stats;
    } catch (error) {
        if (error.message.includes('ENOTFOUND')) {
            throw new Error('Failed to connect to OpenSea API. Check your internet connection.');
        }
        throw error;
    }
}

/**
 * Check if collection exists on OpenSea
 * @param {string} collectionSlug - Collection slug
 * @returns {Promise<boolean>}
 */
async function collectionExists(collectionSlug) {
    try {
        const url = `${API_BASE}/collection/${collectionSlug}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                return false;
            }
            throw new Error(`OpenSea API error: ${response.status}`);
        }

        const data = await response.json();
        return data.success;
    } catch (error) {
        // If we can't reach the API, assume collection might exist
        return true;
    }
}

/**
 * Get all supported chains
 * @returns {string[]}
 */
function getSupportedChains() {
    return Object.keys(CHAIN_MAP);
}

module.exports = {
    getCollectionStats,
    collectionExists,
    getSupportedChains
};

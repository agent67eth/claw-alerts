// Simple test script to verify basic functionality

const path = require('path');
const fs = require('fs');

console.log('🧪 Claw Alerts Test Suite');
console.log('');

// Test 1: Verify directories exist
console.log('📁 Checking directories...');
const dirs = ['src', 'data', 'templates'];
let allExist = true;

dirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    const exists = fs.existsSync(dirPath);
    console.log(`  ${exists ? '✅' : '❌'} ${dir}/`);
    if (!exists) allExist = false;
});

if (!allExist) {
    console.error('\n❌ Some directories are missing!');
    process.exit(1);
}

console.log('');

// Test 2: Verify files exist
console.log('📄 Checking files...');
const files = [
    'src/cli.js',
    'src/verifier.js',
    'src/alerts.js',
    'src/api.js',
    'src/notifier.js',
    'SKILL.md',
    'package.json'
];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    const exists = fs.existsSync(filePath);
    console.log(`  ${exists ? '✅' : '❌'} ${file}`);
    if (!exists) allExist = false;
});

if (!allExist) {
    console.error('\n❌ Some files are missing!');
    process.exit(1);
}

console.log('');

// Test 3: Check dependencies
console.log('📦 Checking dependencies...');
try {
    // Try to load modules
    require('./src/verifier');
    require('./src/alerts');
    require('./src/api');
    require('./src/notifier');
    console.log('  ✅ All modules load successfully');
} catch (error) {
    console.error(`  ❌ Module loading failed: ${error.message}`);
    allExist = false;
}

console.log('');

// Test 4: Verify package.json
console.log('📋 Verifying package.json...');
try {
    const pkg = require('./package.json');
    if (pkg.name === 'claw-alerts' && pkg.version) {
        console.log(`  ✅ package.json is valid`);
        console.log(`     Name: ${pkg.name}`);
        console.log(`     Version: ${pkg.version}`);
    } else {
        console.error('  ❌ package.json has issues');
        allExist = false;
    }
} catch (error) {
    console.error(`  ❌ package.json error: ${error.message}`);
    allExist = false;
}

console.log('');

if (allExist) {
    console.log('✅ All tests passed!');
    process.exit(0);
} else {
    console.error('❌ Some tests failed!');
    process.exit(1);
}

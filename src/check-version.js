import https from 'https';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { version } = require('../package.json');

export const checkForUpdates = () => {
    return new Promise((resolve) => {
        const req = https.get('https://registry.npmjs.org/aprog/latest', (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const latest = JSON.parse(data).version;
                    if (latest !== version) {
                        console.log(`\n🔔 Доступна нова версія aprog: v${latest} (встановлена: v${version})`);
                        console.log(`👉 Оновити: npm install -g aprog\n`);
                    }
                } catch (err) {
                    // нічого, просто мовчимо
                }
                resolve();
            });
        });

        req.on('error', () => resolve());
    });
};

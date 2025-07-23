import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const force = process.argv.includes('--force');

/**
 * Копіює файл, якщо його ще нема, або перезаписує, якщо --force
 */
function copyFile(from, to) {
    fs.mkdirSync(path.dirname(to), { recursive: true });

    if (!fs.existsSync(to) || force) {
        fs.copyFileSync(from, to);
        console.log(`✅  Копійовано: ${to}`);
        console.log("");
    } else {
        console.log(`ℹ️ Пропущено (вже існує): ${to}`);
        console.log("");
    }
}

/**
 * Копіює всі .js файли з src/constructs у resources/js/components/constructs
 */
function copyConstructs() {
    const srcDir = path.resolve(__dirname, 'src/constructs');
    const destDir = path.resolve(process.cwd(), 'resources/js/components/constructs');

    if (!fs.existsSync(srcDir)) {
        console.error(`❌ Не знайдено директорії: ${srcDir}`);
        process.exit(1);
    }

    const files = fs.readdirSync(srcDir);

    files.forEach(file => {
        const from = path.join(srcDir, file);
        const to = path.join(destDir, file);

        if (fs.statSync(from).isFile() && path.extname(from) === '.js') {
            copyFile(from, to);
        }
    });
}

console.log('📦 Починаю копіювання файлів з Aprog...');
console.log("");
copyConstructs();
console.log('🏁 Готово.');
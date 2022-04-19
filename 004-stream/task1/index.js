const readline = require('readline');
const path = require('path');
const fs = require('fs');
const fsP = require('fs/promises');
const yargs = require('yargs/yargs');
const { hideBin } = require("yargs/helpers");

const args = yargs(hideBin(process.argv)).argv;
const input = readline.createInterface(process.stdin, process.stdout);
const question = text =>
    new Promise(resolve => input.question(text, resolve));

const fileName = args.fileName || args.f;
const currDir = path.resolve(__dirname);

if (!fileName) {
    console.log('Для игры необходимо указать название файла, куда будут записываться логи игры.\nДля этого воспользуйтесь параметрами -f или --file-name');
    process.exit(0);
}

const file = path.join(currDir, `${fileName}.json`);

let fileData;
try {
    fileData = JSON.parse(fs.readFileSync(file, 'utf-8'));
} catch(e) {}

const initialData = { games: [] };
function updateFile(data = initialData) {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    } catch(e) {
        throw new Error('Не удалось создать или записать файл');
    }
}

if (!fileData) {
    fileData = initialData;
    updateFile();
}

function getMagicNumber() {
    return Math.round(Math.random()) + 1;
}
let magicNumber = getMagicNumber();

(async() => {
    while(true) {
        const value = await question('1 или 2? ');

        if (value === 'exit') {
            input.close();
        }

        const game = {
            id: fileData.games.length + 1,
        }

        if (Number(value) === magicNumber) {
            game.result = 'win';
        } else {
            game.result = 'lose';
        }
        fileData.games.push(game)
        updateFile(fileData);

        magicNumber = getMagicNumber();
    }
})();

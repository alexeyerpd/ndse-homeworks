const path = require('path');
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const args = yargs(hideBin(process.argv)).argv;

const fileName = args.f || args.fileName;

if (!fileName) {
    console.log('Для получения анализа по игре необходим указать параметры -f или --file-name с ');
    process.exit(0);
}

const file = path.join(__dirname, fileName);


function analization(data) {
    const games = data.games;
    const result = {
        gamesNumber: 0,
        win: 0,
        lose: 0,
        winPercent: 0,
    }

    for (let game of games) {
        if (game.result === 'win') {
            result.win += 1;
        } else {
            result.lose += 1;
        }
        result.gamesNumber += 1;
    }

    result.winPercent = result.win / (result.win + result.lose) * 100;

    return result;
}

function showAnalize(data) {
    console.log(`общее количество партий - ${data.gamesNumber}`);
    console.log(`количество выигранных / проигранных партий - ${data.win} / ${data.lose}`);
    console.log(`процентное соотношение выигранных партий - ${data.winPercent}%`);
}

fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    const analize = analization(JSON.parse(data));
    showAnalize(analize);
});

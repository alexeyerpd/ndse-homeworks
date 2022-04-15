#!/usr/bin/env node

const readline = require('readline');

const input = readline.createInterface(process.stdin, process.stdout);

const question = text =>
    new Promise(resolve => input.question(text, resolve));
    
const magicValue = Math.round(Math.random() * 100);

(async() => {
        let value;
        let count = 0;
        while(true) {
            if (!Number.isFinite(Number(value)) && count > 0) {
                value = await question('Введенное значение должно быть числом!\n');
                continue;
            }

            if (count === 0) {
                value = await question('Загадано число в диапазоне от 0 до 100\n');
            } else {
                value = await question(Number(value) > magicValue ? 'Меньше\n' : 'Больше\n');
            }

            count++;
            
            if (value == magicValue) {
                console.log(`Отгадано число <${value}> за ${count} шагов! Ура!`);
                input.close();
                return
            }
        }
})();

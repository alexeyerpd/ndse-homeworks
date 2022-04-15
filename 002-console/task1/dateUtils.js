#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const operations = {
    add: (...vals) => vals.reduce((curr, v) => curr + v),
    sub: (...vals) => vals.reduce((curr, v) => curr - v),
};

function updateDate(date, val, mode, op) {
    if (mode === "year") {
        const currentYear = date.getFullYear();
        date.setFullYear(operations[op](currentYear, val));
    }
    if (mode === "month") {
        const currentMonth = date.getMonth();
        date.setMonth(operations[op](currentMonth, val));
    }
    if (mode === "date") {
        const currentDate = date.getDate();
        date.setDate(operations[op](currentDate, val));
    }
}

yargs(hideBin(process.argv))
    .command(
        ["current"],
        "Получение текущей даты",
        () => {},
        (argv) => {
            const { _, $0, ...mods } = argv;
            const currentDate = new Date();
            if (!Object.keys(mods).length) {
                console.log(currentDate.toISOString());
                return;
            }

            if (mods.year || mods.y) {
                console.log(currentDate.getFullYear());
            }
            if (mods.month || mods.m) {
                console.log(
                    currentDate.toLocaleString("ru", { month: "long" })
                );
            }
            if (mods.date || mods.d) {
                console.log(currentDate.getDate());
            }
        }
    )
    .command(
        ["add"],
        "Изменение даты вперед",
        () => {},
        (argv) => {
            const { _, $0, ...mods } = argv;

            let currentDate = new Date();
            const year = mods.year ?? mods.y;
            if (typeof year !== "undefined") {
                updateDate(currentDate, Number(year), 'year', 'add');
            }

            const month = mods.month ?? mods.m;
            if (typeof month !== "undefined") {
                updateDate(currentDate, Number(month), 'month', 'add');
            }

            const date = mods.date ?? mods.d;
            if (typeof date !== "undefined") {
                updateDate(currentDate, Number(date), 'date', 'add');
            }
            console.log(currentDate.toISOString());
        }
    )
    .command(
        ["sub"],
        "Изменение даты назад",
        () => {},
        (argv) => {
            const { _, $0, ...mods } = argv;
            let currentDate = new Date();

            const year = mods.year ?? mods.y;
            if (typeof year !== "undefined") {
                updateDate(currentDate, Number(year), 'year', 'sub');
            }

            const month = mods.month ?? mods.m;
            if (typeof month !== "undefined") {
                updateDate(currentDate, Number(month), 'month', 'sub');
            }

            const date = mods.date ?? mods.d;
            if (typeof date !== "undefined") {
                updateDate(currentDate, Number(date), 'date', 'sub');
            }
            console.log(currentDate.toISOString());
        }
    ).argv;

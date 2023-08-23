import Excel from 'exceljs';

import * as path from 'path';
import * as figlet from 'figlet';
import { Generator } from './generator';
import { exit } from 'process';

// Script Entrypoint
const main = async () => {
    console.log(figlet.textSync("Test Script Generator"));

    const excelFileName = process.argv.find(val => val.includes(".xlsm"));

    if (excelFileName) {
        const filePath = path.resolve(__dirname+"/../inputs", excelFileName);
        const workbook = await (new Excel.Workbook()).xlsx.readFile(filePath);
    
        new Generator(workbook, __dirname+"/../").generateTestScripts();

        exit(0);
    }
   
    console.log("> The provided excel was invalid");
    exit(-1);
}

main().then();
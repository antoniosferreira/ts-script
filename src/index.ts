import Excel from 'exceljs';
import * as path from 'path';
import * as figlet from 'figlet';


const main = async (filePath: string) => {
  const workbook = new Excel.Workbook();
  console.log(filePath);
  const content = await workbook.xlsx.readFile(filePath);
};

console.log(figlet.textSync("Test Generator"));
const filePath = path.resolve(__dirname, process.argv[2]);
main(filePath).then();
import Excel from 'exceljs';
import { ScenarioType } from '../models/acceptance-criteria.model';

export function getCellValueAsString(row: Excel.Row, cellIndex: number) : string {
    const cell = row.getCell(cellIndex);  
    return cell.text ? cell.text.toString() : '';
}

export function getCellValueAsStringArray(row: Excel.Row, cellIndex: number) : string[] {
    const cell = row.getCell(cellIndex);  
    return cell.text ? cell.text.toString().split(/\r?\n/) : [''];
}

export function getCellValueAsBool(row: Excel.Row, cellIndex: number) : boolean {
    const cell = row.getCell(cellIndex); 
    if (cell.text 
        && cell.text.toString().toLowerCase() === "yes") {
        return true;
    } 
    return false;
}

export function getCellValueAsScenarioType(row: Excel.Row, cellIndex: number) : ScenarioType {
    const cell = row.getCell(cellIndex); 
    if (cell.text 
        && cell.text.toString().toLowerCase() === "success") {
        return ScenarioType.Success;
    } 
    return ScenarioType.Insuccess;
}

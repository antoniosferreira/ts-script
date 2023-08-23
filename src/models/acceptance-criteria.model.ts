import { Workbook } from 'exceljs';
import { getCellValueAsString, getCellValueAsBool, getCellValueAsScenarioType, getCellValueAsStringArray } from '../helpers/excel-getters.util';

export interface AcceptanceCriteria {
    id: string;
    partOf: string;
    userStoryId: string;
    userStoryName: string;
    name: string;
    dataEntity: string;
    dataEntityValue: string;
    toGenerate: boolean;
    actor: string;
    given: string[];
    when: string[];
    then: string[]; 
    scenarioType: ScenarioType;
}

export enum ScenarioType {
    Success = "Success",
    Insuccess = "Insuccess"
}

export function loadAcceptanceCriteria(workbook: Workbook) : AcceptanceCriteria[] {
    const worksheet = workbook.worksheets.find((s) => s.name === "R.AcceptanceCriteria")!;
    const rowStartIndex = 8;
    const numberOfRows = worksheet.rowCount - 7;
    const rows = worksheet.getRows(rowStartIndex, numberOfRows) ?? [];
    
    const acc = rows.map((row: any): AcceptanceCriteria => {
        return {
            id: getCellValueAsString(row,1),
            partOf: getCellValueAsString(row,2),
            userStoryId: getCellValueAsString(row,3),
            userStoryName: getCellValueAsString(row,4),
            name: getCellValueAsString(row,5),
            dataEntity: getCellValueAsString(row,6),
            dataEntityValue: getCellValueAsString(row,7),
            toGenerate: getCellValueAsBool(row,8),
            actor: getCellValueAsString(row,9),
            given: getCellValueAsStringArray(row,10),
            when: getCellValueAsStringArray(row,11),
            then: getCellValueAsStringArray(row,12),
            scenarioType: getCellValueAsScenarioType(row,13),
        }
      });
    return acc;
}
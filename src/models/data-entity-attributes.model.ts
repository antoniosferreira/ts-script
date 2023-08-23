import { Workbook } from 'exceljs';
import { getCellValueAsString, getCellValueAsBool, getCellValueAsScenarioType, getCellValueAsStringArray } from '../helpers/excel-getters.util';

export interface DataEntityAttribute {
    id: string;
    partOf: string;
    attributeId: string;
    type: string;
    description: string;
    isReadOnly: boolean;
    isEncrypted: boolean;
    constraints: string;
    foreignDataEntity: string;
    regexRule: string;
}

export class DataEntityAttributes {
    private static instance: DataEntityAttributes;

    values : DataEntityAttribute[] = [];

    private constructor(workbook: Workbook) {
        this.values = this.loadDataEntityAttributes(workbook);
     }

    public static getInstance(workbook?: Workbook): DataEntityAttributes {
        if (!DataEntityAttributes.instance) {
            DataEntityAttributes.instance = new DataEntityAttributes(workbook!);
        }

        return DataEntityAttributes.instance;
    }

    private loadDataEntityAttributes(workbook: Workbook) : DataEntityAttribute[] {
        const worksheet = workbook.worksheets.find((s) => s.name === "Object.DataEntityAttributes")!;
        const rowStartIndex = 6;
        const numberOfRows = worksheet.rowCount - 5;
        const rows = worksheet.getRows(rowStartIndex, numberOfRows) ?? [];
        
        const dta = rows.map((row: any): DataEntityAttribute => {
            return {
                id: getCellValueAsString(row,1),
                partOf: getCellValueAsString(row,2),
                attributeId: getCellValueAsString(row,3),
                type: getCellValueAsString(row,4),
                description: getCellValueAsString(row,5),
                isReadOnly: getCellValueAsBool(row,6),
                isEncrypted: getCellValueAsBool(row,7),
                constraints: getCellValueAsString(row,8),
                foreignDataEntity: getCellValueAsString(row,9),
                regexRule: getCellValueAsString(row,10)
            }
          });
        return dta;
    }
}
import { Workbook } from 'exceljs';
import { getCellValueAsString, getCellValueAsBool} from '../helpers/excel-getters.util';

export interface DataEntityValue {
    id?: string;
    dataEntityId?: string;
    attribute?: string;
    type?: string;
    value?: string;
    isValid?: boolean;
}


export class DataEntityValues {
    private static instance: DataEntityValues;

    values : DataEntityValue[] = [];

    private constructor(workbook: Workbook) {
        this.values = this.loadDataEntityValues(workbook);
     }

    public static getInstance(workbook?: Workbook): DataEntityValues {
        if (!DataEntityValues.instance) {
            DataEntityValues.instance = new DataEntityValues(workbook!);
        }

        return DataEntityValues.instance;
    }

    public containsDataEntity(identifier: string) : boolean {
        return this.values.filter(dataEntity => dataEntity.id === identifier) ? true : false;
    }

    private loadDataEntityValues(workbook: Workbook) : DataEntityValue[] {
        const worksheet = workbook.worksheets.find((s) => s.name === "Object.DataEntityValues")!;
        const rowStartIndex = 6;
        const numberOfRows = worksheet.rowCount - 5;
        const rows = worksheet.getRows(rowStartIndex, numberOfRows) ?? [];
        
        const values = rows.map((row: any): DataEntityValue => {
            return {
                id: getCellValueAsString(row,1),
                dataEntityId: getCellValueAsString(row,2),
                attribute: getCellValueAsString(row,3),
                type: getCellValueAsString(row,4),
                value: getCellValueAsString(row,5),
                isValid: getCellValueAsBool(row,6),
            }
          });
    
        return values;
    }
}
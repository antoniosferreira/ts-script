import { substringFromDelimeters } from "../helpers/utils.util";
import { DataEntityValues } from "../models/data-entity-value.model";
import { Instruction } from "./instruction";
import { Test } from "../models/test.model";
import { DataEntityAttributes } from "../models/data-entity-attributes.model";

export class WriteInstruction extends Instruction { 
    private dataEntityValues = DataEntityValues.getInstance().values;   
    private dataEntityAttributes = DataEntityAttributes.getInstance().values;

    public processInstruction(currentTest: Test, instruction: string) : void {
        const fieldName = instruction.split(' ').at(-1)! + "_field";
        
        if (!this.testResources.variableAlreadyExists(fieldName)) {
            this.testResources.addVariable(fieldName);
        }

        const keywordTitle = "Write on " + fieldName ;
        const keywordSteps = [
            "[Arguments]\t${value}",
            "SeleniumLibrary.Input Text\txpath=//input[contains(@name, '${" + fieldName + "}')]\t${value}",
        ];

        if (!this.testResources.keywordAlreadyExists(keywordTitle)) {
            this.testResources.addKeyword(keywordTitle, keywordSteps);
        }

        // Value to be written
        var value = instruction.split(' ')[2];
        
        // If hard-coded value
        if (instruction.includes('"')) {
            value = substringFromDelimeters(instruction, '"');
            currentTest.addStep(keywordTitle + "\t" + value);
        } 

        // If value comes from data entity
        else if (value.includes(".") && this.dataEntityValues.filter(dataEntity => dataEntity.id === value.split(".")[0])) {
            const referencedValue = value.split(".");
            const concreteValue = this.dataEntityValues.find(
                (element) => element.id == referencedValue.at(referencedValue.length-2) && element.attribute == referencedValue.at(-1))?.value;
            
            currentTest.addStep(keywordTitle + "\t" + "\t" + concreteValue);
        }

        // If value to be generated
        else if (instruction.includes("generated")) {
            const varName = instruction.split(' ')[3];
            const regex = this.dataEntityAttributes.filter(dta => dta.attributeId === varName).at(0)!.regexRule!;
            currentTest.addVariableWithValueToBeGenerated(varName, regex);
            currentTest.addStep(keywordTitle + "\t${" + varName + "}")
        }

        // If value to be refined later
        else {
            currentTest.addStep(keywordTitle + "\t${" + value + "}");
            currentTest.addVariable(value);
        }
    }
}

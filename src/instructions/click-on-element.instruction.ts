import { Instruction } from "./instruction";
import { Test } from "../models/test.model";

export class ClickOnElementInstruction extends Instruction {    

    public processInstruction(currentTest: Test, instruction: string) : void {
        const identifierName = instruction.split(' ').at(-1)! + "_element";
        
        if (!this.testResources.variableAlreadyExists(identifierName)) {
            this.testResources.addVariable(identifierName);
        }

        const keywordTitle = "Click On Element " + identifierName;
        const keywordSteps = [
            "SeleniumLibrary.Click Element\t//a[contains(@href,'${" + identifierName + "}')]",
        ];

        if (!this.testResources.keywordAlreadyExists(keywordTitle)) {
            this.testResources.addKeyword(keywordTitle, keywordSteps);
        }

        currentTest.addStep(keywordTitle);
    } 
}



 
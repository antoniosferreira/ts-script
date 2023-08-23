import { Test } from "../models/test.model";
import { Instruction } from "./instruction";

export class ClickOnButtonInstruction extends Instruction {    

    public processInstruction(currentTest: Test, instruction: string) : void {
        const identifierName = instruction.split(' ').at(-1)! + "_button";
        
        if (!this.testResources.variableAlreadyExists(identifierName)) {
            this.testResources.addVariable(identifierName);
        }

        const keywordTitle = "Click On Button " + identifierName;
        const keywordSteps = [
            "SeleniumLibrary.Click Button\txpath=//button[contains(@class, '${" + identifierName + "}')]",
        ];

        if (!this.testResources.keywordAlreadyExists(keywordTitle)) {
            this.testResources.addKeyword(keywordTitle, keywordSteps);
        }

        currentTest.addStep(keywordTitle);
    } 
}



 
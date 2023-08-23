import { Instruction } from "./instruction";
import { Test } from "../models/test.model";

export class CheckOnPageInstruction extends Instruction {    

    public processInstruction(currentTest: Test, instruction: string) : void {
        const identifierName = instruction.split(' ').at(-1)! + "_page";
        
        if (!this.testResources.variableAlreadyExists(identifierName)) {
            this.testResources.addVariable(identifierName);
        }

        const keywordTitle = "Check On Page " + identifierName;
        const keywordSteps = [
            "Location Should Be\t${" + identifierName + "}",
        ];

        if (!this.testResources.keywordAlreadyExists(keywordTitle)) {
            this.testResources.addKeyword(keywordTitle, keywordSteps);
        }

        currentTest.addStep(keywordTitle);
    } 
}


 
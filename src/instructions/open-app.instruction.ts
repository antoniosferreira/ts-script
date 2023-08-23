import { Instruction } from "./instruction";
import { Test } from "../models/test.model";

export class OpenAppInstruction extends Instruction {    

    public processInstruction(currentTest: Test, instruction: string) : void {
        const identifierName = "APP_URL";

        if (!this.testResources.variableAlreadyExists(identifierName)) {
            this.testResources.addVariable(identifierName);
        }

        const keywordTitle = "Open App";
        const keywordSteps = [
            "Open Browser\t${" + identifierName + "}\tChrome", 
            "Maximize Browser Window", 
            "Set Selenium Speed\t0"
        ];

        if (!this.testResources.keywordAlreadyExists(keywordTitle)) {
            this.testResources.addKeyword(keywordTitle, keywordSteps);
        }

        currentTest.addStep(keywordTitle);
    } 
}
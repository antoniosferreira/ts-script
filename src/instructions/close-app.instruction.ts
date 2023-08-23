import { Instruction } from "./instruction";
import { Test } from "../models/test.model";

export class CloseAppInstruction extends Instruction {    

    public processInstruction(currentTest: Test, instruction: string) : void {
        const keywordTitle = "Close App";
        const keywordSteps = [
            "Close Browser"
        ];

        if (!this.testResources.keywordAlreadyExists(keywordTitle)) {
            this.testResources.addKeyword(keywordTitle, keywordSteps);
        }

        currentTest.addStep(keywordTitle);
    } 
}
import { NOT_FILLED_VALUE_STRING, NUMBER_GENERATED_VALUES } from "../helpers/constants.util";
import { AcceptanceCriteria, ScenarioType } from "./acceptance-criteria.model";
import { GeneratedVariable } from './generated-variable.model';
import { Instruction } from "../instructions";

export class Test {
    private testName : string;
    private isSuccessful : boolean;
    private isToGenerateInputs: boolean;

    private variables : { [identifier: string] : string } = {};
    private generatedVariablesWithValue : GeneratedVariable[] = [];

    private steps : string[] = [];


    constructor(acceptanceCriteria : AcceptanceCriteria) {
        this.testName = acceptanceCriteria.name;
        this.isSuccessful = acceptanceCriteria.scenarioType === ScenarioType.Success;
        this.isToGenerateInputs = acceptanceCriteria.toGenerate;

        this.processAcceptanceCriteria(acceptanceCriteria);
    }

    public getTestName() : string {
        return this.testName;
    }

    public setTestName(testName: string) {
        this.testName = testName;
    }

    public getSteps() : string[] {
        return this.steps;
    }

    public isSuccessfulCase() : boolean {
        return this.isSuccessful;
    }

    public getVariables() : { [identifier: string] : string } {
        return this.variables;
    }

    public isToGenerateValues() : boolean {
        return this.isToGenerateInputs;
    }

    public getGeneratedVariablesWithValue() : GeneratedVariable[] {
        return this.generatedVariablesWithValue;
    }

    public variableAlreadyExists(identifier: string) {
        return this.variables[identifier] ? true : false;
    }

    public addVariable(identifier: string, value?: string) {
        this.variables[identifier] = value ?? NOT_FILLED_VALUE_STRING;
    }

    public addVariableWithValueToBeGenerated(identifier: string, regex: string) {
        this.generatedVariablesWithValue.push(new GeneratedVariable(identifier, regex));
    }

    public addStep(step : string) {
        this.steps.push(step);
    }


    private processAcceptanceCriteria(acceptanceCriteria: AcceptanceCriteria) {
        acceptanceCriteria.given.forEach((instruction) => {
            Instruction.process(this, instruction);
        });
        acceptanceCriteria.when.forEach((instruction) => {
            Instruction.process(this, instruction);
        });
        acceptanceCriteria.then.forEach((instruction) => {
            Instruction.process(this, instruction);
        });
    }
}
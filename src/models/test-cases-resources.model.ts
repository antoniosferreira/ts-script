import { NOT_FILLED_VALUE_STRING } from "../helpers/constants.util";

export class TestCasesResources {
    private static instance: TestCasesResources;

    private variables : { [identifier: string] : string } = {};
    private keywords : { [title: string] : string[] } = {};

    // Singleton
    private constructor() { }


    public static getInstance(): TestCasesResources {
        if (!TestCasesResources.instance) {
            TestCasesResources.instance = new TestCasesResources();
        }

        return TestCasesResources.instance;
    }


    public getAllVariables() : { [identifier: string] : string } {
        return this.variables;
    }

    public getAllKeywords() : { [title: string] : string[] } {
        return this.keywords;
    }


    public variableAlreadyExists(identifier : string) : boolean {
        return this.variables[identifier] ? true : false;
    }

    public keywordAlreadyExists(title : string) : boolean {
        return this.keywords[title] ? true : false;
    }


    public addVariable(identifier: string, value?: string) {
        if (!this.variableAlreadyExists(identifier)) {
            this.variables[identifier] = value ?? NOT_FILLED_VALUE_STRING;
        }
    }

    public addKeyword(title: string, steps?: string[]) {
        if (!this.keywordAlreadyExists(title)) {
            this.keywords[title] = steps ?? [];
        }
    }

    
    public updateVariableValue(identifier: string, value: string) {
        this.variables[identifier] = value;
    }

    public addStepToKeyword(title: string, value: string) {
        if (this.keywordAlreadyExists(title)) {
            this.keywords[title].push(value);
        }
    }

    
    public toString() : string {
        var stringVariables = "*** Variables ***\n";
        for (const identifier in this.variables) {
            stringVariables = stringVariables.concat("\n${" + identifier + "}\t" + this.variables[identifier]);
        }

        var stringKeywords = "*** Keywords ***\n";
        for (const title in this.keywords) {
            stringKeywords = stringKeywords.concat("\n" + title);

            this.keywords[title].forEach(step => 
                stringKeywords = stringKeywords.concat("\n\t" + step));

            stringKeywords += "\n";
        }


        return stringVariables + "\n\n" + stringKeywords;
    }
}
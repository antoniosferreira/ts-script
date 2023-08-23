import { test } from "node:test";
import { Test } from "./test.model";

export class TestCase {
    title : string;
    tests : { [testName: string] : Test } = {};

    constructor(title: string) {
        this.title = title;
    }

    public getTitle() : string {
        return this.title;
    }

    public getTestCase(testName: string) : Test {
        return this.tests[testName] ?? null;
    }

    public testCaseAlreadyExists(testName: string) : boolean {
        return this.tests[testName] ? true : false;
    } 

    public addTest(test : Test) {

        // If duplicated test name, we're adding a _ on top
        if (this.testCaseAlreadyExists(test.getTestName())) {
            test.setTestName("_" + test.getTestName());
            this.addTest(test);
        }

        this.tests[test.getTestName()] = test;
    }
    

    public toString() : string {
        
        var stringVariables = "*** Variables ***\n";

        // Gathers first all internal variables from the tests
        const variables : { [identifier: string] : string } = {};
        for (const testName in this.tests) {
            for (const identifier in this.tests[testName].getVariables()) {
                variables[identifier] = this.tests[testName].getVariables()[identifier];
            }
        }
        
        for (const identifier in variables) {
            stringVariables = stringVariables.concat("\n${" + identifier + "}\t" + variables[identifier]);
        }

        // Test cases (templates)
        var stringTemplates = "*** Test Cases ***";
        
        for (const testName in this.tests) {
            var currentTest = this.tests[testName];
            
            // Templates variable values
            var stringValidGeneratedValues = "\n";
            var stringInvalidGeneratedValues = "\n";
            var idIndex = 0;
            while (idIndex < 3) {
                currentTest.getGeneratedVariablesWithValue().forEach(generatedVariable => {
                    stringValidGeneratedValues += "\t" + generatedVariable.getValidValues()[idIndex];
                    stringInvalidGeneratedValues += "\t" + generatedVariable.getInvalidValues()[idIndex];
                });

                stringValidGeneratedValues += "\n";
                stringInvalidGeneratedValues += "\n";

                idIndex += 1;
            };            

            // Success Template
            stringTemplates += "\n\nTemplate " + testName;
            stringTemplates += "\n\t[Template]\t" + testName;
            stringTemplates += stringValidGeneratedValues;

            if (currentTest.isToGenerateValues()) {
                // Insuccess Template
                stringTemplates += "\n\nTemplate Failing" + testName;
                stringTemplates += "\n\t[Template]\t" + testName + " Failure";
                stringTemplates += stringInvalidGeneratedValues;
            }
        }

        // Keywords (test steps)
        var stringSteps = "*** Keywords ***";
        for (const testName in this.tests) {
            var currentTest = this.tests[testName];

            var argumentsLine = "";
            var stringGeneratedVariables = "";
            if (currentTest.isToGenerateValues()) {
                argumentsLine += '[Arguments]';
                currentTest.getGeneratedVariablesWithValue().forEach(generatedVariable => {
                    stringGeneratedVariables += '\t${' + generatedVariable.getIdentifier() + '}';
                });
                argumentsLine += stringGeneratedVariables;
            }

            // Success Keyword
            stringSteps += "\n\n" + testName;
            stringSteps += argumentsLine === "" ? "" : "\n\t" + argumentsLine;
            currentTest.getSteps().forEach(
                step => stringSteps += "\n\t" + step);

            // Insuccess Keyword
            if (currentTest.isToGenerateValues()) {
                stringSteps += "\n\n" + testName + " Failure";
                stringSteps += "\n\t" + argumentsLine;
                stringSteps += "\n\tRun Keyword And Expect Error\t*\t" + testName + "\t" + stringGeneratedVariables;
            }
        }

        return stringVariables + "\n\n" + stringTemplates + "\n\n" + stringSteps;
    }
}
import { Workbook } from "exceljs";
import { createTestsDirectory } from "./helpers/dir.util";
import { AcceptanceCriteria, loadAcceptanceCriteria } from "./models/acceptance-criteria.model";
import { writeFileSync } from "fs";
import { join } from "path";
import { TestCasesResources } from "./models/test-cases-resources.model";
import { TestCase } from "./models/test-case.model";
import { Test } from "./models/test.model";
import { DataEntityValues } from "./models/data-entity-value.model";
import { DataEntityAttributes } from "./models/data-entity-attributes.model";
import { GENERATED_FOLDER_NAME } from "./helpers/constants.util";


export class Generator {
    private currentDir : string;

    // Excel data
    private acceptanceCriteria : AcceptanceCriteria[];
 
    // Initialize Structural variables
    private testCasesResources : TestCasesResources = TestCasesResources.getInstance();
    private testCases : { [usid: string] : TestCase } = {};


    constructor(workbook: Workbook, currentDir: string) {
        this.currentDir = currentDir;
        this.acceptanceCriteria = loadAcceptanceCriteria(workbook);
        DataEntityValues.getInstance(workbook);
        DataEntityAttributes.getInstance(workbook);
    }


    public generateTestScripts() {
        
        // Create Tests Directory
        createTestsDirectory(this.currentDir + "/" + GENERATED_FOLDER_NAME);
        
        // Map AC to internal representation
        this.acceptanceCriteria.forEach(ac => {

            // Does a test case already exist for this AC?
            if (this.testCases[ac.userStoryName] == null) {
                this.testCases[ac.userStoryName] = new TestCase(ac.name);
            }

            this.testCases[ac.userStoryName].addTest(new Test(ac));
        })
       
        this.writeResourcesFile();
        for (const testName in this.testCases) {
            this.writeTestFile(this.testCases[testName]);
        }

        console.log('\n> Script terminated successfully. The generated test scripts are available in the outputs directory')
    }

    private writeResourcesFile() {
        const header = "*** Settings ***\nDocumentation\tThis is a resource file, that can contain variables and keywords.\nLibrary\tSeleniumLibrary\n\n"
    
        writeFileSync(join(this.currentDir, GENERATED_FOLDER_NAME,'resources.robot'), 
            header + this.testCasesResources.toString(), {
                flag: 'w',
            });
    }

    private writeTestFile(testCase : TestCase) {
        const header = "*** Settings ***\nDocumentation\tA test suite for " + testCase.getTitle() + "\nResource\tresources.robot\nDefault Tags\tpositive";
        const fileName = (testCase.getTitle() + ".robot").replace(/ /g, '');

        writeFileSync(join(this.currentDir, GENERATED_FOLDER_NAME, fileName), 
            header + "\n\n" + testCase.toString(), {
                flag: 'w',
            });
    }
}

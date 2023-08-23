import { TestCasesResources } from "../models/test-cases-resources.model";
import { Test } from "../models/test.model";
import { ClickOnElementInstruction, ClickOnButtonInstruction, CheckOnPageInstruction, OpenAppInstruction, WriteInstruction, CloseAppInstruction } from './index';

export abstract class Instruction {
    
    protected testResources = TestCasesResources.getInstance();
   
    constructor() { }
    
    public abstract processInstruction(currentTest: Test, instruction: string) : void; 

    public static process(currentTest: Test, instruction: string) : void {
        if (instruction === null || instruction === "") {
            return;
        }
        const instructionType = instruction.split(' ')[1];
        switch(instructionType.toLowerCase()) { 
            case 'openapp': 
            case 'openbrowser':
            {
                new OpenAppInstruction().processInstruction(currentTest, instruction);
                break;
            }
            case 'closeapp':
            case 'closebrowser': 
            {
                new CloseAppInstruction().processInstruction(currentTest, instruction);
                break;
            }
            case 'write':
            case 'fill':
            case 'set':
            case 'postdata': 
            {
                new WriteInstruction().processInstruction(currentTest, instruction);
                break;
            }
            case 'read':
            case 'get': 
            case 'getdata':
            {
                
            }
            case 'clickonelement':
            {
                new ClickOnElementInstruction().processInstruction(currentTest, instruction);
                break;
            }
            case 'clickonbutton':
            case 'submit': 
            {
                new ClickOnButtonInstruction().processInstruction(currentTest, instruction);
                break;
            }
            case 'checkonpage':
            case 'validateonpage':
            case 'verifyonpage': 
            {
                new CheckOnPageInstruction().processInstruction(currentTest, instruction);
                break;
            }
            case 'checkonelemet':
            case 'validateonelement':
            case 'verifyonelement': 
            {
                
            }
            case 'closeapp':
            case 'closebrowser': 
            {
                new CloseAppInstruction().processInstruction(currentTest, instruction);
                break;
            }
            default: {
                break;
            }
        }
    }

}
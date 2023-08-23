import { expandN } from 'regex-to-strings';
import regexpTree from 'regexp-tree';
import { NUMBER_GENERATED_VALUES } from "../helpers/constants.util";

export class GeneratedVariable {
    private identifier: string;
    private regex: string;
    private validValues : string[];
    private invalidValues : string[];

    
    constructor(identifer: string, regex: string) {
        this.identifier = identifer;
        this.regex = regex;

        this.validValues = this.generateValidValues();
        this.invalidValues = this.generateInvalidValues();
    }

    public getIdentifier() : string {
        return this.identifier;
    }

    public getValidValues() : string[] {
        return this.validValues;
    }

    public getInvalidValues() : string[] {
        return this.invalidValues;
    }


    private generateValidValues() : string[] {
        return expandN(this.regex, NUMBER_GENERATED_VALUES);
    }

    private generateInvalidValues() : string[] {

        // Create AST
        const ast = regexpTree.parse('/'+this.regex+'/');

        // Manipulate AST to generate
        // incompatible regex rule
        regexpTree.traverse(ast, {

            // Visit every node before any type-specific handlers.
            '*': function({node}) {
            
            },
          
            // Handle "Quantifier" node type.
            Quantifier({node}) {

                if (node.kind === 'Range') {

                    if (node.from === node.to) {
                        node.from = 0;
                        node.to = node.to-1;
                    } else {
                        node.from = node.to!;
                        node.to = node.to!*2;
                    }
                };
            },

            ClassRange({node}) {
                
                node.from = node.to;
                node.to = {
                    type: 'Char',
                    value: '~',
                    kind: 'simple',
                    codePoint: 126,
                }
            },
          
          });

        // Generate regex
        const newRegex = regexpTree.generate(ast);

        const invalidValues : string[] = [];
        while (invalidValues.length < NUMBER_GENERATED_VALUES) {
            const generatedValue = expandN(newRegex, 1).at(0);
            
            if (generatedValue != null && generatedValue != "" && generatedValue.trimEnd() != "") {
                invalidValues.push(generatedValue);
            }
        }

        return expandN(newRegex, NUMBER_GENERATED_VALUES);
    }

 }
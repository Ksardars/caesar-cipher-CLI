#!/usr/bin/env node

const commander = require('commander'); // (normal include)
const program = new commander.Command();


program
    .storeOptionsAsProperties(false)
    .requiredOption('-s, --shift <number>', 'a shift, mandatory field')
    .option('-i, --input <string>', 'an input file')
    .option('-o, --output <string>', 'an output file')
    .requiredOption('-a, --action <string>', 'an action encode/decode, mandatory field')


    .parse(process.argv);

program.parse(process.argv);
let { shift, input, output, action } = program.opts();

function caesarCipher (txt, shift, type) {
    let output = "";
    for (let i = 0; i < txt.length; i++) {
        let c = txt[i];
        if (c.match(/[a-z]/i)) {
            let charCode = txt.charCodeAt(i);
            if (type === 'encode') {
                if (charCode >= 65 && charCode <= 90) {
                    c = String.fromCharCode(((charCode - 65 + (26 - shift)) % 26) + 65);
                } else if (charCode >= 97 && charCode <= 122) {
                    c = String.fromCharCode(((charCode - 97 + (26 - shift)) % 26) + 97);
                }
            }else {
                if (charCode >= 65 && charCode <= 90) {
                    c = String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
                } else if (charCode >= 97 && charCode <= 122) {
                    c = String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
                }
            }
        }
        output += c;
    }
    console.log(output)
    return output;
};

caesarCipher(input, shift, action);


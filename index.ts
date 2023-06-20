import minimist from "minimist";
import {isDir, processImages} from "./functions";

const argv = minimist(process.argv.slice(2), {
    string: ["input"],
});

const input = argv.input;
if (!input) {
    console.error('Input not given');
    process.exit(1);
}
if (typeof input != "string") {
    console.error('Input not string');
    process.exit(2);
}
const inputIsDir = isDir(input);
if (!inputIsDir) {
    console.error('Input needs to be a dir');
    process.exit(3);
}

if (inputIsDir) {
    processImages(input).finally(() => console.info('Finished'));
}



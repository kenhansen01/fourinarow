import 'jasmine';
import * as chalk from 'chalk';

let suiteCount = 0;
let specCount = 0;

let addSpaces = (numberOfSpaces: number) => {
  return Array(numberOfSpaces).join(' ');
}

const reporter: jasmine.CustomReporter = {
  jasmineStarted: (suiteInfo: jasmine.SuiteInfo) => {
    console.log(chalk.bgBlue(`Running suite with ${suiteInfo.totalSpecsDefined} total spec(s).`));
  },
  suiteStarted: (result: jasmine.CustomReporterResult) => {
    suiteCount++;
    console.log(chalk.bgCyan(`${addSpaces(suiteCount * 2)}Suite started: "${result.description}"`));
  },
  specStarted: (result: jasmine.CustomReporterResult) => {
    specCount++;
    console.log(chalk.bgWhite.gray(`${addSpaces(suiteCount * 2 + specCount * 2)}Spec started: "${result.description}"`));
  },
  specDone: (result: jasmine.CustomReporterResult) => {
    console.log(chalk.green(`${addSpaces(suiteCount * 2 + specCount * 2 + 2)}Spec: "${result.description}" ${result.status}`));
    result.failedExpectations.forEach((failure) => {
      console.log(chalk.red(`${addSpaces(suiteCount * 2 + specCount * 2 + 2)}Failure: ${failure.message}`));
      console.log(chalk.red(`${addSpaces(suiteCount * 2 + specCount * 2 + 2)}${failure.stack}`));
    });
    console.log(result.passedExpectations.length);
    specCount--;
  },
  suiteDone: (result: jasmine.CustomReporterResult) => {    
    console.log(chalk.bgCyan(`${addSpaces(suiteCount * 2)}Suite: "${result.description}" ${result.status}`));
    result.failedExpectations.forEach((failure) => {
      console.log(chalk.red(`${addSpaces(suiteCount * 2 + 2)}Failure: ${failure.message}`));
      console.log(chalk.red(`${addSpaces(suiteCount * 2 + 2)}failure.stack`));
    });
    suiteCount--;
  },
  jasmineDone: () => {
    console.log('Finished Suite.')
  }
}

export = reporter;

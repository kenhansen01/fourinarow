/// <reference path="../node_modules/@types/jasmine/index.d.ts" />

declare namespace jasmine {
  interface Env {
    addReporter(reporter: CustomReporter): void;
  }

  interface SuiteInfo {
    totalSpecsDefined: number;
  }

  interface CustomReportExpectation {
    matcherName: string;
    message: string;
    passed: boolean;
    stack: string;
  }

  interface FailedExpectation extends CustomReportExpectation {
    actual: string;
    expected: string;
  }

  interface PassedExpectation extends CustomReportExpectation {

  }

  interface CustomReporterResult {
    description: string,
    failedExpectations?: FailedExpectation[],
    fullName: string,
    id: string;
    passedExpectations?: PassedExpectation[],
    pendingReason?: string;
    status?: string;
  }

  interface CustomReporter {
    jasmineStarted?(suiteInfo: SuiteInfo): void;
    suiteStarted?(result: CustomReporterResult): void;
    specStarted?(result: CustomReporterResult): void;
    specDone?(result: CustomReporterResult): void;
    suiteDone?(result: CustomReporterResult): void;
    jasmineDone?(): any;
  }
}

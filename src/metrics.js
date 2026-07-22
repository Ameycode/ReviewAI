export class Metrics {
  constructor() {
    this.startTime = Date.now();

    this.totalFiles = 0;
    this.reviewedFiles = 0;
    this.ignoredFiles = 0;

    this.batches = 0;
    this.aiCalls = 0;
    this.failedBatches = 0;

    this.executionTime = 0;
  }

  finish() {
    this.executionTime = (
      (Date.now() - this.startTime) /
      1000
    ).toFixed(2);
  }
}
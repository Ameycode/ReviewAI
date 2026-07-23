export function printMetrics(metrics) {
  console.log("");
  console.log("========================================");
  console.log("          ReviewAI Report");
  console.log("========================================");

  console.log(`Files Changed  : ${metrics.totalFiles}`);
  console.log(`Reviewed Files : ${metrics.reviewedFiles}`);
  console.log(`Ignored Files  : ${metrics.ignoredFiles}`);
  console.log(`Batches        : ${metrics.batches}`);
  console.log(`AI Calls       : ${metrics.aiCalls}`);
  console.log(`Failed Batches : ${metrics.failedBatches}`);
  console.log(`Execution Time : ${metrics.executionTime}s`);

  console.log("========================================");
}
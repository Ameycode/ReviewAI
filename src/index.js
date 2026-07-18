import fs from "fs";
import { config } from "./config.js";

const event = JSON.parse(
  fs.readFileSync(config.eventPath, "utf8")
);

const pr = event.pull_request;

console.log("========== Pull Request ==========");
console.log(`PR Number : ${pr.number}`);
console.log(`Title     : ${pr.title}`);
console.log(`Author    : ${pr.user.login}`);
console.log(`Base      : ${pr.base.ref}`);
console.log(`Head      : ${pr.head.ref}`);
console.log(`Repository: ${event.repository.full_name}`);
console.log("==================================");
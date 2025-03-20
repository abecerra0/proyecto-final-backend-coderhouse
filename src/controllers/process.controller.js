import { fork } from "child_process";
import argsUtil from "../utils/args.util.js";

const readDataOfProcess = (req, res) => {
  const { pid, argv, env } = process;
  res.json200({ pid, argv, env });
};
const readArgs = (req, res) => res.json200(argsUtil);

const sumCallback = (req, res) => {
  const child = fork("./src/utils/sum.util.js");
  child.send("start");
  child.on("message", (result) => res.json200({ result }));
};

export { readDataOfProcess, readArgs, sumCallback };

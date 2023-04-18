import busboy from "busboy";
import path from "path";
import os from "os";
import { randomFillSync } from "crypto";
import fs from "fs";

export const uploadItem = async (req, res) => {
  const bb = busboy({ headers: req.headers });
  const random = (() => {
    const buf = Buffer.alloc(16);
    return () => randomFillSync(buf).toString("hex");
  })();
  bb.on("file", (name, file, info) => {
    const saveTo = `public/assets/${info.filename}`; //path.join(os.tmpdir(), `busboy-upload-${random()}`);
    file.pipe(fs.createWriteStream(saveTo));
  });
  bb.on("close", () => {
    res.writeHead(200, { Connection: "close" });
    res.end(`That's all folks!`);
  });
  req.pipe(bb);

  // res.status(200).send("ok");
};

import archiver from "archiver";
import type { Response } from "express";
import type { GeneratedProject } from "../models/migration";

export const streamProjectZip = async (res: Response, project: GeneratedProject, name = "migration-output.zip") => {
  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", `attachment; filename=\"${name}\"`);
  const archive = archiver("zip", { zlib: { level: 9 } });
  archive.on("error", (err) => { throw err; });
  archive.pipe(res);
  project.files.forEach((f) => archive.append(f.content, { name: f.path }));
  await archive.finalize();
};

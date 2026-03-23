import type { GeneratedProject } from "../models/migration";
import { buildSpringBootProject } from "../generators/springBootProjectGenerator";

export const generatedProjectService = {
  fromArtifacts: (artifacts: Record<string, unknown>): GeneratedProject => buildSpringBootProject(artifacts)
};

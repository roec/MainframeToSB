export class PromptBuilder {
  static inventory(sourceCode: string) { return { system: "You are a legacy code migration analyst. Always return strict JSON only.", user: `Analyze COBOL:\n${sourceCode}` }; }
  static parser(sourceCode: string, inventoryOutput: unknown) { return { system: "You are a COBOL semantic parser. Always return strict JSON only.", user: `COBOL:\n${sourceCode}\nInventory:${JSON.stringify(inventoryOutput)}` }; }
  static useCase(programIR: unknown, dataIR: unknown, logicIR: unknown) { return { system: "You are a modernization architect. Always return strict JSON only.", user: JSON.stringify({ programIR, dataIR, logicIR }) }; }
  static domain(programIR: unknown, dataIR: unknown, logicIR: unknown, useCaseOutput: unknown) { return { system: "You are a domain-driven design expert. Always return strict JSON only.", user: JSON.stringify({ programIR, dataIR, logicIR, useCaseOutput }) }; }
  static persistence(dataIR: unknown, domainOutput: unknown) { return { system: "You are a Java persistence architect. Always return strict JSON only.", user: JSON.stringify({ dataIR, domainOutput }) }; }
  static generator(useCaseOutput: unknown, domainOutput: unknown, persistenceOutput: unknown) { return { system: "You are a senior Spring Boot code generator. Always return strict JSON only.", user: JSON.stringify({ useCaseOutput, domainOutput, persistenceOutput }) }; }
  static validation(generatedFilesMetadata: unknown) { return { system: "You are a code migration validator. Always return strict JSON only.", user: JSON.stringify({ generatedFilesMetadata }) }; }
}

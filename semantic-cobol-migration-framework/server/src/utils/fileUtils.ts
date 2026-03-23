export const inferLanguageFromPath = (path: string) => path.endsWith('.java') ? 'java' : path.endsWith('.xml') ? 'xml' : path.endsWith('.yml') ? 'yaml' : 'text';

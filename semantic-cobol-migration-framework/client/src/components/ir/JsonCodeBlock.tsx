import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
export const JsonCodeBlock = ({ value }: { value: unknown }) => <SyntaxHighlighter style={oneDark} language="json" customStyle={{ maxHeight: 360, overflow: "auto" }}>{JSON.stringify(value ?? {}, null, 2)}</SyntaxHighlighter>;

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { GeneratedFile } from "../../types/migration";
import { EmptyState } from "../common/EmptyState";
export const FileViewer = ({ file }: { file?: GeneratedFile }) => file ? <SyntaxHighlighter style={oneDark} language={file.language} customStyle={{ maxHeight: 480, overflow: "auto" }}>{file.content}</SyntaxHighlighter> : <EmptyState message="Select a file to inspect generated code." />;

export const cn = (...parts: Array<string | undefined | false>) => parts.filter(Boolean).join(" ");

export const formatJson = (value: unknown) => JSON.stringify(value ?? {}, null, 2);

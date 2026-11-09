export const normalizeFilename = (name: string) => name.split(".")[0]
export const slugifyFilename = (name: string) => name.replace(/\s+/g, "_").toLocaleLowerCase()
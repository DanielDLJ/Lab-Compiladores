export function clearFolders() {}

export function createFoler(folserPath: string) {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createFile(filePath: string, data: any) {}

export function getFileExtension(link: string) {
  return link.split('.').pop();
}

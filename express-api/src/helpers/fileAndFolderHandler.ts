import fs from 'fs';
import path from 'path';

const apiFolder = path.join(__dirname, '../../', 'latex');

export function clearFolders() {
  fs.rmSync(apiFolder, { recursive: true, force: true });
}

export function createFoler(folserPath: string) {
  const path = apiFolder + '/' + folserPath;
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createFile(filePath: string, data: any) {
  const path = apiFolder + '/' + filePath;
  try {
    fs.promises.writeFile(path, data);
    console.log("It's saved!", path);
  } catch (error) {
    console.log(error);
  }
}

export function getFileExtension(link: string) {
  return path.basename(link).split('.').pop();
}

export function checkPDF() {
  const pathPDF = apiFolder + '/tcc.pdf';
  const pathAUX = apiFolder + '/tcc.aux';
  const pathBBL = apiFolder + '/tcc.bbl';
  const patBLG = apiFolder + '/tcc.blg';
  const pathBRF = apiFolder + '/tcc.brf';
  const pathLOF = apiFolder + '/tcc.lof';
  const pathLOT = apiFolder + '/tcc.lot';
  const patToc = apiFolder + '/tcc.toc';

  return (
    fs.existsSync(pathPDF) &&
    fs.existsSync(pathAUX) &&
    fs.existsSync(pathBBL) &&
    fs.existsSync(patBLG) &&
    fs.existsSync(pathBRF) &&
    fs.existsSync(pathLOF) &&
    fs.existsSync(pathLOT) &&
    fs.existsSync(patToc)
  );
}

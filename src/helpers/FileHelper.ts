import { readFileSync, writeFileSync, existsSync } from 'fs';

const DATA_FILE = __dirname + '/../../db/data.json';

class FileHelpers {
  static readFileData() {
      try {  
        const data = readFileSync(DATA_FILE);

        return JSON.parse(data.toString());
      } catch(err) {
        return [];
      }
  }

  static writeFileData(jsonData: {}[]) {
    if (!jsonData.length) return;
  
    const mergedData = FileHelpers._getUniqueData(jsonData);

    const data = JSON.stringify(mergedData, null, 2);
  
    writeFileSync(DATA_FILE, data);
  }

  private static _getUniqueData(data: any) {
    const previousData = FileHelpers.readFileData();

    const idsOfPreviousData = previousData.map(({ id }) => id);
    const filteredNewData = data.filter((d) => !idsOfPreviousData.includes(d.id));

    return [...previousData, ...filteredNewData];
  }
}

export default FileHelpers;
import { readFileSync, writeFileSync, existsSync } from 'fs';

const DATA_FILE = __dirname + '/../../db/data.json';

class FileHelpers {
    /**
     * read db file if file not yet exist return empty array
     * 
     * @return []
     */
    static readFileData() {
        try {  
            const data = readFileSync(DATA_FILE);

            return JSON.parse(data.toString());
        } catch(err) {
            return [];
        }
    }

    /**
     * write unique json data to db file
     * filter data before save check if id already exist or not
     * 
     * @param jsonData 
     */
    static writeFileData(jsonData: {}[]) {
        if (!jsonData.length) return;
    
        const mergedData = FileHelpers._getUniqueData(jsonData);

        const data = JSON.stringify(mergedData, null, 2);
    
        writeFileSync(DATA_FILE, data);
    }

    /**
     * comparing previous data & new data
     * filter based on id to getting unique id and merge the data
     * 
     * @param data 
     * @return []
     */
    private static _getUniqueData(data: any) {
        const previousData = FileHelpers.readFileData();

        const idsOfPreviousData = previousData.map(({ id }) => id);
        const filteredNewData = data.filter((d) => !idsOfPreviousData.includes(d.id));

        console.log(`total new data ${filteredNewData.length}`);

        return [...previousData, ...filteredNewData];
    }
}

export default FileHelpers;
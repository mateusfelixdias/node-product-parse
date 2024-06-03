import { api_food } from 'src/services';
import * as zlib from 'zlib';
import { Readable } from 'stream';
import * as readline from 'readline';
import { formatProductData } from '../utils/format-product-data';

export const getFileRequest = async (
  nextUrl: string = '/food/data/json/', fileName = "products_01.json.gz"
): Promise<any[]> => {
  const response = await api_food.get(`${nextUrl}${fileName}`, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(response.data);

  const gunzip = zlib.createGunzip();
  const input = Readable.from(buffer);

  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: input.pipe(gunzip),
      crlfDelay: Infinity
    });

    const items: any[] = [];
    let lineCount = 0;

    rl.on('line', (line) => {
      if (lineCount < 100) {
        const parsedLine = JSON.parse(line);
        const formattedData = formatProductData(parsedLine);
        items.push(formattedData);
        lineCount++;
      } else {
        rl.close();
      }
    });

    rl.on('close', () => resolve(items));
    rl.on('error', (err) => reject(err));
  });
};




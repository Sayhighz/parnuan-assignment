import { categorize } from '../src/index';

async function example() {
  try {
    const category1 = await categorize('กาแฟ Starbucks');
    console.log('Category:', category1); // Expected: food

    const category2 = await categorize('เติมน้ำมัน');
    console.log('Category:', category2); // Expected: transport

    const category3 = await categorize('ค่าไฟฟ้า');
    console.log('Category:', category3); // Expected: utilities
  } catch (error) {
    console.error('Error:', error);
  }
}

example();
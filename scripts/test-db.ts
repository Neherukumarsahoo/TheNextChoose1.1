
import { prisma } from '../lib/db';

async function main() {
  console.log('Testing DB connection...');
  try {
    const start = Date.now();
    const settings = await prisma.platformSettings.findFirst();
    console.log('DB Connection successful!');
    console.log('Settings found:', settings ? 'Yes' : 'No');
    console.log('Time taken:', Date.now() - start, 'ms');
  } catch (error) {
    console.error('DB Connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

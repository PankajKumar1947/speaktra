import 'dotenv/config';
import mongoose from 'mongoose';
import { DomainEntity } from '../../domain/entities/domain.entity';

async function seed() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  console.log('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI);

  // Define the model using the existing schema
  const DomainModel = mongoose.model('Domain', DomainEntity);

  const domains = [
    {
      name: 'Information Technology',
      description:
        'Software development, IT services, and technical communication',
    },
    {
      name: 'Healthcare',
      description:
        'Medical professionals, patient communication, and clinical terminology',
    },
    {
      name: 'Business & Management',
      description:
        'Corporate communication, meetings, and leadership vocabulary',
    },
    {
      name: 'Finance & Banking',
      description: 'Accounting, investments, and financial terminology',
    },
    {
      name: 'Education & Teaching',
      description: 'Teachers, trainers, and academic communication',
    },
    {
      name: 'Sales & Marketing',
      description: 'Customer interaction, advertising, and persuasion language',
    },
    {
      name: 'Hospitality & Travel',
      description: 'Hotels, tourism, and customer service communication',
    },
  ];

  console.log('Starting domain seeding...');

  for (const domain of domains) {
    try {
      const exists = await DomainModel.findOne({ name: domain.name });

      if (!exists) {
        await DomainModel.create(domain);
        console.log(`Created domain: ${domain.name}`);
      } else {
        console.warn(`Domain already exists: ${domain.name}`);
      }
    } catch (error) {
      console.error(`Error creating domain ${domain.name}:`, error);
    }
  }

  console.log('Seeding completed.');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});

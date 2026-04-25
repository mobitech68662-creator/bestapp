import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER || 'bestapp',
    password: process.env.DB_PASSWORD || 'bestapp_secret_2024',
    database: process.env.DB_NAME || 'bestapp',
  });

  await dataSource.initialize();

  // Create admin user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);

  await dataSource.query(`
    INSERT INTO users (username, email, password, "group", "is_verified", "wrz_balance")
    VALUES ('admin', 'admin@bestapp.com', '${hashedPassword}', 'admin', true, 1000)
    ON CONFLICT (email) DO NOTHING;
  `);

  // Create default forums
  await dataSource.query(`
    INSERT INTO forums (name, description, "order") VALUES
    ('Site Announcements', 'Official announcements from the team', 1),
    ('eBooks', 'Fiction and Non-Fiction eBooks', 2),
    ('Android', 'Android apps, games, and discussions', 3),
    ('Chitchat', 'Meet other members and chat', 4)
    ON CONFLICT DO NOTHING;
  `);

  console.log('Database seeded successfully!');
  await dataSource.destroy();
}

seed().catch(console.error);

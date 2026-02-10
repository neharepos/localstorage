require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // CREATE
  const alice = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice",
    },
  });

  console.log("Created user:", alice);

  // DELETE
  const deleted = await prisma.user.delete({
    where: { id: alice.id },
  });

  console.log("Deleted user:", deleted);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

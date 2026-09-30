import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ROLES = ["customer", "admin", "superadmin"];

const DEMO_USERS = [
  { name: "Admin", email: "admin@shrestha.com", password: "admin123", role: "admin" },
  { name: "Customer", email: "customer@shrestha.com", password: "customer123", role: "customer" },
];

async function main() {
  const roleByName = {};
  for (const name of ROLES) {
    const role = await prisma.role.upsert({ where: { name }, update: {}, create: { name } });
    roleByName[name] = role.id;
  }

  for (const u of DEMO_USERS) {
    const hashedPassword = await bcrypt.hash(u.password, 10);
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: { password: hashedPassword, roleId: roleByName[u.role], isVerified: true },
      create: { name: u.name, email: u.email, password: hashedPassword, roleId: roleByName[u.role], isVerified: true },
    });

    if (u.role === "admin") {
      await prisma.admin.upsert({ where: { id: user.id }, update: {}, create: { id: user.id } });
    } else if (u.role === "customer") {
      await prisma.customer.upsert({ where: { id: user.id }, update: {}, create: { id: user.id } });
    }
    console.log(`Seeded ${u.role}: ${u.email} / ${u.password}`);
  }
}

main()
  .then(async () => { await prisma.$disconnect(); process.exit(0); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });

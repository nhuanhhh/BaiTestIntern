// backend/src/seed.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Bắt đầu tạo dữ liệu mẫu...');

  // Xóa dữ liệu cũ (nếu có) để tránh trùng lặp
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();
  await prisma.job.create({
    data: {
      title: 'Frontend Developer (ReactJS)',
      location: 'Remote',
      type: 'Full-time',
      status: 'Active',
      applications: {
        create: [
          { name: 'Nguyen Van A', role: 'Senior Dev', match: '90%', status: 'NEW' },
          { name: 'Tran Thi B', role: 'React Fresher', match: '75%', status: 'INTERVIEW' },
          { name: 'Le Van C', role: 'Junior', match: '60%', status: 'FAILED' },
        ],
      },
    },
  });


  await prisma.job.create({
    data: {
      title: 'Backend Developer (NodeJS)',
      location: 'Hanoi',
      type: 'Hybrid',
      status: 'Active',
      applications: {
        create: [
          { name: 'Michael Le', role: 'Tech Lead', match: '95%', status: 'SCREENING' },
          { name: 'David Pham', role: 'Backend Dev', match: '80%', status: 'NEW' },
        ],
      },
    },
  });


  await prisma.job.create({
    data: {
      title: 'UI/UX Designer',
      location: 'Da Nang',
      type: 'Full-time',
      status: 'Closed',
      applications: {
        create: [
          { name: 'Pham Thi D', role: 'Designer', match: '88%', status: 'OFFER' },
          { name: 'Hoang Van E', role: 'Intern UI', match: '40%', status: 'FAILED' },
        ],
      },
    },
  });

  console.log('Đã thêm dữ liệu thành công!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
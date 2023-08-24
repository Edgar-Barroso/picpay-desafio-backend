import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Crie os registros iniciais usando os métodos Prisma
    await prisma.user.create({data:{
        name:"Jose Edgar",
        cpf:"744.070.560-29",
        type:"COMMON_CLIENT",
        email:"joseedgar@test.com",
        createdAt:new Date(),
        passwordHash:"123456",
        id:"user-1",
        balance:1000
    }})
    await prisma.user.create({data:{
        name:"Barroso Neto",
        cpf:"902.982.570-76",
        type:"STOREKEEPER",
        email:"barrosoneto@test.com",
        createdAt:new Date(),
        passwordHash:"123456",
        id:"user-2",
        balance:1000
    }})


    console.log('Dados iniciais inseridos:');
  } catch (error) {
    console.error('Erro ao inserir dados iniciais:', error);
  } finally {
    await prisma.$disconnect(); // Desconecte o Prisma quando a seed estiver concluída
  }
}

main()
  .catch((error) => {
    throw error;
  });

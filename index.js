const PrismaClient = require(".prisma/client").PrismaClient;

(async function () {
  const prisma = new PrismaClient();

  // clean up from past runs
  await prisma.item.deleteMany()
  await prisma.myModel.deleteMany()


  const item = await prisma.item.create({
    data: {name: 'Item 1'},
  })
  const myModel = await prisma.myModel.create({
    data: {
      name: 'MyModel 1',
      item: {connect: {id: item.id}}
    }
  })

  if (myModel.itemId === item.id){
    console.log('MyModel 1 has been correctly linked to item with id', item.id)
  }


  await prisma.item.update({
    where: {
      id: item.id
    },
    data: {
      name: 'Updated Item 1',
      myModel: {
        connectOrCreate: {
          where: {
            itemId: item.id
          },
          create: {
            name: 'MyModel 2'
          }
        }
      }
    }
  })


  const allMyModels = await prisma.myModel.findMany({
    where: {}
  })

  console.log(allMyModels)

  if (allMyModels.length > 1) {
    console.log('There should only be one MyModel in the DB!!!')
  }

})()
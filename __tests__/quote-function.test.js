const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {describe,test,expect} =require('@jest/globals')


function quoteTest() {
  describe("get all quotes", () => {
    test("should display all quotes", async () => {
      try {
        let quotes = await prisma.quote.findMany();
        expect(quotes).toBeDefined()

      } catch (error) {
        console.log(error)
      
      }   
    })

  });
}

quoteTest();

//module.exports = quoteTest;

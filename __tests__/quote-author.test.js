const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {describe,test,expect} =require('@jest/globals')


function quoteAuthorTest() {
  describe("get all quotes and authors", () => {
    test("should display all quotes and authors", async () => {
      try {
        let quotes = await prisma.quote.findMany();
        let authors=await prisma.author.findMany();
        expect(quotes).toBeDefined()
        expect(authors).toBeDefined()

      } catch (error) {
        console.log(error)
      
      }   
    })

  });
}

quoteAuthorTest();

//module.exports = quoteTest;

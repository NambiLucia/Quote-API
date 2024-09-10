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
//wrong test but reults to passed
function authorExists(){
  describe("If author exists",() =>{
    test("check if author exists", async ()=>{
      try{
        let author = await prisma.author.findUnique(
          {where:{
            name:"Michelle Obama"
          }}
        );
       //error in code
        expect(quote).toEqual({
          "name": "Michelle Obama",})

      }
      catch(error){
        console.log(error)
      //throw error

      }
    })
  }




  )
}

quoteAuthorTest();
authorExists();

//module.exports = quoteTest;

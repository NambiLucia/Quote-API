const request = require("supertest");
const { describe, test, expect } = require("@jest/globals");
const app = require("../new-server");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const quote = {
  text: "text",
  category: "category"
  //authorId: "authorId",
};

describe("test case Quote CRUD functions", () => {
  beforeAll(async () => {
    await prisma.quote.findFirst({
      where: {
        text: quote.text,
        category: quote.category
        //authorId: quote.authorId,
      },
    });
  });

  test("get all quotes",async () =>{
    await request(app).get("/quotes").expect(200)
  })
  test("should not accept quote without category",async () =>{
    await request(app)
    .post("/quotes")
    .send({
        text:quote.text
    })
    .expect(404)
  })

  test("should not accept update without ID",async ()=>{
    await request(app)
    .put("/quotes/") //missing ID
    .send({
        text:quote.text,
        category: quote.category
    })
    .expect(404)
  })

  test("shoud not delete without ID",async ()=>{
    await request(app)
    .delete("/quotes/")

    .expect(404)
  })
   









});

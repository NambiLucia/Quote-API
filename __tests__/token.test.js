const { describe, test, expect } = require('@jest/globals');
const validateToken = require("../utils/validateToken");
const { StatusCodes } = require('http-status-codes');

describe("verify if token works", () => {
  test("if token works", async () => {
    const loginUser = {
      username: "lucia",
      password: "lucia@256"
    };

    const req = {
      headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1YjlhYTM2LTUwZmYtNDFiZS1iM2I0LTJmYzNiMjU2NzZiMSIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNzI1MTg5NTQxLCJleHAiOjE3MjUxOTMxNDF9.yqkKwDFIkwcLoqwCqfxLZzPIcVkgcQcDBqegcuj1nYg"
      }
    };

   /* const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1YjlhYTM2LTUwZmYtNDFiZS1iM2I0LTJmYzNiMjU2NzZiMSIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNzI1MTg5NTQxLCJleHAiOjE3MjUxOTMxNDF9.yqkKwDFIkwcLoqwCqfxLZzPIcVkgcQcDBqegcuj1nYg";*/

    if (loginUser) {
      
        const result = validateToken(req); 
        expect(result).toBeDefined(); 
    }

  });
});

const { describe, test, expect } = require('@jest/globals');
const validateToken = require("../utils/validateToken");

describe("verify if validate works", () => {
  test("if validate function works", async () => {
    const loginUser = {
      username: "lucia",
      password: "lucia@256"
    };

    const req = {
      headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1YjlhYTM2LTUwZmYtNDFiZS1iM2I0LTJmYzNiMjU2NzZiMSIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNzI1MTg5NTQxLCJleHAiOjE3MjUxOTMxNDF9.yqkKwDFIkwcLoqwCqfxLZzPIcVkgcQcDBqegcuj1nYg"
      }
    };

    const mockResponse = () => {
      const res = {}; 
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };
    
    const res = mockResponse();  // Create a mocked response object
    const next = jest.fn();

    if (loginUser) {
      
       validateToken(req, res, next);
      //expect(next).toHaveBeenCalled();//when token is valid
    }

  });
});

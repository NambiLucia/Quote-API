const { describe, test, expect } = require('@jest/globals');
const validateToken = require("../utils/validateToken");



describe("verify if validate token function works", () => {


  test("if validate function works with a valid token", async () => {
  

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

      
     validateToken(req, res, next);
//when token is valid
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();

  });
});

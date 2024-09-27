const { describe, test, expect } = require('@jest/globals');
const validateToken = require("../utils/validateToken");



describe("verify if validate token function works", () => {


  test("if validate function works with a valid token", async () => {
  

    const req = {
      headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1YjlhYTM2LTUwZmYtNDFiZS1iM2I0LTJmYzNiMjU2NzZiMSIsInJvbGUiOiJzdWJzY3JpYmVyIiwiaWF0IjoxNzI3NDQxNzM1LCJleHAiOjE3Mjc0NDUzMzV9.O__9_TS4C3Ukv9g_VTP_iczR7plhac5qj5Hhp0oRsrI"
      }
    };

    const mockResponse = () => {
      const res = {}; 
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };
    
    const res = mockResponse();  // Create a mocked response object
    const next = jest.fn();

      
    await validateToken(req, res, next);
     console.log(validateToken)
//when token is valid
expect(next).toHaveBeenCalled();
     

  });
});

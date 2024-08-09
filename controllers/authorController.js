const fs = require("node:fs");
const path = require("path");
const filePath = path.join(__dirname, "../Models/authors.json");

const getAuthors = (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Failed to get the Data");
    }
    res.send(data);
  });
};

const getAuthorsById=(req,res)=>{
    fs.readFile(filePath,"utf8",(err,data)=>{
      if(err){
        return res.status(500).send("Failed to retrieve Data")
      }
        let authors=JSON.parse(data);
        let authorId=parseInt(req.params.id);
        let author=authors.find((a)=>a.id ===authorId)
  
      
       
        if (authorId >= 0 && authorId < authors.length) {
          if(author) {
              return res.status(200).json(author); // Return the specific author as JSON
          }
          else{
            return res.status(404).send("Author not found");
          }
    
        } else {
  
         return res.status(404).send("Author not found");
        }
  
    })
  
  
  }


  const createAuthors = (req, res) => {
    const newAuthor = req.body; // One created in postman
    // read to get existing quotes first
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).send("Failed to get the Data");
      }
  
      let oldAuthors = JSON.parse(data); //to be js obj for manipulation as array
  
      oldAuthors.push(newAuthor);
  
      //write updated authors array back to filepath
  
      fs.writeFile(filePath, JSON.stringify(oldAuthors, null, 2), (err) => {
        if (err) {
          return res.status(500).send("Failed to save new Author");
        }
        res.send("Saved successfully");
      });
    });
  };

  const updateAuthorsById = (req, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).send("Failed to Update the Data");
      }
      
      let authors = JSON.parse(data); //parse JSON data into an array
      
      let authorId = parseInt(req.params["id"]); //get author ID from req parameters
      
      let theUpdatedAuthor = req.body; //get updated author from req body
      
      
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send("Request body is missing or empty");
      }
    //if author ID is valid
    if (authorId >= 0 && authorId< authors.length) {
      authors[authorId] = theUpdatedAuthor; // Update the specific quote
  
      fs.writeFile(filePath,JSON.stringify(authors, null, 2), (err) => {
        if (err) {
       
         return res.status(404).send(`Author ID:${authorId} NOT updated`);
        }
        
        
      res.status(200).send(`Author ID:${authorId} Updated Successfully`);
  
      });
    }
  
    
    });
  
  };



  const deleteAuthorsById = (req, res) => {
   // Parse the author ID from the request parameters
   const authorId = parseInt(req.params["id"]);

   // Read the file asynchronously
   fs.readFile(filePath, 'utf8', (err, data) => {
       if (err) {
           return res.status(500).send('Error reading file');
       }

       // Parse the JSON data
       let authors;
       try {
           authors = JSON.parse(data);
       } catch (parseErr) {
           return res.status(500).send('Error parsing JSON');
       }

       // Find the author to delete
       const authorToDelete = authors.find(element => element.id === authorId);
       if (!authorToDelete) {
           return res.status(404).send(`Author ID:${authorId} not found`);
       }

       // Filter out the author to be deleted
       const filteredAuthors = authors.filter(a => a.id !== authorId);

       // Write the updated authors array back to the file asynchronously
       fs.writeFile(filePath, JSON.stringify(filteredAuthors, null, 2), (writeErr) => {
           if (writeErr) {
               return res.status(500).send('Error writing file');
           }

           // Send a success response
           res.status(204).send(); // 204 No Content indicates successful deletion
       });
   });
    
  };

  module.exports = {
    createAuthors,
    getAuthors,
    updateAuthorsById,
    getAuthorsById,
    deleteAuthorsById
  };
  

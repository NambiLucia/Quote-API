const { PrismaClient } = require("@prisma/client");
const path = require("path");
const prisma = new PrismaClient();
const { StatusCodes } = require("http-status-codes");

const getQuotes = async (req, res) => {
  try {
    let quotes = await prisma.quote.findMany();
    res.json(quotes);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getQuotesById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getquotes = await prisma.quote.findUnique({
      where: {
        id: id,
      },
    });
    if (getquotes) {
      return res.status(200).json({ message: `Quote id ${id}`, getquotes });
    } else {
      return res.status(404).json(`The id does not exist.`);
    }

  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const createQuotes = async (req, res) => {
  try {
    const { text, category, author } = req.body;
    //const authorInt=parseInt(authorId)

    if (!text || !category || !author) {
      return res
        .status(400)
        .json({
          error: "All fields are required and authorId must be a number.",
        });
    }

    const newquote = await prisma.quote.create({
      data: {
        text,
        category,
        author: {
          create: {
            name: author,
          },
        },
      },
    });
    return res
      .status(StatusCodes.OK)
      .json({ message: "New Quote added", data: newquote });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const updateQuotesById = async (req, res) => {
  try {
    const updatedQuote = await prisma.quote.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
    if (!updatedQuote) {
      return res.status(404).json({ error: "Quote not found" });
    }
    return res.status(StatusCodes.OK).json(updatedQuote);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const deleteQuotesById = async (req, res) => {
  try {
    const deletedQuote = await prisma.quote.delete({
      where: {
        id: parseInt(req.params.id),//+(req.params.id)
      },
    });

if(deletedQuote){
   return res
      .status(StatusCodes.OK)
      .json({ message: "Quote deleted", deletedQuote });

}
else{
  return res.status(404).json({ error: "Quote doesnt exist" });
}


   
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  getQuotes,
  getQuotesById,
  createQuotes,
  updateQuotesById,
  deleteQuotesById,
};

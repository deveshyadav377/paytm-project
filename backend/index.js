const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index2");
const connectToDB = require("./db"); 
require("dotenv").config(); 

const app = express();
app.use(cors({
  origin: "https://paytm-project-wine.vercel.app/", // or your frontend domain
  credentials: true
}));

app.use(express.json());

app.use("/api/v1", rootRouter);

const PORT = process.env.PORT || 3000;

(async () => {
  await connectToDB(); 
  app.listen(PORT, () => {
    console.log(`🚀 Server is listening on port ${PORT}`);
  });
})();

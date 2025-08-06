const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index2");

const app = express();

// ✅ CORS configuration: Allow only your frontend origin
app.use(cors({
  origin: "http://localhost:5173",  // or your frontend domain
  credentials: true                 // if using cookies or auth headers
}));

app.use(express.json());

app.use("/api/v1", rootRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

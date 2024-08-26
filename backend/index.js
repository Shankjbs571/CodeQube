const express = require('express');
const cors = require('cors');
require('dotenv').config();
const repo = require("./routes/repoRoutes");

const allRouter = express.Router();

allRouter.use('/repo', repo);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use('/api', allRouter);

app.get('/', (req, res) => {
    res.send('Hello from CodeQube backend!!!!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

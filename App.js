const express = require("express")
const cookkieParser = require("cookie-parser")
const fileUploader = require("express-fileupload")
const authRouter = require("./routes/authRoute")
const userRouter = require("./routes/userRoutes")
const adminRouter = require("./routes/adminRouter")
const depositRouter = require("./routes/depositRouter")
const withdrawRouter = require("./routes/withdrawRouter")
const historyRouter = require("./routes/historyRoute")
const investRouter = require("./routes/investRouter")
const planRouter = require("./routes/plansRouter")
const Wallet = require("./routes/WalletRouter")
const cors = require("cors");
const app = express()

app.use(fileUploader({
    useTempFiles: true
}))
app.use(cookkieParser())
app.use(express.json());
// app.use(cors({origin: "*"}));

app.use("/api", cors({origin:"*"}), authRouter)
app.use("/api", cors({origin:"*"}), userRouter)
app.use("/api", cors({origin:"*"}), adminRouter)
app.use("/api", cors({origin:"*"}), depositRouter)
app.use("/api", cors({origin:"*"}), withdrawRouter)
app.use("/api", cors({origin:"*"}), historyRouter)
app.use("/api", cors({origin:"*"}), investRouter)
app.use("/api", cors({origin:"*"}), planRouter)
app.use("/api", cors({origin:"*"}), Wallet)

app.use((err, req, res, next)=>{
   const errorStatus = err.status || 500
   const errorMessage = err.message || "Something went wrong!"
   return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
   })
})

app.use("/", (req, res) => {
    res.status(200).send("My Teacher Api")
})

module.exports = app

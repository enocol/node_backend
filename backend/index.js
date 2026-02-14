import express from "express"
import dotenv from "dotenv"
import { initdb } from "./config/db.js"
import { sql } from "./config/db.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT
initdb()

app.use(express.json())

app.delete("/api/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;

   const idNumber = Number(id);

if (!Number.isInteger(idNumber)) {
  return res.status(400).json({ message: "ID must be an integer" });
}


    const result = await sql`
      DELETE FROM transactions
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.status(200).json({
      message: "Transaction deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error deleting transaction",
    });
  }
});

app.get("/api/transactions/summary/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const idNumber = Number(userId);
    if (!Number.isInteger(idNumber)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await sql`
      SELECT user_id FROM transactions WHERE user_id = ${idNumber}
    `;

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const summary = await sql`
      SELECT
        COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END), 0) AS total_income,
        COALESCE(ABS(SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END)), 0) AS total_expense
      FROM transactions
      WHERE user_id = ${idNumber}
    `;

    return res.status(200).json({
      total_income: summary[0].total_income,
      total_expense: summary[0].total_expense,
      balance: summary[0].total_income - summary[0].total_expense,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error" });
  }
});



app.post("/api/transactions", async (req, res)=>{
    try {
        const {title, user_id, amount, category} = req.body
        if (!title || !category || amount === 0 || !user_id ){
           return res.status(400).json("All fields are required")
        }

        const finalAmount = category.toLowerCase() === "expense" ? -Math.abs(amount): Math.abs(amount)

        const transactions = await sql`
        INSERT INTO transactions(title, amount, category, user_id)
        VALUES(${title}, ${finalAmount}, ${category}, ${user_id})
        RETURNING *
        `
        res.status(201).json(transactions[0])

    } catch (error) {
        console.log("Error creating transaction", error)
        return res.status(500).json("Error creating transactions")
    }

})

app.get("/api/transactions/:id", async (req, res)=>{
    try {
    const {id} = req.params
   
    const result = await sql`SELECT * FROM transactions Where user_id=${id}`
    if (!result || result.length === 0) {
        return res.status(404).json({ message: "No record found" })}
    res.status(200).json(result)

    } catch (error) {
        return res.status(400).json({message: "error getting transaction"})
        
    }
})


app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})
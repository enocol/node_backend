import express from "express"
import
 { getTransactionsById, deleteTransaction, getTransactionSummary, postTransaction, updateTransaction } 
 from "../controllers/transactions.js";



const router = express.Router()


router.delete("/:id", deleteTransaction );
router.get("/summary/:userId", getTransactionSummary);
router.post("/",postTransaction )
router.get("/:id", getTransactionsById)
router.put("/:id", updateTransaction)




export default router
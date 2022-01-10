import { Router } from "express";
import { isAuthenticated } from "../middleware/isAtuthenticated.js";
import { auth } from "./login/auth.js";
import getTable from "./public/getTable.js";
import getInTable from "./public/getInTable.js";
import createTable from "./public/createTable.js";
import postInTable from "./public/postInTable.js"
import secret from "./public/secret.js";
import putInTable from "./public/putInTable.js";
import deleteInTable from "./public/deleteInTable.js";

const router = Router();
router.post('/auth', auth)

router.get('/secret', isAuthenticated, secret)

router.get('/:table', getTable)

router.get('/:table/:id', getInTable)

router.post('/createTable', createTable);

router.post('/:table', postInTable)

router.put('/:table', putInTable)

router.delete('/:table', deleteInTable)

export default router;
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
import addUser from "./private/addUser.js";

const router = Router();

router.post('/addUser', addUser)

router.get('/secret', isAuthenticated, secret)

router.get('/:table', isAuthenticated, getTable)

router.get('/:table/:id', isAuthenticated, getInTable)

router.post('/auth', auth)

router.post('/createTable', isAuthenticated, createTable);

router.post('/:table', isAuthenticated, postInTable)

router.put('/:table', isAuthenticated, putInTable)

router.delete('/:table', isAuthenticated, deleteInTable)

export default router;
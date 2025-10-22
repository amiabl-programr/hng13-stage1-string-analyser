import express from 'express';
import submitStringsController from '../controllers/submitStringsController.js';
import getSpecificStringController from "../controllers/getSpecificStringController.js";
import getAllStringsController from "../controllers/getAllStringsController.js";
import deleteStringController from "../controllers/deleteStringController.js";
import getStringsWithNaturalLanguageController from "../controllers/getStringsWithNaturalLanguageController.js";


const router = express.Router();

router.post('/strings', submitStringsController);
router.get('/strings', getAllStringsController);
router.get('/strings/filter-by-natural-language', getStringsWithNaturalLanguageController);
router.get('/strings/:id', getSpecificStringController);
router.delete('/strings/:id', deleteStringController);

export default router;
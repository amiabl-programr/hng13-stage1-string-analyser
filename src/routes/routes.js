import express from 'express';
import submitStringsController from '../controllers/submitStringsController.js';
import getSpecificStringController from "../controllers/getSpecificStringController.js";
import getAllStringsController from "../controllers/getAllStringsController.js"

const router = express.Router();

router.post('/strings', submitStringsController);
router.get('/strings/{id}', getSpecificStringController);
router.get('/strings/all', getAllStringsController);
// router.get('/strings', getStringsWithNaturalLanguageController);
// router.get('/strings/filter-by-natural-language', getStringsWithNaturalLanguageController);
// router.delete('/strings/{id}', deleteStringController);

export default router;

import  express  from 'express';
import { createProperty } from '../controllers/propertyControlers.js';

const router=express.Router()

// create  post 
router.post("/add-property",createProperty)


export default router
import { Router } from "express";
import sectionController from "../controllers/sectionController.js";

const sectionRouter = new Router();

// sectionRouter.post('/section', sectionController.create)
sectionRouter.get('/section', sectionController.get)
sectionRouter.get('/section/:id', sectionController.getById)
// sectionRouter.put('/section/:id', sectionController.updateById)
// sectionRouter.delete('/section/:id', sectionController.deleteById)

export default sectionRouter
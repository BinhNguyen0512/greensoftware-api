import { Route } from "@core/interface";
import { Router } from "express";
import IndexController from "./index.controller";

export default class IndexRoute implements Route {
    public path = "/";
    public router = Router();

    public indexController = new IndexController();

    constructor(){
        this.initializeRoutes();
    }

    public initializeRoutes(){
        this.router.get(this.path, this.indexController.index )
    }
}
import { validateENV } from "@core/utils";
import { IndexRoute } from "@modules/index";
import { ProductRoute } from "@modules/products";
import * as dotenv from "dotenv";

import App from "./app";
import { UserRoute } from "@modules/user";
dotenv.config();

validateENV();

const routes = [new IndexRoute(), new ProductRoute(), new UserRoute()];

const app = new App(routes);

app.listen();

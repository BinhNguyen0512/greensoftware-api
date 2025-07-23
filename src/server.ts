import { validateENV } from "@core/utils";
import { IndexRoute } from "@modules/index";
import { ProductRoute } from "@modules/products";
import * as dotenv from "dotenv";

import App from "./app";
dotenv.config();

validateENV();

const routes = [new IndexRoute(), new ProductRoute()];

const app = new App(routes);

app.listen();

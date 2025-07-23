import { validateENV } from '@core/utils';
import App from "./app"
import * as dotenv from 'dotenv'
import { IndexRoute } from '@modules/index';
dotenv.config()

validateENV();

const routes = [
    new IndexRoute()
]

const app = new App(routes);

app.listen();
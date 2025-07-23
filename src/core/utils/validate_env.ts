import { cleanEnv, num, str } from "envalid"

const validateENV = () => {
    cleanEnv(process.env, {
        PORT: num(),
    })
}

export default validateENV
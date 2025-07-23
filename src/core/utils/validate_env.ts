import { cleanEnv, num, str } from "envalid";

const validateENV = () => {
  cleanEnv(process.env, {
    PORT: num(),
    MONGODB_URI: str()
  });
};

export default validateENV;

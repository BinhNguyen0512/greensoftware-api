import { cleanEnv, num } from "envalid";

const validateENV = () => {
  cleanEnv(process.env, {
    PORT: num()
  });
};

export default validateENV;

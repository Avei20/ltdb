import { Router } from "express";
import { loginFirst, loginSecond } from "../controller/auth";
import { loginRoleValidator, loginValidator } from "../middleware/validator/loginValidator";

const loginRoute = Router()

loginRoute
    .route('/get-role')
        .post(...loginValidator, loginFirst)

loginRoute
    .route('/')
        .post(...loginRoleValidator, loginSecond)

export default loginRoute
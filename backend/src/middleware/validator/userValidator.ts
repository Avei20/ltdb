import { check } from "express-validator";
import { validator } from "./baseValidator";

export const changePasswordValidation = [
    [
        check('password')
            .notEmpty()
            .withMessage('Password tidak boleh kosong')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
            .withMessage('Password harus memiliki satu huruf kecil, satu huruf besar, angka, dan simbol.')
    ],
    validator
]
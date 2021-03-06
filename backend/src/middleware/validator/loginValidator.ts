import { Role } from ".prisma/client";
import { check } from "express-validator";
import { validator } from "./baseValidator";

export const loginValidator = [
    [
        check('username')
            .notEmpty()
            .withMessage('Username tidak boleh kosong')
            .not()
            .custom((val) => /[^A-za-z0-9.-\s]/g.test(val))
            .withMessage('Username tidak menggunakan karakter selaing angka huruf dan titik'),
        check('password')
            .notEmpty()
            .withMessage('Password tidak boleh kosong')
    ], 
    validator
]

export const loginRoleValidator = [
    [
        check('username')
            .notEmpty()
            .withMessage('Username tidak boleh kosong')
            .not()
            .custom((val) => /[^A-za-z0-9.-\s]/g.test(val))
            .withMessage('Username tidak menggunakan karakter selaing angka huruf dan titik'),
        check('password')
            .notEmpty()
            .withMessage('Password tidak boleh kosong'),
        check('role')
            .notEmpty()
            .withMessage('Pilih Role Terlebih Dahulu')
            .isIn(Object.values(Role))
            .withMessage('Role tidak terdaftar mohon pilih ulang')
    ], validator
]
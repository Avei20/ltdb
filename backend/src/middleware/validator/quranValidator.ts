import { check } from "express-validator";
import { validator } from "./baseValidator";

export const alQuranInputValidation = [
    [
        check('ayat')
            .notEmpty()
            .withMessage('Ayat tidak boleh kosong')
            .isInt()
            .withMessage('Ayat Harus berupa Angka'),
        check('baris')
            .notEmpty()
            .withMessage('Baris tidak boleh kosong')
            .isInt()
            .withMessage('Baris Harus berupa Angka'),
        check('halaman')
            .notEmpty()
            .withMessage('Halaman tidak boleh kosong')
            .isInt()
            .withMessage('Halaman Harus berupa Angka'),
        check('surah')
            .notEmpty()
            .withMessage('Surah tidak boleh kosong')
            .isInt()
            .withMessage('Surah Harus berupa Angka'),
        check('juz')
            .notEmpty()
            .withMessage('Juz tidak boleh kosong')
            .isInt()
            .withMessage('Juz Harus berupa Angka'),
    ], 
    validator
]
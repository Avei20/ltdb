import { check } from "express-validator";
import { validator } from "./baseValidator";
import { JenisKelamin } from "@prisma/client";

export const guruInputValidation = [
    [
        check('nig')
            .notEmpty()
            .withMessage('NIG tidak boleh kosong')
            .not()
            .custom((val) => /[^0-9]/g.test(val))
            .withMessage('NIG harus berupa angka'),
        check('nama')
            .notEmpty()
            .withMessage('Nama Guru tidak boleh kosong'),
            check('jenisKelamin')
            .notEmpty()
            .withMessage('Jenis Kelamin tidak boleh kosong')
            .isIn(Object.values(JenisKelamin))
            .withMessage('Jenis Kelamin tidak terdaftar mohon input ulang'),
        check('tempatLahir')
            .notEmpty()
            .withMessage('Tempat Lahir tidak boleh kosong'),
        check('tanggalLahir')
            .notEmpty()
            .withMessage('Tanggal Lahir tidak boleh kosong')
            .isDate()
            .withMessage('Format tanggal lahir tidak valid mohon input ulang'),
    ],
    validator
]
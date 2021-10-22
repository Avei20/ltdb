import { check } from "express-validator";
import { validator } from "./baseValidator";
import { JenisKelamin } from "@prisma/client";

export const guruInputValidation = [
    [
        check('nig')
            .notEmpty()
            .withMessage('NIG tidak boleh kosong'),
        check('nama')
            .notEmpty()
            .withMessage('Nama tidak boleh kosong'),
        check('email')
            .notEmpty()
            .withMessage('Email tidak boleh kosong')
            .isEmail()
            .withMessage('Harap masukkan format email yang valid'),
        check('jenisKelamin')
            .notEmpty()
            .withMessage('Jenis Kelamin tidak boleh kosong')
            .isIn(Object.values(JenisKelamin))
            .withMessage('Jenis Kelamin tidak valid mohon input ulang'),
        check('tempatLahir')
            .notEmpty()
            .withMessage('Tempat lahir tidak boleh kosong')
            .isString()
            .withMessage('Tempat lahir harus berupa kalimat'),
        check('tanggalLahir')
            .notEmpty()
            .withMessage('Tanggal lahir tidak boleh kosong')
            .isDate()
            .withMessage('Format tanggal lahir tidak valid'),
        check('tanggalMasuk')
            .notEmpty()
            .withMessage('Tanggal lahir tidak boleh kosong')
            .isDate()
            .withMessage('Format tanggal lahir tidak valid'),
    ],
    validator
]
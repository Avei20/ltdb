import { check, param } from "express-validator";
import { validator } from "./baseValidator";
import { JenisKelamin } from "@prisma/client";

export const guruInputValidation = [
    [
        check('nig')
            .notEmpty()
            .withMessage('NIG tidak boleh kosong')
            .isLength({ min : 14, max : 14})
            .withMessage('Panjang NIG harus 14 angka !'),
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

export const guruUpdateValidation = [
    [
        param('nig')
            .isInt()
            .withMessage('NIG tidak valid')
            .isLength({ min : 14, max : 14})
            .withMessage('Panjang NIG harus 14 angka !'),
        check('nama')
            .optional()
            .isString() // ganti ke re A-Za-z 
            .withMessage('Nama tidak boleh berupa angka dan simbol'),
        check('jenisKelamin')
            .optional()
            .isIn(Object.values(JenisKelamin))
            .withMessage('Jenis Kelamin tidak dikenali mohon input ulang'),
        check('tanggalLahir')
            .optional()
            .isDate()
            .withMessage('Tanggal Lahir tidak valid mohon input ulang'),
        check('tanggalMasuk')
            .optional()
            .isDate()
            .withMessage('Tanggal Lahir tidak valid mohon input ulang'),        
    ],
    validator
]

export const guruByNigValidation = [
    [
        param('nig')
            .isInt()
            .withMessage('NIG tidak valid mohon input ulang!')
            .isLength({ min : 14, max : 14})
            .withMessage('Panjang NIG harus 14 angka !'),
    ],
    validator
]
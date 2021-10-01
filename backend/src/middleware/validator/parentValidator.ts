import { check } from "express-validator";
import { validator } from "./baseValidator";
import { Agama, Pendidikan, Hidup, JenisKelamin } from ".prisma/client";
import { checkRole } from "../security/checkRole";

export const parentInputValidation = [
    [
        check('nama')
            .notEmpty()
            .withMessage('Nama tidak boleh kosong'),
        check('tempatLahir')
            .notEmpty()
            .withMessage('Tempat Lahir tidak boleh kosong'),
        check('tanggalLahir')
            .notEmpty()
            .withMessage('Tanggal Lahir tidak boleh kosong')
            .isDate()
            .withMessage('Format tanggal lahir tidak valid mohon input ulang'),
        check('jenisKelamin')
            .notEmpty()
            .withMessage('Jenis Kelamin tidak boleh kosong')
            .isIn(Object.values(JenisKelamin))
            .withMessage('Jenis Kelamin tidak terdaftar mohon input ulang'),
        check('agama')
            .notEmpty()
            .withMessage('Agama tidak boleh kosong')
            .isIn(Object.values(Agama))
            .withMessage('Agama tidak dikenali mohon input ulang'),
        check('pendidikanTerakhir')
            .notEmpty()
            .withMessage('Pendidikan Terakhir tidak boleh kosong')
            .isIn(Object.values(Pendidikan))
            .withMessage('Jenis Pendidikan tidak terdaftar mohon input ulang'),
        check('nomorTelepon')
            .notEmpty()
            .withMessage('Nomor Telepon tidak boleh kosong'),
        check('statusHidup')
            .notEmpty()
            .withMessage('Status Hidup tidak boleh kosong')
            .isIn(Object.values(Hidup))
            .withMessage('Status Hidup tidak dikenali mohon input ulang'),
    ],
    validator
]

export const parentUpdateValidation = [
    [
        check('tanggalLahir')
            .isDate()
            .withMessage('Format tanggal lahir tidak valid mohon input ulang'),
        check('jenisKelamin')
            .isIn(Object.values(JenisKelamin))
            .withMessage('Jenis Kelamin tidak terdaftar mohon input ulang'),
        check('agama')
            .isIn(Object.values(Agama))
            .withMessage('Agama tidak dikenali mohon input ulang'),
        check('pendidikanTerakhir')
            .isIn(Object.values(Pendidikan))
            .withMessage('Jenis Pendidikan tidak terdaftar mohon input ulang'),
        check('statusHidup')
            .isIn(Object.values(Hidup))
            .withMessage('Status Hidup tidak dikenali mohon input ulang'),
    ],
    validator
]
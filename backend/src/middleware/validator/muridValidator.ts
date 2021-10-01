import { check } from "express-validator";
import { validator } from "./baseValidator";
import { GolonganDarah, JenisKelamin } from ".prisma/client";

export const muridInputValidation = [
    [
        check('nama')
            .notEmpty()
            .withMessage('Nama tidak boleh kosong'),
        check('nism')
            .notEmpty()
            .withMessage('NISM tidak boleh kosong'),
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
        check('anakKe')
            .notEmpty()
            .withMessage('Anak ke tidak boleh kosong')
            .isInt()
            .withMessage('Format input harus berupa angka!'),
        check('jumlahSaudaraKandung')
            .notEmpty()
            .withMessage('Jumlah Saudara Kandung tidak boleh kosong')
            .isInt()
            .withMessage('Format input harus berupa angka'),
        check('jumlahSaudaraTiri')
            .notEmpty()
            .withMessage('Jumlah Saudara Angkat tidak boleh kosong')
            .isInt()
            .withMessage('Format input harus berupa angka!'),
        check('jumlahSaudaraAngkat')
            .notEmpty()
            .withMessage('Jumlah Saudara kandung tidak boleh kosong')
            .isInt()
            .withMessage('Format input harus berupa angka!'),
        check('golonganDarah')
            .isIn(Object.values(GolonganDarah))
            .withMessage('Golongan Darah tidak valid mohon input ulang'),
        check('tahunMasuk')
            .isInt()
            .withMessage('Tahun Masuk harus berupa angka'),
        check('tahunLulus')
            .isInt()
            .withMessage('Tahun Lulus harus berupa angka')
    ],
    validator
]

export const muridUpdateValidation = [
    [
        check('nis')
            .notEmpty()
            .withMessage('Nama tidak boleh kosong'),
        check('jenisKelamin')
            .optional()
            .isIn(Object.values(JenisKelamin))
            .withMessage('Jenis Kelamin tidak terdaftar mohon input ulang'),
        check('tanggalLahir')
            .optional()   
            .isDate()
            .withMessage('Format tanggal lahir tidak valid mohon input ulang'),
        check('anakKe')
            .optional()
            .isInt()
            .withMessage('Format input harus berupa angka!'),
        check('jumlahSaudaraKandung')
            .optional()
            .isInt()
            .withMessage('Format input harus berupa angka'),
        check('jumlahSaudaraTiri')
            .optional()
            .isInt()
            .withMessage('Format input harus berupa angka!'),
        check('jumlahSaudaraAngkat')
            .optional()
            .isInt()
            .withMessage('Format input harus berupa angka!'),
        check('golonganDarah')
            .optional()
            .isIn(Object.values(GolonganDarah))
            .withMessage('Golongan Darah tidak valid mohon input ulang'),
    ],
    validator
]
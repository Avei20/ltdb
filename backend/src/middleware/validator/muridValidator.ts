import { body, check, param } from "express-validator";
import { validator } from "./baseValidator";
import { GolonganDarah, JenisKelamin } from ".prisma/client";

export const muridInputValidation = [
    [
        check('nama')
            .notEmpty()
            .withMessage('Nama tidak boleh kosong'),
        check('nism')
            .notEmpty()
            .withMessage('NISM tidak boleh kosong')
            .isLength({ min : 19, max : 19})
            .withMessage('Panjang NISM harus 19 angka !'),
        check('nisn')
            .optional()
            .isLength({ min : 10, max : 10})
            .withMessage('Panjang NISN harus 10 angka !'),
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
        param('nis')
            .isInt()
            .withMessage('NIS tidak Valid')
            .isLength({ min : 10, max : 10})
            .withMessage('Panjang NIS harus 10 angka !'),
        check('nism')
            .optional()
            .isLength({ min : 19, max : 19})
            .withMessage('Panjang NISM harus 19 angka !'),
        check('nisn')
            .optional()
            .isLength({ min : 10, max : 10})
            .withMessage('Panjang NISN harus 10 angka !'),
        check('nama')
            .optional()
            .isString() // ganti ke re A-Za-z 
            .withMessage('Nama tidak boleh berupa angka'),
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

export const muridByNisValidation = [
    [
        param('nis')
            .isInt()
            .withMessage("NIS tidak valid mohon input ulang")
            .isLength({ min : 10, max : 10})
            .withMessage('Panjang NIS harus 10 angka !'),
    ]
    , validator
]
import { check, param } from "express-validator";
import { validator } from "./baseValidator";

export const jamTahfidzInputValidation = [
    [
        check('waktuMulai')
            .notEmpty()
            .withMessage('Waktu Mulai tidak boleh kosong')
            .isDate()
            .withMessage('Format tanggal tidak valid mohon input ulang'),
        check('waktuSelesai')
            .notEmpty()
            .withMessage('Waktu Selesai tidak boleh kosong')
            .isDate()
            .withMessage('Format tanggal tidak valid mohon input ulang'),
        check('namaJam')
            .notEmpty()
            .withMessage('Nama Jam tidak Boleh kosong')
    ]
    ,validator
]
import { body, check, param } from "express-validator";
import { validator } from "./baseValidator";

export const testingValidation = [
    [
        body()
        .isEmpty()
        .withMessage('Jangan Kosong'),
    ]
    , validator
]

export const testingPhaseOne = [
    param('nis')
        .isInt()
        .withMessage('Harus angka bang')
    , validator
]
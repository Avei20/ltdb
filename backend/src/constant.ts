import process from 'process'

export const JWT_KEY = process.env.JWT_KEY || 'lantabur2008'
export const SERVER_PORT = process.env.PORT || 2008
export const WAKTU_VALID_TOKEN = process.env.WAKTU_VALID_TOKEN || '2h'
export const TIMEZONE = process.env.TZ || 'Asia/Bangkok'
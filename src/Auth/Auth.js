import { Buffer } from 'buffer';

const USERNAME = "admin";
const PASSWORD = "password";

const token = `${USERNAME}:${PASSWORD}`;
const encodedToken = Buffer.from(token).toString('base64')

const AUTH_TOKEN = `Basic ${encodedToken}`

export default AUTH_TOKEN;
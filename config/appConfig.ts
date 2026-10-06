import dotenv from 'dotenv';

dotenv.config();

export const config = {

appUrl: process.env.APP_URL,
username: process.env.APP_USERNAME,
password: process.env.APP_PASSWORD,
loginAs: process.env.APP_LOGIN_AS

};
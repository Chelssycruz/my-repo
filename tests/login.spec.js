import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import loginData from '../src/data/login-data.json' assert { type: 'json' };

const username = process.env.LOGIN_USERNAME;
const password = process.env.LOGIN_PASSWORD;
const testCases = [ 
    { 
        username: username, 
        password: password, 
        expectedText: loginData.loginMessage.success },
    {
        username: '',
        password: password,
        expectedText: loginData.loginMessage.usernameError },
    {
        username: 'wrong username',
        password: password, 
        expectedText: loginData.loginMessage.usernameError },
    {
        username: username,
        password: '',
        expectedText: loginData.loginMessage.passwordError },
    {
        username: username,
        password: 'wrong password',
        expectedText: loginData.loginMessage.passwordError }
];

for (const {username, password, expectedText} of testCases){
    test(`When user inputs "${username}" and "${password}" then login message should display correct text`, 
        { tag: ['@smoke', '@auth'] }, async ({page}) =>{
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(username, password);
        
        if (expectedText === loginData.loginMessage.success) {
            await expect(loginPage.successMessage).toHaveText(expectedText);
        } else {
            await expect(loginPage.errorMessage).toHaveText(expectedText);
        }
    });
};
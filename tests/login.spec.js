import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import credentials from '../config/staging.config' assert { type: 'javascript' }; 
import loginData from '../src/data/login-data.json' assert { type: 'json' };

const testCases = [ 
    { 
        username: credentials.username, 
        password: credentials.password, 
        expectedText: loginData.loginMessage.success },
    {
        username: '',
        password: credentials.password,
        expectedText: loginData.loginMessage.usernameError },
    {
        username: 'wrong username',
        password: credentials.password, 
        expectedText: loginData.loginMessage.usernameError },
    {
        username: credentials.username,
        password: '',
        expectedText: loginData.loginMessage.passwordError },
    {
        username: credentials.username,
        password: 'wrong password',
        expectedText: loginData.loginMessage.passwordError }
];

for (const {username, password, expectedText} of testCases){
    test(`When user inputs "${username}" and "${password}", Then login message should display correct text`, async ({page}) =>{
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
import { test, expect } from '@playwright/test';
import { TestExceptionsPage } from '../src/pages/TestExceptionsPage';

let testExceptionsPage;
test.beforeEach(async ({ page }) => {
	testExceptionsPage = new TestExceptionsPage( page );
    await testExceptionsPage.goto()
});

test('When user opens URL, Then row 1 textbox is in view mode', async ({}) => {
    await expect(testExceptionsPage.row(1)).toBeVisible();
    await expect(testExceptionsPage.textbox(1)).toBeDisabled();
});

test('When user clicks Edit, Then row 1 textbox is in edit mode', async ({}) => {
    await testExceptionsPage.editBtn(1).click();
    await testExceptionsPage.editRow(1, 'Cheese');
    await expect(testExceptionsPage.textbox(1)).toBeEnabled();
});

test('When user clicks Save, Then row 1 textbox is in view mode', async ({}) => {
    await testExceptionsPage.editBtn(1).click();
    await testExceptionsPage.saveRow(1, 'Cheese');
    await expect(testExceptionsPage.confirmation)
        .toHaveText(testExceptionsPage.messages.rowSaved(1));
    await expect(testExceptionsPage.textbox(1)).toBeDisabled();
});

test('When user clicks Add, Then new row loads', async({}) => {
    await testExceptionsPage.clickAdd();
    await expect(testExceptionsPage.confirmation)
        .toHaveText(testExceptionsPage.messages.rowAdded(2));
    await expect(testExceptionsPage.loading).toBeVisible({timeout: 10000});
    await expect(testExceptionsPage.loading).toBeHidden({timeout: 10000});
})

test.describe(`Row 2`, () => {
    test.beforeEach(async ({ page }) => {
        await testExceptionsPage.clickAdd();
        await testExceptionsPage.waitToLoadRow(2);
    });

    test('When new row loads, Then row 2 is in edit mode', async ({}) => {
        await expect(testExceptionsPage.row(2)).toBeVisible();
        await expect(testExceptionsPage.textbox(2)).toBeEnabled();
    });

    test('When user clicks Edit, Then row 2 is in edit mode', async ({}) => {
        await expect(testExceptionsPage.textbox(2)).toBeEnabled();
        await testExceptionsPage.editRow(2, 'Cheese');
    });

    test('When user clicks Save, Then row 2 us in view mode', async ({}) => {
        await testExceptionsPage.saveRow(2, 'Cheese');
        await expect(testExceptionsPage.confirmation)
            .toHaveText(testExceptionsPage.messages.rowSaved(2));
        await expect(testExceptionsPage.textbox(2)).toBeDisabled();
    });

    test('When user clicks Remove,Then row 2 is deleted', async ({}) => {
        await testExceptionsPage.clickRemove();
        await expect(testExceptionsPage.confirmation)
            .toHaveText(testExceptionsPage.messages.rowRemoved(2));
    });

    test('When user clicks Edit & Remove, row 2 is deleted', async ({}) => {
        await testExceptionsPage.editRow(2, 'Cheese');
        await testExceptionsPage.clickRemove();
        await expect(testExceptionsPage.confirmation)
            .toHaveText(testExceptionsPage.messages.rowRemoved(2));
    });
});
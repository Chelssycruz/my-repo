import { expect } from '@playwright/test';
export class TestExceptionsPage {
  constructor(page) {
    this.page = page;

    this.addBtn = page.getByRole('button', { name: 'Add' });
    this.removeBtn = page.getByRole('button', { name: 'Remove' });

    this.loading = page.locator('#loading');
    this.confirmation = page.locator('#confirmation');
  };

	async goto() {
		await this.page.goto(
		'https://practicetestautomation.com/practice-test-exceptions/'
		);
	};

	row(rowNumber) {
		return this.page.locator(`#row${rowNumber}`);
	};

	textbox(rowNumber) {
		return this.row(rowNumber).getByRole('textbox');
	};

	editBtn(rowNumber) {
		return this.row(rowNumber).getByRole('button', { name: 'Edit'});
	};

	saveBtn(rowNumber) {
		return this.row(rowNumber).getByRole('button', { name: 'Save'});
	};

	async clickAdd() {
		await this.addBtn.click();
	};

	async waitToLoadRow(rowNumber){
		await expect(this.row(rowNumber)).toBeVisible({ timeout: 10000 });
	};

	async clickRemove() {
		await this.removeBtn.click();
	};

	async editRow(rowNumber, value) {
		await this.textbox(rowNumber).fill(value);
	};

	async saveRow(rowNumber, value) {
		await this.textbox(rowNumber).fill(value);
		await this.saveBtn(rowNumber).click();
	};

	messages = {
		rowSaved: (row) => { return `Row ${row} was saved`},
		rowAdded: (row) => { return `Row ${row} was added`},
		rowRemoved: (row) => { return `Row ${row} was removed`},
	};
};
const { expect } = require('@playwright/test')

export class Leads {

    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000/');
    }

    async openLeadModal() {
        //await page.click('//button[text()="Aperte o play... se tiver coragem"]')
        await this.page.getByRole('button', { name: /Aperte o play/ }).click()

        await expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera')
    }

    async submitLeadForm(name, email) {
        await this.page.locator('input[name= name]').fill(name)
        //await page.locator('#name').fill('edgar@teste.com')

        await this.page.getByPlaceholder('informe seu email').fill(email)
        await this.page.getByText(/Quero entrar na fila/).click()
    }

    async messageSucess() {
        await expect(this.page.getByText(/seus dados conosco/i)).toBeVisible();
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }
}
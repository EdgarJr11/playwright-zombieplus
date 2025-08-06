const { expect } = require('@playwright/test')

export class LoginPage {

    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000/admin/login')
        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async submit(email, senha) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(senha)
        await this.page.getByText('Entrar').click()

    }

    async isLoggedIn() {
        //Criar uma variável de um ponto específico a ser validado na tela, e chamar essa váriavel criada pra verificar se ela é visivel.
        //const logoutLink = this.page.locator('a[href="/logout"]')
        // await expect(logoutLink).toBeVisible()

        await this.page.waitForLoadState('networkidle') //só valida a URL depois de todo o tráfego de rede for concluído (Renderização, chamada de api, etc)
        await expect(this.page).toHaveURL(/.*movies/)

    }
}
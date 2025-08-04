const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../pages/LoginPage')
const {Toast} = require ('../pages/Components')

let loginPage
let toast

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
})

test('Logar com perfil admin', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await loginPage.isLoggedIn()
})

test('Não deve logar com senha incorreta', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd12')

    const message = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.   "
    await toast.haveText(message)
})

test('Não deve logar com email incorreto', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.co', 'pwd123')

    const message = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.   "
    await toast.haveText(message)
})



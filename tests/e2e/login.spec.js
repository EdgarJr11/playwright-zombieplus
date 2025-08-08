const { test, expect } = require('../support')


test('Logar com perfil admin', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggedIn('Admin')
})

test('Não deve logar com senha incorreta', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd12')

    const message = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.   "
    await page.toast.containText(message)
})

test('Não deve logar com email incorreto', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.co', 'pwd123')

    const message = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.   "
    await page.toast.containText(message)
})

test('Logando com admin por API', async ({ page, request }) => {

    const response = await request.post('http://localhost:3333/sessions', {
        data: {
            email: "admin@zombieplus.com",
            password: "pwd123"
        }
    })
    expect(response.status()).toBe(200)

})





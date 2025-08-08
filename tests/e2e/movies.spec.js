const { test } = require('../support')
const data = require('../support/fixtures/movies.json')

test('deve cadastrar um novo filme', async ({ page }) => {

    const movie = data.create
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.isLoggedIn()
    await page.movies.create(
        movie.title,
        movie.overview,
        movie.company,
        movie.release_year
    )
    await page.toast.containText('Cadastro realizado com sucesso!')

})

test('Não deve cadastrar um filme quando os campos obrigatórios não forem preenchidos', async ({page}) =>{
    const movie = data.create

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.isLoggedIn()
    await page.movies.bottonRegister()
    await page.movies.alertHaveText([
        'Por favor, informe o título.' ,
        'Por favor, informe a sinopse.', 
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ])
})
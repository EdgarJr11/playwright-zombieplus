import { test, expect } from '@playwright/test';
const { faker } = require ('@faker-js/faker')
const {LandingPage} = require ('../pages/LandingPage')
const {Toast} = require ('../pages/Components')


let landingPage
let toast

test.beforeEach(async({page})  => {
    landingPage = new LandingPage(page)
    toast = new Toast(page)
    
})

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
    const leadName = faker.person.fullName()
    const leadEmail = faker.internet.email()


 await landingPage.visit()
 await landingPage.openLeadModal()
 await landingPage.submitLeadForm(leadName, leadEmail)
 await landingPage.messageSucess()
});

test('não deve cadastrar usuários com credenciais já existentes', async ({ page, request }) => {
const leadName = faker.person.fullName()
const leadEmail = faker.internet.email()

const newLead = await request.post('http://localhost:3333/leads', {
    data: {
        name:leadName,
        email:leadEmail
    }
})

expect(newLead.ok()).toBeTruthy() // Verifica se o status code é de sucesso.

 await landingPage.visit()
 await landingPage.openLeadModal()
 await landingPage.submitLeadForm(leadName, leadEmail)

 const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
 await toast.containText(message)
});

test('não deve cadastrar com email inválido', async ({ page }) => {
    await landingPage.visit()
    await landingPage.openLeadModal()
    await landingPage.submitLeadForm('edgar junior', 'edgarteste.com')
    await landingPage.alertHaveText('Email incorreto')

});

test('Não deve cadastar quando o campo email não for preenchido', async ({ page }) => {
    await landingPage.visit()
    await landingPage.openLeadModal()
    await landingPage.submitLeadForm('edgar junior', '')
    await landingPage.alertHaveText('Campo obrigatório')

});

test('não deve cadastrar quando o campo nome não for preenchido', async ({ page }) => {

    await landingPage.visit()
    await landingPage.openLeadModal()
    await landingPage.submitLeadForm('', 'edgar@teste.com')
    await landingPage.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar quando todos campos obrigatórios não forem preenchidos', async ({ page }) => {
    await landingPage.visit()
    await landingPage.openLeadModal()
    await landingPage.submitLeadForm('', '')
    await landingPage.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório'
    ])

});

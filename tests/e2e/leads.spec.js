import { test, expect } from '@playwright/test';
const { faker } = require ('@faker-js/faker')
const {LandingPage} = require ('../pages/LandingPage')

let landingPage

test.beforeEach(async({page})  => {
    landingPage = new LandingPage(page)
})

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
    const leadName = faker.person.fullName()
    const leadEmail = faker.internet.email()


 await landingPage.visit()
 await landingPage.openLeadModal()
 await landingPage.submitLeadForm(leadName, leadEmail)
 await landingPage.messageSucess()
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
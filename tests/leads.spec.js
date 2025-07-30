import { test, expect } from '@playwright/test';
const {LandingPage} = require ('./pages/LandingPage')

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
 const landingPage = new LandingPage(page)

 await landingPage.visit()
 await landingPage.openLeadModal()
 await landingPage.submitLeadForm('edgar junior', 'edgar@teste.com')
 await landingPage.messageSucess()
 await page.waitForTimeout(5000)
});

test('não deve cadastrar com email inválido', async ({ page }) => {
    const landingPage = new LandingPage(page)
    await landingPage.visit()
    await landingPage.openLeadModal()
    await landingPage.submitLeadForm('edgar junior', 'edgarteste.com')
    await landingPage.alertHaveText('Email incorreto')

});

test('Não deve cadastar quando o campo email não for preenchido', async ({ page }) => {
    const landingPage = new LandingPage(page)
    await landingPage.visit()
    await landingPage.openLeadModal()
    await landingPage.submitLeadForm('edgar junior', '')
    await landingPage.alertHaveText('Campo obrigatório')

});

test('não deve cadastrar quando o campo nome não for preenchido', async ({ page }) => {

    const landingPage = new LandingPage(page)
    await landingPage.visit()
    await landingPage.openLeadModal()
    await landingPage.submitLeadForm('', 'edgar@teste.com')

    await landingPage.alertHaveText('Campo obrigatório')
    await page.waitForTimeout(5000)

});

test('não deve cadastrar quando todos campos obrigatórios não forem preenchidos', async ({ page }) => {
    const landingPage = new LandingPage(page)
    await landingPage.visit()
    await landingPage.openLeadModal()
    await landingPage.submitLeadForm('', '')

    await landingPage.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório'
    ])

    await page.waitForTimeout(5000)

});
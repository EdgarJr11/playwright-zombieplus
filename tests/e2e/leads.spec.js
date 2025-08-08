import { test, expect } from '../support';
const { faker } = require ('@faker-js/faker')


test('deve cadastrar um lead na fila de espera', async ({ page }) => {
    const leadName = faker.person.fullName()
    const leadEmail = faker.internet.email()

 await page.leads.visit()
 await page.leads.openLeadModal()
 await page.leads.submitLeadForm(leadName, leadEmail)
 await page.leads.messageSucess()
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
 await page.leads.visit()
 await page.leads.openLeadModal()
 await page.leads.submitLeadForm(leadName, leadEmail)

 const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
 await page.toast.containText(message)
});

test('não deve cadastrar com email inválido', async ({ page }) => {
    await page.leads.visit()
    await page.leads.openLeadModal()
    await page.leads.submitLeadForm('Edgar Junior','edgarteste.com'  )
    await page.leads.alertHaveText('Email incorreto')

});

test('Não deve cadastar quando o campo email não for preenchido', async ({ page }) => {
   await page.leads.visit()
   await page.leads.openLeadModal()
   await page.leads.submitLeadForm('edgar junior', '')
   await page.leads.alertHaveText('Campo obrigatório')

});

test('não deve cadastrar quando o campo nome não for preenchido', async ({ page }) => {

   await page.leads.visit()
   await page.leads.openLeadModal()
   await page.leads.submitLeadForm('', 'edgar@teste.com')
   await page.leads.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar quando todos campos obrigatórios não forem preenchidos', async ({ page }) => {
   await page.leads.visit()
   await page.leads.openLeadModal()
   await page.leads.submitLeadForm('', '')
   await page.leads.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório'
    ])

});

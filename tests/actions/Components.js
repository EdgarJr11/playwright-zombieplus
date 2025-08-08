const { expect } = require('@playwright/test')


export class Toast {

    constructor(page) {
        this.page = page
    }

    async containText(message) {
        const toast = this.page.locator('.toast')
        await expect(toast).toContainText(message) // Leva em consideração todo o texto exibido
    }

}

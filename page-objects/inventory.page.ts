import { Locator, type Page } from "playwright/test";

export class Inventory {

    readonly page: Page;
    shoppingCart: Locator;
    cartBadge: Locator;
    allItems: Locator;
    addToCartBtn: Locator;
    removeFromCartBtn: Locator;
    backToProdBtn: Locator;
    price: Locator;


    constructor(page: Page) {
        this.page = page;
        this.shoppingCart = page.locator('//*[@id="shopping_cart_container"]/a');
        this.cartBadge = page.locator('//*[@data-test="shopping-cart-badge"]');
        this.allItems = page.locator('[data-test="inventory-item"]');
        this.addToCartBtn = page.getByRole("button", { name: 'Add to cart' });
        this.removeFromCartBtn = page.getByRole("button", { name: 'Remove' });
        this.backToProdBtn = page.getByText('Back to products');
        this.price = page.locator(`//*[@class="inventory_item_price"]`);

    }

    async addItem(itemLabel: string) {
        const item = this.getItemByLabel(itemLabel);
        await item.getByRole("button", { name: 'Add to cart' }).click();
    }

    async clickItem(itemLabel: string) {
        const item = this.getItemByLabel(itemLabel);
        await item.locator('//div[@class="inventory_item_name "]').click();
    }

    getItemByLabel(itemLabel: string) {
        return this.allItems.filter({ hasText: itemLabel })
    }

    async clickShoppingCart() {
        await this.shoppingCart.click();
    }

    async removeItem(itemLabel: string) {
        const item = this.getItemByLabel(itemLabel);
        await item.getByRole("button", { name: 'Remove' }).click();
    }

    async addAllItemsToCart(page: Page) {
        for (const button of await this.allItems.all()) {
            await button.getByRole("button", { name: 'Add to cart' }).click();
        }
    }
    async removeAllItemsFromCart(page: Page) {
        for (const button of await this.allItems.all()) {
            await button.getByRole("button", { name: 'Remove' }).click();
        }
    }

    async sortItemsList(page: Page, by: "name asc" | "name desc" | "price asc" | "price desc") {
        let option = "";
        switch (by) {
            case "name asc":
                option = "az";
                break;
            case "name desc":
                option = "za";
                break;
            case "price asc":
                option = "lohi";
                break;
            case "price desc":
                option = "hilo";
                break;
        }
        await page.selectOption(`//*[@class="product_sort_container"]`, option);

    };



}
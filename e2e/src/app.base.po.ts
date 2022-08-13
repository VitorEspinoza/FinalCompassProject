import { browser, by, element, ExpectedConditions } from 'protractor';

export abstract class AppBasePage {

    constructor() {
        browser.driver.manage().window().maximize();
    }

    navigateToIndex() {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    navigateByUrl(url: string) {
        return browser.get(url) as Promise<any>;
    }

    navigateByLink(link: string) {
        browser.wait(ExpectedConditions.elementToBeClickable(element(by.linkText(link)))).then(() => {
            return element(by.linkText(link)).click();
        });
    }

    getActualPage() {
      return browser.getCurrentUrl();
    }

    getElementXpath(xpath: string) {
        return element(by.xpath(xpath));
    }

    wait = (milisegundos: number) => {
        browser.sleep(milisegundos);
    }
}

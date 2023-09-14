import Beverage from "../models/Beverage";
import defaultBeverages from "../data/beverages";

export interface BeverageRepository {
    save(beverage: Beverage): void;
    get(): Beverage[];
}

export class LocalStorageBeverageRepository implements BeverageRepository {
    private storageKey: string = 'beverages';

    getOrInit(): Beverage[] {
        const existingData = localStorage.getItem(this.storageKey);
        if (!existingData) {
            localStorage.setItem(this.storageKey, JSON.stringify(defaultBeverages));
            return defaultBeverages;
        }

        return JSON.parse(existingData);
    }

    save(beverage: Beverage): void {
        const beverages: Beverage[] = this.getOrInit();
        // Add the new drink to the list

        const maxId = beverages.reduce((max, obj) => (obj.id > max ? obj.id : max), beverages[0].id);
        beverage.id = maxId + 1;
        beverages.push(beverage);
        // Save the updated list back to localStorage
        localStorage.setItem(this.storageKey, JSON.stringify(beverages));
    }

    get(): Beverage[] {
        return this.getOrInit();
    }
}
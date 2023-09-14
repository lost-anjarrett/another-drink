import Drink from "../models/Drink";

export interface DrinkRepository {
    save(drink: Drink): void;
    get(): Drink[];
}

export class LocalStorageDrinkRepository implements DrinkRepository {
    private storageKey: string = 'drinks';

    save(drink: Drink): void {

        // Get existing data from localStorage
        const existingData = localStorage.getItem('drinks');
        const drinks: Drink[] = existingData ? JSON.parse(existingData) : [];

        // Add the new drink to the list
        drinks.push(drink);

        // Save the updated list back to localStorage
        localStorage.setItem(this.storageKey, JSON.stringify(drinks));
    }

    get(): Drink[] {
        const existingData = localStorage.getItem(this.storageKey);
        return existingData ? JSON.parse(
            existingData,
            (key, value) => {
                if (key === 'date') {
                    return new Date(value);
                }
                return value;
            }
        ) : [];
    }
}
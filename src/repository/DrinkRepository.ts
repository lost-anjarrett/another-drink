import Drink from "../models/Drink";

export interface DrinkRepository {
    saveDrink(drink: Drink): void;
    getDrinks(): Drink[];
}

export class LocalStorageDrinkRepository implements DrinkRepository {
    private storageKey: string = 'drinks';

    saveDrink(drink: Drink): void {

        // Get existing data from localStorage
        const existingData = localStorage.getItem('drinks');
        const drinks: Drink[] = existingData ? JSON.parse(existingData) : [];

        // Add the new drink to the list
        drinks.push(drink);

        // Save the updated list back to localStorage
        localStorage.setItem(this.storageKey, JSON.stringify(drinks));
    }

    getDrinks(): Drink[] {
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
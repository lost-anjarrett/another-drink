import React, { useEffect, useState } from 'react';
import Drink from '../models/Drink';

const DrinksList: React.FC = () => {
    const [drinksByDay, setDrinksByDay] = useState<Record<string, Drink[]>>({});

    // Function to group drinks by day
    const groupDrinksByDay = (drinks: Drink[]) => {
        const grouped: Record<string, Drink[]> = {};

        drinks.forEach((drink) => {
            const dateKey = drink.date.toDateString();
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(drink);
        });

        return grouped;
    };

    // Load drinks from local storage on component mount
    useEffect(() => {
        const existingData = localStorage.getItem('drinks');
        const drinks: Drink[] = existingData ? JSON.parse(
            existingData,
            (key, value) => {
                if (key === 'date') {
                    return new Date(value);
                }
                return value;
            }
        ) : [];
        const groupedDrinks = groupDrinksByDay(drinks);
        setDrinksByDay(groupedDrinks);
    }, []);

    return (
        <div>
            <h2>Drinks List</h2>
            {Object.keys(drinksByDay).map((date) => (
                <div key={date}>
                    <h3>{date}</h3>
                    <ul>
                        {drinksByDay[date].map((drink, index) => (
                            <li key={index}>
                                {drink.beverage.name} - Quantity: {drink.beverage.quantity} ml, Grade: {drink.beverage.alcoholGrade}%
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default DrinksList;

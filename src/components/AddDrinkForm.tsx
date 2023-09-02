import React, { useState } from 'react';
import Beverage from '../models/Beverage';
import Drink from '../models/Drink';
import { DateTime } from '../utils/SerializableDate';

const AddDrinkForm: React.FC = () => {
    const [formData, setFormData] = useState({
        selectedBeverage: '', // Store the selected beverage name
        name: '',
        quantity: '',
        alcoholGrade: '',
    });

    // Sample beverage data (replace with your actual data)
    const beverages: Beverage[] = [
        { name: 'Beer', quantity: 355, alcoholGrade: 5 },
        { name: 'Wine', quantity: 150, alcoholGrade: 12 },
        // Add more beverages as needed
    ];

    // Handle beverage selection from dropdown
    const handleBeverageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBeverageName = event.target.value;
        const selectedBeverage = beverages.find((beverage) => beverage.name === selectedBeverageName);
        if (selectedBeverage) {
            setFormData({
                ...formData,
                selectedBeverage: selectedBeverageName,
                name: selectedBeverageName,
                quantity: selectedBeverage.quantity.toString(),
                alcoholGrade: selectedBeverage.alcoholGrade.toString(),
            });
        }
    };

    // Handle input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleAddDrink = () => {
        // Validate and sanitize input data if necessary
        const newDrink: Drink = {
            beverage: {
                name: formData.name,
                quantity: parseFloat(formData.quantity),
                alcoholGrade: parseFloat(formData.alcoholGrade),
            },
            date: new DateTime(),
        };

        // Get existing data from localStorage
        const existingData = localStorage.getItem('drinks');
        const drinks: Drink[] = existingData ? JSON.parse(existingData) : [];

        // Add the new drink to the list
        drinks.push(newDrink);

        // Save the updated list back to localStorage
        localStorage.setItem('drinks', JSON.stringify(drinks));

        // Clear the form
        setFormData({
            selectedBeverage: '',
            name: '',
            quantity: '',
            alcoholGrade: '',
        });
    };

    return (
        <div>
            <h2>Add a Drink</h2>
            <select
                name="selectedBeverage"
                value={formData.selectedBeverage}
                onChange={handleBeverageSelect}
            >
                <option value="">Select a Beverage</option>
                {beverages.map((beverage) => (
                    <option key={beverage.name} value={beverage.name}>
                        {beverage.name}
                    </option>
                ))}
            </select>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                readOnly
            />
            <input
                type="text"
                name="quantity"
                placeholder="Quantity (ml)"
                value={formData.quantity}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="alcoholGrade"
                placeholder="Alcohol Grade (%)"
                value={formData.alcoholGrade}
                onChange={handleInputChange}
            />
            <button onClick={handleAddDrink}>Add</button>
        </div>
    );
};

export default AddDrinkForm;

import React, { useState } from 'react';
import Beverage from '../models/Beverage';
import Drink from '../models/Drink';
import {LocalStorageDrinkRepository} from "../repository/DrinkRepository";
import {LocalStorageBeverageRepository} from "../repository/BeverageRepository";

const AddDrinkForm: React.FC = () => {
    const [formData, setFormData] = useState({
        selectedBeverage: 0, // Store the selected beverage id
        id: 0,
        name: '',
        quantity: '',
        alcoholGrade: '',
    });

    const bRepo = new LocalStorageBeverageRepository();
    const beverages = bRepo.get();

    // Handle beverage selection from dropdown
    const handleBeverageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBeverageId = parseInt(event.target.value);
        const selectedBeverage = beverages.find((beverage) => beverage.id === selectedBeverageId);
        if (selectedBeverage) {
            setFormData({
                ...formData,
                selectedBeverage: selectedBeverageId,
                id: selectedBeverage.id,
                name: selectedBeverage.name,
                quantity: selectedBeverage.suggestedQuantity.toString(),
                alcoholGrade: selectedBeverage.alcoholGrade.toString(),
            });
        } else {
            setFormData({
                selectedBeverage: selectedBeverageId,
                id: 0,
                name: '',
                quantity: '',
                alcoholGrade: '',
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
        console.log(formData);
        const beverageFromForm: Beverage = {
            id: formData.id,
            name: formData.name,
            suggestedQuantity: parseFloat(formData.quantity),
            alcoholGrade: parseFloat(formData.alcoholGrade),
        }
        // Validate and sanitize input data if necessary
        const newDrink: Drink = {
            beverage: beverageFromForm,
            quantity: parseFloat(formData.quantity),
            date: new Date(),
        };

        if (beverageFromForm.id === 0) {
            const bRepo = new LocalStorageBeverageRepository();
            bRepo.save(beverageFromForm);
        }
        const repo = new LocalStorageDrinkRepository();
        repo.save(newDrink);

        // Clear the form
        setFormData({
            selectedBeverage: 0,
            id: 0,
            name: '',
            quantity: '',
            alcoholGrade: '',
        });
    };

    const showNameInputs = formData.selectedBeverage === 999999;
    return (
        <div>
            <h2>Add a Drink</h2>
            <select
                name="selectedBeverage"
                value={formData.selectedBeverage}
                onChange={handleBeverageSelect}
            >
                <option value="">Select a Beverage</option>
                <option value="999999">Custom</option>
                {beverages.map((beverage) => (
                    <option key={beverage.id} value={beverage.id}>
                        {beverage.name} ({beverage.alcoholGrade}%)
                    </option>
                ))}
            </select>
            <input
                type="number"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                readOnly
                hidden={true}
            />
            {showNameInputs && ( // Conditionally render name inputs
                <>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="alcoholGrade"
                        placeholder="Alcohol Grade (%)"
                        value={formData.alcoholGrade}
                        onChange={handleInputChange}
                    />
                </>
            )}

            <input
                type="text"
                name="quantity"
                placeholder="Quantity (ml)"
                value={formData.quantity}
                onChange={handleInputChange}
            />
            <button onClick={handleAddDrink}>Add</button>
        </div>
    );
};

export default AddDrinkForm;

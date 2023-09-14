// Sample data for beverages
import Beverage from "../models/Beverage";

const defaultBeverages: Beverage[] = [
    {
        id: 1,
        name: 'Beer',
        suggestedQuantity: 330, // Milliliters (typical bottle)
        alcoholGrade: 5, // Percentage
    },
    {
        id: 2,
        name: 'Wine (Red)',
        suggestedQuantity: 150, // Milliliters (standard glass)
        alcoholGrade: 12, // Percentage
    },
    {
        id: 3,
        name: 'Wine (White)',
        suggestedQuantity: 150, // Milliliters (standard glass)
        alcoholGrade: 12, // Percentage
    },
    {
        id: 4,
        name: 'Whiskey',
        suggestedQuantity: 40, // Milliliters (standard serving)
        alcoholGrade: 40, // Percentage
    },
    {
        id: 5,
        name: 'Vodka',
        suggestedQuantity: 40, // Milliliters (standard serving)
        alcoholGrade: 40, // Percentage
    },
    {
        id: 6,
        name: 'Rum',
        suggestedQuantity: 40, // Milliliters (standard serving)
        alcoholGrade: 40, // Percentage
    },
    {
        id: 7,
        name: 'Gin',
        suggestedQuantity: 40, // Milliliters (standard serving)
        alcoholGrade: 40, // Percentage
    },
    {
        id: 8,
        name: 'Amaretto',
        suggestedQuantity: 30, // Milliliters (standard serving)
        alcoholGrade: 24, // Percentage
    },
    {
        id: 9,
        name: 'Limoncello',
        suggestedQuantity: 30, // Milliliters (standard serving)
        alcoholGrade: 20, // Percentage
    },
];

export default defaultBeverages;

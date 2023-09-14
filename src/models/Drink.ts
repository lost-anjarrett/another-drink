import Beverage from './Beverage';

interface Drink {
    beverage: Beverage;
    quantity: number; // Drunken quantity (default is suggested from beverage)
    date: Date;
}

export default Drink;

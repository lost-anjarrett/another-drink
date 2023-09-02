import Beverage from './Beverage';
import { SerializableDate } from '../utils/SerializableDate';

interface Drink {
    beverage: Beverage;
    date: SerializableDate;
}

export default Drink;

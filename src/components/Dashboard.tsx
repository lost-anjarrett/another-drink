import React, { useEffect, useState } from 'react';
import Drink from '../models/Drink';

const Dashboard: React.FC = () => {
    const [drinkData, setDrinkData] = useState<Drink[]>([]);

    // Load drinks from local storage on component mount
    useEffect(() => {
        const existingData = localStorage.getItem('drinks');
        const drinks: Drink[] = existingData ? JSON.parse(existingData,
            (key, value) => {
                if (key === 'date') {
                    return new Date(value);
                }
                return value;
            }) : [];
        setDrinkData(drinks);
    }, []);

    // Calculate metrics
    const calculateMetrics = () => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        const daysSinceLastDrink = () => {
            if (drinkData.length === 0) {
                // If there are no drinks recorded, return -1 or another appropriate value
                return -1;
            }

            // Find the latest date in the drinkData array
            const latestDrinkDate = new Date(Math.max(...drinkData.map((drink) => drink.date.getTime())));

            // Calculate the difference in days between the latest drink date and today
            const today = new Date();
            const timeDifference = today.getTime() - latestDrinkDate.getTime();

            return Math.floor(timeDifference / (1000 * 3600 * 24));
        };

        const todayCount = drinkData.filter((drink) => drink.date.toDateString() === today.toDateString()).length;
        const yesterdayCount = drinkData.filter((drink) => drink.date.toDateString() === yesterday.toDateString()).length;
        const lastWeekAvg = drinkData.filter((drink) => drink.date >= lastWeek).length / 7;
        const lastMonthAvg = drinkData.filter((drink) => drink.date >= lastMonth).length / 30;
        // Adding 1 so that the first day you have metrics too.
        const dayUsingApp = 1 + Math.floor((new Date().getTime() - drinkData[0]?.date.getTime()) / (1000 * 3600 * 24));
        const allTimeAvg = drinkData.length / (dayUsingApp);

        return {
            daysSinceLastDrink: daysSinceLastDrink(),
            todayCount,
            yesterdayCount,
            lastWeekAvg,
            lastMonthAvg,
            allTimeAvg,
            dayUsingApp,
        };
    };

    const metrics = calculateMetrics();

    return (
        <div>
            <h2>Dashboard</h2>
            <p>You're using this app since {metrics.dayUsingApp} days</p>
            <p>Days Without a Drink: {metrics.daysSinceLastDrink}</p>
            <p>Today's Number of Drinks: {metrics.todayCount}</p>
            <p>Yesterday's Number of Drinks: {metrics.yesterdayCount}</p>
            <p>Last Week's Drinks per Day Average: {metrics.lastWeekAvg.toFixed(2)}</p>
            <p>Last Month's Drinks per Day Average: {metrics.lastMonthAvg.toFixed(2)}</p>
            <p>All Time Drinks per Day Average: {metrics.allTimeAvg.toFixed(2)}</p>
        </div>
    );
};

export default Dashboard;

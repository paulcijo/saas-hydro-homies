"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


function WaterTracker() {
    const [waterCount, setWaterCount] = useState(0);
    const [waterIntakeLog, setWaterIntakeLog] = useState([]);
    const [waterGoal, setWaterGoal] = useState(8);

    useEffect(() => {
        // Load water intake log from local storage (if available)
        const storedLog = localStorage.getItem('waterIntakeLog');
        if (storedLog) {
            setWaterIntakeLog(JSON.parse(storedLog));
        }
    }, []);

    const handleWaterDrink = () => {
        setWaterCount(waterCount + 1);
        setWaterIntakeLog((prevLog) => [...prevLog, new Date()]);
        localStorage.setItem('waterIntakeLog', JSON.stringify(waterIntakeLog));
    };

    const handleWaterGoal = (event) => {
        event.preventDefault(); // Prevent default form submission
        const newGoal = parseInt(event.target.waterGoal.value);

        // Validation (optional):
        if (newGoal >= 1 && newGoal <= 20) {
            setWaterGoal(newGoal);
            // Store the new goal in local storage or a database
            localStorage.setItem('waterGoal', newGoal);
        } else {
            // Handle invalid input
            alert('Please enter a goal between 1 and 20 glasses.');
        }
    };

    const encouragingMessages = [
        // Messages for when todaysWaterCount is 0
        [
            "Ready to make waves? Let's start by filling your first glass!",
            "Every journey begins with a single sip. Grab that H2O and dive in!",
            "Your body is a wonderland, and it's craving hydration. Let's quench that thirst!",
        ],
        // Messages for when todaysWaterCount is between 1 and 25% of waterGoal
        [
            "You're off to a refreshing start! Keep those water vibes flowing.",
            "Every sip is a step closer to feeling amazing. You got this!",
            "Hydration is a marathon, not a sprint. Pace yourself and enjoy the journey.",
        ],
        // Messages for when todaysWaterCount is between 25% and 50% of waterGoal
        [
            "Look at you, making waves! Halfway to hydration heaven.",
            "Your body is singing with joy. Keep up the good work, aqua rockstar!",
            "You're halfway there! Imagine how refreshed you'll feel when you reach the finish line.",
        ],
        //  ... (Add more arrays for other milestones)
        [
            "Look at you, making waves! Halfway to hydration heaven.",
            "Your body is singing with joy. Keep up the good work, aqua rockstar!",
            "You're halfway there! Imagine how refreshed you'll feel when you reach the finish line.",
        ],
        [
            "Look at you, making waves! Halfway to hydration heaven.",
            "Your body is singing with joy. Keep up the good work, aqua rockstar!",
            "You're halfway there! Imagine how refreshed you'll feel when you reach the finish line.",
        ],
        [
            "Look at you, making waves! Halfway to hydration heaven.",
            "Your body is singing with joy. Keep up the good work, aqua rockstar!",
            "You're halfway there! Imagine how refreshed you'll feel when you reach the finish line.",
        ],
    ];

    function getRandomEncouragingMessage() {
        const progressPercentage = (todaysWaterCount / waterGoal) * 100;
        console.log(progressPercentage);
        const messageIndex = Math.floor(progressPercentage / 25); // Assuming 4 milestones
        console.log(messageIndex);
        return encouragingMessages[messageIndex][Math.floor(Math.random() * encouragingMessages[messageIndex].length)];
    }

    const todaysWaterCount = waterIntakeLog.filter((logEntry) => {
        const today = new Date();
        const logDate = new Date(logEntry);
        return today.toDateString() === logDate.toDateString();
    }).length;

    return (
        <div className="h-screen">
            <header className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
                <h1 className="text-xl font-bold">Hydro Homies</h1>
                <Dialog>
                    <DialogTrigger asChild><button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Settings</button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Fine-Tune Your Journey: Water Tracker Settings</DialogTitle>
                            <DialogDescription>
                                Personalize your hydration journey with custom goals, reminder types, and more. We're constantly adding new features, so tell us what you'd love to see next!
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleWaterGoal} className="flex flex-col space-y-4 my-4">
                            <label htmlFor="waterGoal" className="text-lg font-bold">Set your daily water goal (glasses):</label>
                            <div className="flex items-center justify-between rounded-md border border-gray-300 shadow-sm">
                                <input
                                    type="number"
                                    min="1"
                                    max="20"
                                    id="waterGoal"
                                    name="waterGoal"
                                    className="px-4 py-2 text-gray-700 focus:ring-1 focus:ring-blue-500 focus:outline-none w-full"
                                    placeholder="Enter your goal"
                                />
                                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Save Goal</button>
                            </div>
                            <p className="text-sm text-gray-500">Recommended minimum is 8 glasses. Listen to your body and adjust accordingly.</p>
                        </form>
                    </DialogContent>
                </Dialog>
            </header>
            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-center m-5">
                    <h1 class="text-2xl">Hydrate. Thrive. Repeat</h1>
                </div>
                <div className="flex justify-center m-20">
                    <Image src="/glass-of-water.png" alt="Water glass icon" width={256} height={256} />
                </div>

                <div className="flex items-center mb-4">
                    <h2 className="text-2xl font-bold mr-4">{todaysWaterCount} Glasses</h2>
                    <h2 className="text-2xl font-bold mr-4">{getRandomEncouragingMessage()}</h2>
                </div>

                <button onClick={handleWaterDrink} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    + I Drank Water
                </button>
            </main>
        </div>
    )
}

export default WaterTracker
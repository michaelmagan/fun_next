"use client";
import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label"



export default function Home() {
  const [birthday, setBirthday] = useState('');
  const [expectedLifespan, setExpectedLifespan] = useState(''); // Changed expected lifespan state to string

  useEffect(() => {
    // Retrieve the stored birthday and expected lifespan from localStorage if they exist
    const savedBirthday = localStorage.getItem('birthday');
    const savedLifespan = localStorage.getItem('expectedLifespan'); // Retrieve expected lifespan
    if (savedBirthday) {
      setBirthday(savedBirthday);
    }
    if (savedLifespan) {
      setExpectedLifespan(savedLifespan); // Directly set expected lifespan without parsing
    }
  }, []);

  const [daysAlive, setDaysAlive] = useState(0);

  useEffect(() => {
    if (birthday) {
      const birthdayDate = new Date(birthday);
      const today = new Date();
      const difference = today.getTime() - birthdayDate.getTime();
      const days = Math.floor(difference / (1000 * 3600 * 24));
      setDaysAlive(days);
      // Store the birthday in localStorage
      localStorage.setItem('birthday', birthday);
    }
  }, [birthday]);

  useEffect(() => {
    if (expectedLifespan) {
      // Store the expected lifespan in localStorage
      localStorage.setItem('expectedLifespan', expectedLifespan); // Store as string without converting to number
    }
  }, [expectedLifespan]);

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(e.target.value);
  };

  const handleLifespanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpectedLifespan(e.target.value); // Set as string directly
  };

  const lifeExpectancyDays = parseInt(expectedLifespan, 10) * 365; // Parse when calculating
  const daysAliveNumber = daysAlive; // No need to parse, already a number
  const daysLeft = lifeExpectancyDays - daysAliveNumber;
  const percentageLived = ((daysAliveNumber / lifeExpectancyDays) * 100).toFixed(2);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:p-24 p-4 relative">
      {birthday ? (
        <>
          <p className="font-mono md:text-4xl mt-4 text-md text-center">
            You have been alive for <span className="font-bold">{daysAlive.toLocaleString()}</span> days.
          </p>
          {expectedLifespan && parseInt(expectedLifespan, 10) > 0 && (
            <p className="font-mono md:text-xl text-xs mt-2 text-center">
             If you are lucky, you have lived only <span className="font-bold">{percentageLived}%</span> of your life and you have <span className="font-bold">{daysLeft.toLocaleString()}</span> days left.
            </p>
          )}
        </>
      ) : (
        <p className="font-mono md:text-xl text-xs mt-4 italic text-center">
          Update your birthday in the bottom right corner to see how many days you have been alive.
        </p>
      )}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="absolute bottom-4 right-4 p-2">
            Update
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update your details</AlertDialogTitle>
          </AlertDialogHeader>
          <Label>Birthday</Label>
          <input
            type="date"
            onChange={handleBirthdayChange}
            className="p-2 border rounded"
            value={birthday}
          />
          <Label>Expected Lifespan (Years)</Label>
          <input
            type="number"
            placeholder="Expected Lifespan (Years)"
            onChange={handleLifespanChange}
            className="p-2 border rounded mt-2"
            value={expectedLifespan}
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

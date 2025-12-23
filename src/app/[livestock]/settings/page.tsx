'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { LogOut, Palette, User, Building, Landmark } from 'lucide-react';
import { useFarm } from '@/context/farm-context';

export default function SettingsPage() {
  const {
    farmName,
    setFarmName,
    managerName,
    setManagerName,
    farmLocation,
    setFarmLocation,
    currency,
    setCurrency,
  } = useFarm();

  const [isDark, setIsDark] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate user being logged in

  useEffect(() => {
    setIsClient(true);
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleThemeChange = (checked: boolean) => {
    setIsDark(checked);
    localStorage.setItem('darkMode', String(checked));
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!isClient) {
    return null; // or a skeleton loader
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-headline text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your farm and app preferences.
        </p>
      </div>

      <div className="grid gap-8 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" /> Farm Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="farm-name">Farm Name</Label>
              <Input
                id="farm-name"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farm-manager">Farm Manager</Label>
              <Input
                id="farm-manager"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farm-location">Farm Location</Label>
              <Input
                id="farm-location"
                value={farmLocation}
                onChange={(e) => setFarmLocation(e.target.value)}
                placeholder="e.g., Vermont, USA"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" /> App Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch
                id="dark-mode"
                checked={isDark}
                onCheckedChange={handleThemeChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={currency}
                onValueChange={
                  (value: 'usd' | 'eur' | 'gbp' | 'kes') => setCurrency(value)
                }
              >
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                  <SelectItem value="kes">KES (Ksh)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Landmark className="h-5 w-5 text-primary" /> Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Our Pricing Plan
            </Button>
            {isLoggedIn && (
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => setIsLoggedIn(false)}
              >
                <LogOut className="mr-2 h-4 w-4" /> Log Out
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

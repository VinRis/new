'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { LogOut, Palette, User, Building, Landmark } from "lucide-react";

export default function SettingsPage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = (checked: boolean) => {
    if(checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setIsDark(checked);
  };
  
  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-headline text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your farm and app preferences.</p>
      </div>

      <div className="grid gap-8 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Building className="h-5 w-5 text-primary"/> Farm Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="farm-name">Farm Name</Label>
              <Input id="farm-name" defaultValue="Sunrise Farms" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farm-manager">Farm Manager</Label>
              <Input id="farm-manager" defaultValue="Jane Doe" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Palette className="h-5 w-5 text-primary"/> App Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
               <Select defaultValue="usd">
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
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
                </div>
                <Switch id="dark-mode" checked={isDark} onCheckedChange={toggleDarkMode} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Landmark className="h-5 w-5 text-primary"/> Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <Button variant="outline" className="w-full">Our Pricing Plan</Button>
            <Button variant="destructive" className="w-full">
              <LogOut className="mr-2 h-4 w-4" /> Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

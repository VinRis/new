
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LoginModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export function LoginModal({ isOpen, onOpenChange }: LoginModalProps) {

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-headline text-center text-2xl">Welcome Back</DialogTitle>
                    <DialogDescription className="text-center">
                        Sign in to sync your data across devices.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Log In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="email-login">Email</Label>
                                <Input id="email-login" type="email" placeholder="m@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password-login">Password</Label>
                                <Input id="password-login" type="password" />
                            </div>
                        </div>
                        <Button className="w-full">Log In</Button>
                    </TabsContent>
                    <TabsContent value="signup">
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="email-signup">Email</Label>
                                <Input id="email-signup" type="email" placeholder="m@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password-signup">Password</Label>
                                <Input id="password-signup" type="password" />
                            </div>
                        </div>
                        <Button className="w-full">Create Account</Button>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}

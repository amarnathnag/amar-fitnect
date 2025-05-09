
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";

// Form validation schema
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  setError?: (error: string | null) => void;
  isAdminLogin?: boolean;
  adminEmail?: string;
  setAdminEmail?: React.Dispatch<React.SetStateAction<string>>;
  adminPassword?: string;
  setAdminPassword?: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess, 
  setError,
  isAdminLogin,
  adminEmail,
  setAdminEmail,
  adminPassword,
  setAdminPassword
}) => {
  const { toast } = useToast();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  // Login form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: isAdminLogin && adminEmail ? adminEmail : "",
      password: isAdminLogin && adminPassword ? adminPassword : "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      if (setError) setError(null);
      await login(values.email, values.password);
      toast({
        title: "Login successful!",
        description: "Welcome back to your health journey.",
      });
      if (onSuccess) onSuccess();
    } catch (error: any) {
      if (setError) setError(error.message || "Login failed");
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  // For controlled admin login fields
  const handleAdminEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setAdminEmail) setAdminEmail(e.target.value);
  };

  const handleAdminPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setAdminPassword) setAdminPassword(e.target.value);
  };

  // For admin login specific form
  if (isAdminLogin) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="admin-email">Email</Label>
          <div className="relative">
            <Input 
              id="admin-email"
              type="email"
              value={adminEmail}
              onChange={handleAdminEmailChange}
              placeholder="admin@example.com"
              disabled={isLoading}
            />
            <Mail className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="admin-password">Password</Label>
          <div className="relative">
            <Input 
              id="admin-password"
              type={showPassword ? "text" : "password"}
              value={adminPassword}
              onChange={handleAdminPasswordChange}
              placeholder="********"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-muted-foreground"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        <Button 
          type="button" 
          className="w-full"
          disabled={isLoading || !adminEmail || !adminPassword} 
          onClick={() => onSubmit({ email: adminEmail || '', password: adminPassword || '' })}
        >
          {isLoading ? "Logging in..." : "Admin Login"}
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <Mail className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="********" 
                    {...field} 
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;

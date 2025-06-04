
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface DietPlan {
  id: string;
  name: string;
  goal: string;
  created_at: string;
  updated_at: string;
}

export interface DietPlanMeal {
  id: string;
  diet_plan_id: string;
  day_of_week: string;
  meal_type: string;
  food_name: string;
  quantity?: string;
  calories?: number;
}

export const useDietPlans = () => {
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchDietPlans = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching diet plans...');
      
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        console.log('No active session found when fetching diet plans');
        setDietPlans([]);
        return;
      }

      console.log('Session found, fetching diet plans for user:', sessionData.session.user.id);

      const { data, error } = await supabase
        .from('diet_plans')
        .select('*')
        .eq('user_id', sessionData.session.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching diet plans:', error);
        toast({
          title: "Error",
          description: "Could not fetch your diet plans.",
          variant: "destructive",
        });
        return;
      }

      console.log('Diet plans fetched:', data);
      setDietPlans(data || []);
    } catch (error) {
      console.error('Error in fetchDietPlans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createDietPlan = async (name: string, goal: string) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to create a diet plan",
          variant: "destructive",
        });
        return null;
      }

      console.log('Creating diet plan:', { name, goal });

      const { data, error } = await supabase
        .from('diet_plans')
        .insert([{ 
          user_id: sessionData.session.user.id,
          name,
          goal
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating diet plan:', error);
        toast({
          title: "Error",
          description: "Could not create diet plan.",
          variant: "destructive",
        });
        return null;
      }

      console.log('Diet plan created:', data);

      toast({
        title: "Success",
        description: "Diet plan created successfully!",
      });

      await fetchDietPlans();
      return data;
    } catch (error) {
      console.error('Error in createDietPlan:', error);
      return null;
    }
  };

  const addMealToPlan = async (dietPlanId: string, dayOfWeek: string, mealType: string, foodName: string, quantity?: string, calories?: number) => {
    try {
      console.log('Adding meal to plan:', { dietPlanId, dayOfWeek, mealType, foodName, quantity, calories });

      const { data, error } = await supabase
        .from('diet_plan_meals')
        .insert([{
          diet_plan_id: dietPlanId,
          day_of_week: dayOfWeek,
          meal_type: mealType,
          food_name: foodName,
          quantity,
          calories
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding meal:', error);
        toast({
          title: "Error",
          description: "Could not add meal to diet plan.",
          variant: "destructive",
        });
        return null;
      }

      console.log('Meal added successfully:', data);
      return data;
    } catch (error) {
      console.error('Error in addMealToPlan:', error);
      return null;
    }
  };

  const getMealsForPlan = async (dietPlanId: string) => {
    try {
      console.log('Fetching meals for plan:', dietPlanId);

      const { data, error } = await supabase
        .from('diet_plan_meals')
        .select('*')
        .eq('diet_plan_id', dietPlanId)
        .order('day_of_week', { ascending: true });

      if (error) {
        console.error('Error fetching meals:', error);
        return [];
      }

      console.log('Meals fetched for plan:', data);
      return data || [];
    } catch (error) {
      console.error('Error in getMealsForPlan:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchDietPlans();
  }, []);

  return {
    dietPlans,
    isLoading,
    fetchDietPlans,
    createDietPlan,
    addMealToPlan,
    getMealsForPlan
  };
};

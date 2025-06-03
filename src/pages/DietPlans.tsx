
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, Clock, Target, Plus, CheckCircle } from 'lucide-react';
import EnhancedDietPlanCreator from '@/components/diet/EnhancedDietPlanCreator';
import { useDietPlans } from '@/hooks/useDietPlans';
import { dietTemplates } from '@/data/dietTemplates';
import { useToast } from "@/hooks/use-toast";

const DietPlans = () => {
  const [activeTab, setActiveTab] = useState("create");
  const { dietPlans, isLoading, createDietPlan, addMealToPlan } = useDietPlans();
  const { toast } = useToast();
  const [loadingTemplate, setLoadingTemplate] = useState<string | null>(null);

  const handleUseTemplate = async (templateId: string) => {
    try {
      setLoadingTemplate(templateId);
      
      const template = dietTemplates.find(t => t.id === templateId);
      if (!template) {
        toast({
          title: "Error",
          description: "Template not found",
          variant: "destructive",
        });
        return;
      }

      // Create the diet plan
      const createdPlan = await createDietPlan(template.name, template.goal);
      
      if (!createdPlan) {
        toast({
          title: "Error",
          description: "Failed to create diet plan from template",
          variant: "destructive",
        });
        return;
      }

      // Add meals from template to the plan
      for (const [dayName, dayMeals] of Object.entries(template.weekPlan)) {
        for (const [mealType, foods] of Object.entries(dayMeals)) {
          for (const food of foods) {
            await addMealToPlan(
              createdPlan.id,
              dayName,
              mealType,
              food.name,
              food.quantity,
              food.calories
            );
          }
        }
      }

      toast({
        title: "Template Applied!",
        description: `${template.name} has been created with all meals. You can now customize it further.`,
      });

      setActiveTab("my-plans");
    } catch (error) {
      console.error('Error applying template:', error);
      toast({
        title: "Error",
        description: "Failed to apply template. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingTemplate(null);
    }
  };

  const templateCards = [
    { id: 'weight-loss-starter', name: "Weight Loss Starter", goal: "weight-loss", meals: 21 },
    { id: 'muscle-building', name: "Muscle Building", goal: "muscle-gain", meals: 28 },
    { id: 'pcos-friendly', name: "PCOS Friendly", goal: "pcos-management", meals: 35 },
    { id: 'thyroid-care', name: "Thyroid Care", goal: "thyroid-control", meals: 24 },
    { id: 'maintenance-plan', name: "Maintenance Plan", goal: "maintenance", meals: 30 },
    { id: 'beginner-friendly', name: "Beginner Friendly", goal: "weight-loss", meals: 18 }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="container-custom py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Diet Plans</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create personalized diet plans with time-wise food selection
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="create" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Plan
              </TabsTrigger>
              <TabsTrigger value="my-plans" className="flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                My Plans
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Templates
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="create" className="mt-0">
              <EnhancedDietPlanCreator />
            </TabsContent>
            
            <TabsContent value="my-plans" className="mt-0">
              <div className="space-y-6">
                {isLoading ? (
                  <div className="text-center py-8">Loading your diet plans...</div>
                ) : dietPlans.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dietPlans.map((plan) => (
                      <Card key={plan.id}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Utensils className="h-5 w-5 text-green-500" />
                            {plan.name}
                          </CardTitle>
                          <CardDescription>
                            <Badge variant="outline">{plan.goal.replace('-', ' ')}</Badge>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Clock className="h-4 w-4" />
                              Created {new Date(plan.created_at).toLocaleDateString()}
                            </div>
                            <Button variant="outline" className="w-full">
                              View Plan Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="text-center py-8">
                      <Utensils className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Diet Plans Yet</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Create your first personalized diet plan to get started
                      </p>
                      <Button onClick={() => setActiveTab("create")}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Plan
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="templates" className="mt-0">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Ready-to-Use Diet Plans</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose from our expertly crafted diet plans with pre-planned meals for an entire week
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templateCards.map((template) => {
                  const templateData = dietTemplates.find(t => t.id === template.id);
                  const isLoading = loadingTemplate === template.id;
                  
                  return (
                    <Card key={template.id} className="relative">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{template.name}</span>
                          {templateData && (
                            <Badge variant="secondary" className="text-xs">
                              {templateData.dailyCalories} cal/day
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>
                          <Badge variant="outline">{template.goal.replace('-', ' ')}</Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {templateData && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {templateData.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Utensils className="h-4 w-4" />
                            {template.meals} pre-planned meals
                          </div>
                          {templateData && (
                            <div className="text-xs bg-gray-50 dark:bg-gray-800 p-2 rounded">
                              <strong>Sample meals:</strong>
                              <ul className="mt-1 space-y-1">
                                {Object.entries(templateData.weekPlan.Monday).slice(0, 2).map(([mealType, foods]) => (
                                  <li key={mealType} className="text-gray-600 dark:text-gray-400">
                                    • {mealType}: {foods[0]?.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <Button 
                            onClick={() => handleUseTemplate(template.id)}
                            className="w-full"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Creating Plan...
                              </>
                            ) : (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Use Template
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DietPlans;


import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, Clock, Target, Plus, CheckCircle, Zap, Users, Eye, ChefHat, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EnhancedDietPlanForm from '@/components/diet/EnhancedDietPlanForm';
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

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="container-custom py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Enhanced Diet Plan System</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create personalized diet plans with advanced customization and time-wise food selection
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="create" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Custom Plan
              </TabsTrigger>
              <TabsTrigger value="my-plans" className="flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                My Plans
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Ready-to-Use Plans
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="create" className="mt-0">
              <EnhancedDietPlanForm />
            </TabsContent>
            
            <TabsContent value="my-plans" className="mt-0">
              <div className="space-y-6">
                {isLoading ? (
                  <div className="text-center py-8">Loading your diet plans...</div>
                ) : dietPlans.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dietPlans.map((plan) => (
                      <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Utensils className="h-5 w-5 text-green-500" />
                            {plan.name}
                          </CardTitle>
                          <CardDescription>
                            <Badge variant="outline" className="capitalize">
                              {plan.goal.replace('-', ' ')}
                            </Badge>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
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
                    <CardContent className="text-center py-12">
                      <Utensils className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Diet Plans Yet</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Create your first personalized diet plan or use one of our ready-to-use templates
                      </p>
                      <div className="flex gap-3 justify-center">
                        <Button onClick={() => setActiveTab("create")}>
                          <Plus className="mr-2 h-4 w-4" />
                          Create Custom Plan
                        </Button>
                        <Button variant="outline" onClick={() => setActiveTab("templates")}>
                          <Target className="mr-2 h-4 w-4" />
                          Browse Templates
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="templates" className="mt-0">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-6 w-6 text-blue-500" />
                  <h2 className="text-2xl font-semibold">Ready-to-Use Indian Diet Plans</h2>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Professionally Designed
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose from our expertly crafted Indian diet plans with pre-planned meals for an entire week. 
                  Each plan includes specific foods, portions, and calorie counts tailored for Indian cuisine.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dietTemplates.map((template) => {
                  const isLoading = loadingTemplate === template.id;
                  
                  return (
                    <Card key={template.id} className="relative hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <Badge variant="secondary" className="text-xs font-medium">
                            {template.dailyCalories} cal/day
                          </Badge>
                        </div>
                        <CardDescription className="space-y-2">
                          <Badge variant="outline" className="capitalize">
                            {template.goal.replace('-', ' ')}
                          </Badge>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            <strong>Focus:</strong> {template.focus}
                          </p>
                          <p className="text-sm text-blue-600 dark:text-blue-400">
                            <strong>Ideal for:</strong> {template.idealFor}
                          </p>
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {template.description}
                        </p>
                        
                        <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                          <Utensils className="h-4 w-4" />
                          {template.totalMeals} pre-planned meals
                        </div>

                        {/* Sample Meals Preview */}
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                            <ChefHat className="h-3 w-3" />
                            Sample Indian Meals:
                          </h4>
                          <div className="space-y-1">
                            {template.sampleMeals.slice(0, 2).map((meal, index) => (
                              <div key={index} className="text-xs text-gray-600 dark:text-gray-400">
                                <span className="font-medium text-green-600">{meal.time}:</span> {meal.meal}
                                <span className="text-orange-500 ml-1">({meal.calories} cal)</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="flex-1">
                                <Eye className="mr-1 h-3 w-3" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <Utensils className="h-5 w-5 text-green-500" />
                                  {template.name} - Full Day Plan
                                </DialogTitle>
                                <DialogDescription>
                                  Complete meal breakdown with timing and calories
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                  <div>
                                    <p className="text-sm font-medium">Daily Calories</p>
                                    <p className="text-lg font-bold text-green-600">{template.dailyCalories} kcal</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Total Meals</p>
                                    <p className="text-lg font-bold text-blue-600">{template.totalMeals}/week</p>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <h4 className="font-semibold flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Daily Meal Schedule
                                  </h4>
                                  {template.sampleMeals.map((meal, index) => (
                                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <Clock className="h-3 w-3 text-gray-500" />
                                          <span className="text-sm font-medium text-blue-600">{meal.time}</span>
                                        </div>
                                        <p className="font-medium">{meal.meal}</p>
                                        <p className="text-xs text-gray-500">{meal.description}</p>
                                      </div>
                                      <Badge variant="outline" className="ml-2">
                                        {meal.calories} cal
                                      </Badge>
                                    </div>
                                  ))}
                                </div>

                                <div className="pt-4 border-t">
                                  <Button 
                                    onClick={() => handleUseTemplate(template.id)}
                                    className="w-full bg-green-500 hover:bg-green-600"
                                    disabled={isLoading}
                                  >
                                    {isLoading ? (
                                      <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Creating Plan...
                                      </>
                                    ) : (
                                      <>
                                        <Zap className="mr-2 h-4 w-4" />
                                        Use This Template
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button 
                            onClick={() => handleUseTemplate(template.id)}
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 flex-1"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                                Creating...
                              </>
                            ) : (
                              <>
                                <Zap className="mr-1 h-3 w-3" />
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
              
              <div className="mt-8 text-center">
                <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Target className="h-5 w-5 text-blue-500" />
                      <h3 className="text-lg font-semibold">Need Something Custom?</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Templates not quite right? Create a fully customized diet plan with BMR calculation and personalized Indian food preferences.
                    </p>
                    <Button onClick={() => setActiveTab("create")} variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Custom Diet Plan
                    </Button>
                  </CardContent>
                </Card>
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

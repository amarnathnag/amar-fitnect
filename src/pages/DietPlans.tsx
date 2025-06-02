
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, Clock, Target, Plus } from 'lucide-react';
import EnhancedDietPlanCreator from '@/components/diet/EnhancedDietPlanCreator';
import { useDietPlans } from '@/hooks/useDietPlans';

const DietPlans = () => {
  const [activeTab, setActiveTab] = useState("create");
  const { dietPlans, isLoading } = useDietPlans();

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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Weight Loss Starter", goal: "weight-loss", meals: 21 },
                  { name: "Muscle Building", goal: "muscle-gain", meals: 28 },
                  { name: "PCOS Friendly", goal: "pcos-management", meals: 35 },
                  { name: "Thyroid Care", goal: "thyroid-control", meals: 24 },
                  { name: "Maintenance Plan", goal: "maintenance", meals: 30 },
                  { name: "Beginner Friendly", goal: "weight-loss", meals: 18 }
                ].map((template, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription>
                        <Badge variant="outline">{template.goal.replace('-', ' ')}</Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {template.meals} pre-planned meals
                        </p>
                        <Button variant="outline" className="w-full">
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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

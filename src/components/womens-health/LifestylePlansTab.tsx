
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Calendar, DollarSign, Salad, Apple, ClipboardList } from 'lucide-react';
import PCOSDietPlan from './PCOSDietPlan';
import PregnancyDietPlan from './PregnancyDietPlan';
import WeightManagementPlan from './WeightManagementPlan';

const LifestylePlansTab = () => {
  return (
    <div className="space-y-8">
      {/* Diet Plans Introduction */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Lifestyle & Diet Plans</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Our personalized diet and lifestyle plans are designed specifically for women's unique health needs. 
          Explore our comprehensive plans tailored for different health conditions and goals.
        </p>
        
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/diet-plans">
            <Button variant="outline" className="gap-2">
              <ClipboardList className="h-4 w-4" />
              All Diet Plans
            </Button>
          </Link>
          <Link to="/diet-plans#diet-ingredients">
            <Button variant="outline" className="gap-2">
              <Calculator className="h-4 w-4" />
              Diet Cost Calculator
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Weight Management Plan Component */}
        <WeightManagementPlan />
        
        {/* PCOS Diet Plan Component */}
        <PCOSDietPlan />
        
        {/* Pregnancy Diet Plan Component */}
        <PregnancyDietPlan />

        {/* Diet Ingredients Banner */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800/30 overflow-hidden">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                Diet Ingredients & Cost Estimation
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Calculate the cost of your diet plan with our interactive ingredient selector. Compare nutritional values and find the best options for your budget.
              </p>
              <Link to="/diet-plans#diet-ingredients">
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Calculator className="h-4 w-4" /> 
                  Estimate Diet Cost
                </Button>
              </Link>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-800/30 flex items-center justify-center">
                <DollarSign className="h-16 w-16 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LifestylePlansTab;

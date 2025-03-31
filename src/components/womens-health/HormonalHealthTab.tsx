
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, BarChart3 } from 'lucide-react';
import PCOSDietPlan from './PCOSDietPlan';

const HormonalHealthTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="health-card overflow-hidden">
        <CardHeader>
          <div className="p-4 rounded-lg inline-block mb-2 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
            <Activity className="h-10 w-10" />
          </div>
          <CardTitle>Thyroid Disorders</CardTitle>
          <CardDescription>
            Management of hypothyroidism and hyperthyroidism through diet and lifestyle changes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Common Symptoms</h3>
            <div className="flex flex-wrap gap-2">
              {["Fatigue", "Weight changes", "Hair loss", "Cold/heat sensitivity", "Depression", "Irregular periods"].map((symptom, index) => (
                <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-between">
          <Button variant="outline" className="flex-1 mr-2" asChild>
            <Link to="/diet-plans">View Diet Plan</Link>
          </Button>
          <Button className="flex-1 ml-2 btn-primary" asChild>
            <Link to="/disease-management/thyroid">
              Management <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <Card className="health-card overflow-hidden">
        <CardHeader>
          <div className="p-4 rounded-lg inline-block mb-2 bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
            <BarChart3 className="h-10 w-10" />
          </div>
          <CardTitle>Osteoporosis Prevention</CardTitle>
          <CardDescription>
            Strategies for maintaining bone health and preventing bone density loss in women.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Risk Factors</h3>
            <div className="flex flex-wrap gap-2">
              {["Menopause", "Low calcium intake", "Vitamin D deficiency", "Sedentary lifestyle", "Smoking", "Family history"].map((factor, index) => (
                <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                  {factor}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-between">
          <Button variant="outline" className="flex-1 mr-2" asChild>
            <Link to="/diet-plans">View Diet Plan</Link>
          </Button>
          <Button className="flex-1 ml-2 btn-primary" asChild>
            <Link to="/daily-routine">
              Exercise Plan <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      {/* PCOS Diet Plan Component */}
      <PCOSDietPlan />
    </div>
  );
};

export default HormonalHealthTab;

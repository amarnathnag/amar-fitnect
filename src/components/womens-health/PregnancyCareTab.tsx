
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Check } from 'lucide-react';
import PregnancyDietPlan from './PregnancyDietPlan';

const PregnancyCareTab = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="health-card overflow-hidden">
        <CardHeader>
          <div className="p-4 rounded-lg inline-block mb-2 bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400">
            <Clock className="h-10 w-10" />
          </div>
          <CardTitle>9-Month Pregnancy Care</CardTitle>
          <CardDescription>
            Comprehensive guide to maternal care through each trimester of pregnancy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">First Trimester (1-3 months)</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Diet: Folic acid, iron, and calcium-rich foods</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Symptoms: Morning sickness, fatigue, breast tenderness</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Care: Regular checkups, first ultrasound, prenatal vitamins</span>
                </li>
              </ul>
            </div>
            <div className="bg-pink-50/50 dark:bg-pink-900/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Second Trimester (4-6 months)</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Diet: Protein, vitamin D, omega-3 for baby's brain</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Symptoms: Weight gain, back pain, baby movements</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Care: Maternity yoga, blood sugar checks</span>
                </li>
              </ul>
            </div>
            <div className="bg-purple-50/50 dark:bg-purple-900/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Third Trimester (7-9 months)</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Diet: Fiber, hydration, iron for avoiding anemia</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Symptoms: Frequent urination, breathing difficulty</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Care: Hospital bag preparation, labor signs</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-between">
          <Button variant="outline" className="flex-1 mr-2" asChild>
            <Link to="/lifestyle">View Diet Plan</Link>
          </Button>
          <Button className="flex-1 ml-2 btn-primary" asChild>
            <Link to="/doctor-consultation">
              Consult Doctor <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      {/* Pregnancy Diet Plan Component */}
      <PregnancyDietPlan />
    </div>
  );
};

export default PregnancyCareTab;

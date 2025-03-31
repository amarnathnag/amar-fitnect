
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Activity, Info, Check } from 'lucide-react';

const MenstrualHealthTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="health-card overflow-hidden">
        <CardHeader>
          <div className="p-4 rounded-lg inline-block mb-2 bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400">
            <Calendar className="h-10 w-10" />
          </div>
          <CardTitle>Irregular Periods</CardTitle>
          <CardDescription>
            Causes, treatment options, and lifestyle changes to manage irregular menstrual cycles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Common Symptoms</h3>
            <div className="flex flex-wrap gap-2">
              {["Missing periods", "Periods too close together", "Unpredictable cycles", "Heavy bleeding", "Spotting between periods"].map((symptom, index) => (
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
            <Link to="/lifestyle">
              Learn More <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <Card className="health-card overflow-hidden">
        <CardHeader>
          <div className="p-4 rounded-lg inline-block mb-2 bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
            <Activity className="h-10 w-10" />
          </div>
          <CardTitle>PCOS/PCOD</CardTitle>
          <CardDescription>
            Comprehensive management of Polycystic Ovarian Syndrome through diet, exercise, and lifestyle modifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Common Symptoms</h3>
            <div className="flex flex-wrap gap-2">
              {["Irregular periods", "Weight gain", "Acne", "Excess hair growth", "Fatigue", "Mood changes"].map((symptom, index) => (
                <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                  {symptom}
                </span>
              ))}
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

      <Card className="health-card overflow-hidden md:col-span-2">
        <CardHeader>
          <div className="p-4 rounded-lg inline-block mb-2 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
            <Info className="h-10 w-10" />
          </div>
          <CardTitle>Menstrual Hygiene</CardTitle>
          <CardDescription>
            Best practices and safe products for maintaining proper menstrual hygiene and health.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Change Regularly
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Replace pads/tampons every 4-6 hours to prevent bacterial growth and infections.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Consider Alternatives
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Menstrual cups and period underwear are eco-friendly options with less risk of toxic shock syndrome.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Personal Hygiene
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clean the genital area with warm water, avoid douches or scented products that disrupt pH balance.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
          <Link to="/community" className="w-full">
            <Button className="w-full">Join Community Discussion</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MenstrualHealthTab;

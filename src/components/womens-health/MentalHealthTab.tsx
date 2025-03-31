
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Activity } from 'lucide-react';

const MentalHealthTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="health-card overflow-hidden">
        <CardHeader>
          <div className="p-4 rounded-lg inline-block mb-2 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
            <Brain className="h-10 w-10" />
          </div>
          <CardTitle>Postpartum Depression</CardTitle>
          <CardDescription>
            Understanding, recognizing, and treating depression that can occur after childbirth.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Warning Signs</h3>
            <div className="flex flex-wrap gap-2">
              {["Severe mood swings", "Excessive crying", "Withdrawing from loved ones", "Fatigue", "Hopelessness", "Thoughts of self-harm"].map((sign, index) => (
                <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                  {sign}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-between">
          <Button variant="outline" className="flex-1 mr-2" asChild>
            <Link to="/community">Join Support Group</Link>
          </Button>
          <Button className="flex-1 ml-2 btn-primary" asChild>
            <Link to="/doctor-consultation">
              Consult Therapist <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <Card className="health-card overflow-hidden">
        <CardHeader>
          <div className="p-4 rounded-lg inline-block mb-2 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
            <Activity className="h-10 w-10" />
          </div>
          <CardTitle>Anxiety & Stress Management</CardTitle>
          <CardDescription>
            Practical techniques for managing anxiety and stress through lifestyle modifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Helpful Techniques</h3>
            <div className="flex flex-wrap gap-2">
              {["Deep breathing", "Meditation", "Regular exercise", "Adequate sleep", "Talk therapy", "Time management"].map((technique, index) => (
                <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                  {technique}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-between">
          <Button variant="outline" className="flex-1 mr-2" asChild>
            <Link to="/daily-routine">View Techniques</Link>
          </Button>
          <Button className="flex-1 ml-2 btn-primary" asChild>
            <Link to="/doctor-consultation">
              Get Support <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MentalHealthTab;

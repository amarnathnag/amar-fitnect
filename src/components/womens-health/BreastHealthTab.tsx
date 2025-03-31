
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const BreastHealthTab = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="health-card overflow-hidden">
        <CardHeader>
          <div className="p-4 rounded-lg inline-block mb-2 bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400">
            <Heart className="h-10 w-10" />
          </div>
          <CardTitle>Breast Cancer Awareness</CardTitle>
          <CardDescription>
            Understanding breast cancer risk factors, prevention strategies, and early detection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Self-Examination Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Step 1: Visual Check</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Look at your breasts in the mirror with hands on hips. Look for any changes in size, shape, or color.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Step 2: Lying Down</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Lie down and use your right hand to check your left breast, and left hand for right breast. Use circular motions with varying pressure.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Step 3: Standing/Shower</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Repeat the examination while standing, such as in the shower when skin is wet and slippery.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3">Warning Signs to Watch For</h3>
            <div className="flex flex-wrap gap-2">
              {["Lump or thickening", "Swelling", "Skin irritation", "Nipple changes", "Nipple discharge", "Pain in any area"].map((sign, index) => (
                <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                  {sign}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
          <Link to="/doctor-consultation" className="w-full">
            <Button className="w-full btn-primary">Schedule Screening Appointment</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BreastHealthTab;

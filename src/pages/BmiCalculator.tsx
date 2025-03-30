
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowRight, Dumbbell, HeartPulse, Info, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  height: string;
  weight: string;
  age: string;
  gender: string;
  unit: string;
}

interface BmiResult {
  bmi: number;
  category: string;
  healthRisk: string;
  color: string;
}

const BmiCalculator = () => {
  const [formData, setFormData] = useState<FormData>({
    height: '',
    weight: '',
    age: '',
    gender: 'male',
    unit: 'metric'
  });

  const [bmiResult, setBmiResult] = useState<BmiResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculateBMI = () => {
    // Basic validation
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const age = parseInt(formData.age);

    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
      toast.error("Please enter valid numbers for height, weight, and age");
      return;
    }

    if (age < 18 || age > 120) {
      toast.error("Age must be between 18 and 120");
      return;
    }

    let bmi: number;
    if (formData.unit === 'metric') {
      // Metric calculation: BMI = weight (kg) / (height (m))²
      const heightInMeters = height / 100; // Convert cm to meters
      bmi = weight / (heightInMeters * heightInMeters);
    } else {
      // Imperial calculation: BMI = (weight (lbs) * 703) / (height (inches))²
      bmi = (weight * 703) / (height * height);
    }

    bmi = parseFloat(bmi.toFixed(1));
    
    let category: string;
    let healthRisk: string;
    let color: string;

    if (bmi < 18.5) {
      category = 'Underweight';
      healthRisk = 'Nutritional deficiency, risk of osteoporosis';
      color = 'text-blue-500'; // Blue for underweight
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal weight';
      healthRisk = 'Low risk';
      color = 'text-health-primary'; // Green for normal
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      healthRisk = 'Moderate risk of developing heart disease, high blood pressure, stroke, diabetes';
      color = 'text-yellow-500'; // Yellow for overweight
    } else {
      category = 'Obese';
      healthRisk = 'High risk of developing heart disease, high blood pressure, stroke, diabetes';
      color = 'text-red-500'; // Red for obese
    }

    setBmiResult({
      bmi,
      category,
      healthRisk,
      color
    });

    setShowResults(true);
    
    toast.success("BMI Calculated Successfully!");
  };

  const resetForm = () => {
    setFormData({
      height: '',
      weight: '',
      age: '',
      gender: 'male',
      unit: 'metric'
    });
    setBmiResult(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-health-light to-blue-50 dark:from-health-dark/30 dark:to-blue-900/30 py-12">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">BMI Calculator</h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                Calculate your Body Mass Index (BMI) to determine whether you are underweight, normal weight, overweight, or obese.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column: BMI Calculator */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold mb-1">Check Your BMI</h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Enter your details below to calculate your Body Mass Index
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Unit Selection */}
                      <div>
                        <Label htmlFor="unit-select">Measurement Unit</Label>
                        <Select 
                          value={formData.unit} 
                          onValueChange={(value) => handleSelectChange('unit', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="metric">Metric (cm, kg)</SelectItem>
                            <SelectItem value="imperial">Imperial (inches, lbs)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Form Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Height */}
                        <div className="space-y-2">
                          <Label htmlFor="height">
                            Height {formData.unit === 'metric' ? '(cm)' : '(inches)'}
                          </Label>
                          <Input
                            id="height"
                            name="height"
                            type="number"
                            placeholder={formData.unit === 'metric' ? 'Height in cm' : 'Height in inches'}
                            value={formData.height}
                            onChange={handleChange}
                          />
                        </div>

                        {/* Weight */}
                        <div className="space-y-2">
                          <Label htmlFor="weight">
                            Weight {formData.unit === 'metric' ? '(kg)' : '(lbs)'}
                          </Label>
                          <Input
                            id="weight"
                            name="weight"
                            type="number"
                            placeholder={formData.unit === 'metric' ? 'Weight in kg' : 'Weight in lbs'}
                            value={formData.weight}
                            onChange={handleChange}
                          />
                        </div>

                        {/* Age */}
                        <div className="space-y-2">
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            name="age"
                            type="number"
                            placeholder="Your age"
                            value={formData.age}
                            onChange={handleChange}
                          />
                        </div>

                        {/* Gender */}
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <RadioGroup
                            value={formData.gender}
                            onValueChange={(value) => handleRadioChange('gender', value)}
                            className="flex space-x-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female">Female</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-4">
                        <Button 
                          type="button" 
                          className="btn-primary" 
                          onClick={calculateBMI}
                        >
                          Calculate BMI
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={resetForm}
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right column: Results and Information */}
              <div className="lg:col-span-1">
                {/* BMI Result Card */}
                {showResults && bmiResult && (
                  <Card className="shadow-lg animate-fade-in mb-6">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Your BMI Result</h3>
                      
                      <div className="text-center mb-4">
                        <div className="text-5xl font-bold mb-2 inline-block">
                          <span className={bmiResult.color}>{bmiResult.bmi}</span>
                        </div>
                        <p className={`text-xl font-medium ${bmiResult.color}`}>
                          {bmiResult.category}
                        </p>
                      </div>

                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
                        <div className="flex gap-2 items-start">
                          <AlertCircle className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">Health Risk:</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {bmiResult.healthRisk}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <Button className="w-full flex items-center justify-center gap-2 bg-health-secondary" asChild>
                          <Link to="/diet-plans">
                            <Utensils className="h-4 w-4" /> Diet Plan
                          </Link>
                        </Button>
                        <Button className="w-full flex items-center justify-center gap-2" variant="outline" asChild>
                          <Link to="/workouts">
                            <Dumbbell className="h-4 w-4" /> Workouts
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* BMI Information Card */}
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex gap-2 mb-4">
                      <Info className="h-5 w-5 text-health-primary flex-shrink-0" />
                      <h3 className="text-xl font-semibold">What is BMI?</h3>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Body Mass Index (BMI) is a measurement that uses your height and weight to determine if your weight is healthy for your height.
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <p className="text-sm"><span className="font-medium">Underweight:</span> BMI less than 18.5</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-health-primary"></div>
                        <p className="text-sm"><span className="font-medium">Normal weight:</span> BMI 18.5 to 24.9</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <p className="text-sm"><span className="font-medium">Overweight:</span> BMI 25 to 29.9</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <p className="text-sm"><span className="font-medium">Obese:</span> BMI 30 or higher</p>
                      </div>
                    </div>

                    <div className="bg-health-light dark:bg-health-dark/20 rounded-lg p-4">
                      <div className="flex gap-2 items-start">
                        <HeartPulse className="h-5 w-5 text-health-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Remember:</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            BMI is just one measurement of health. It doesn't account for factors like muscle mass, body composition, or individual health conditions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Get Personalized Plan CTA */}
            <div className="mt-12 bg-gradient-to-r from-health-primary to-health-accent rounded-xl text-white p-8 text-center shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Want a Fully Personalized Health Plan?</h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Get customized diet plans, workout routines, and health recommendations based on your BMI and personal goals.
              </p>
              <Button className="bg-white text-health-primary hover:bg-gray-100 hover:text-health-dark" size="lg" asChild>
                <Link to="/profile">
                  Create Your Plan <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BmiCalculator;

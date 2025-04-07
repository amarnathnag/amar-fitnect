
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { ArrowRight, Dumbbell, Heart, Weight, Timer, Play, Baby, Users, Star } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateText } from '@/utils/translations';

interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  calories: number;
  category: 'weight-loss' | 'muscle-gain' | 'maintenance' | 'beginner-full-body' | 'pcos-friendly' | 'fat-loss' | 'senior-friendly' | 'kids-fitness';
  image: string;
  exercises: {
    name: string;
    sets: number;
    reps: string;
    duration?: string;
  }[];
  detailedInstructions?: {
    steps: string[];
    targetedMuscles?: string[];
    healthBenefits?: string[];
  };
}

const Workouts = () => {
  const { language } = useLanguage();
  
  const workouts: WorkoutPlan[] = [
    // Weight Loss Workouts
    {
      id: 'hiit-cardio',
      title: 'HIIT Cardio Blast',
      description: 'High-intensity interval training to maximize calorie burn and improve cardiovascular health.',
      level: 'Intermediate',
      duration: '30 min',
      calories: 400,
      category: 'weight-loss',
      image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Jumping Jacks', sets: 3, reps: '45 sec', duration: '15 sec rest' },
        { name: 'Mountain Climbers', sets: 3, reps: '45 sec', duration: '15 sec rest' },
        { name: 'Burpees', sets: 3, reps: '45 sec', duration: '15 sec rest' },
        { name: 'High Knees', sets: 3, reps: '45 sec', duration: '15 sec rest' },
        { name: 'Squat Jumps', sets: 3, reps: '45 sec', duration: '15 sec rest' },
      ],
      detailedInstructions: {
        steps: [
          "Start with a warm-up of light jogging in place for 2 minutes",
          "For Jumping Jacks: Stand with feet together, arms at sides, then jump feet apart while raising arms overhead",
          "For Mountain Climbers: Begin in plank position, alternately drive knees toward chest quickly",
          "For Burpees: Start standing, drop to a squat, kick feet back to plank, return to squat, then jump up",
          "For High Knees: Run in place, lifting knees as high as possible",
          "For Squat Jumps: Lower into squat position, then explosively jump upward"
        ],
        targetedMuscles: ["Quadriceps", "Hamstrings", "Calves", "Core", "Shoulders"],
        healthBenefits: ["Improved cardiovascular health", "Enhanced metabolism", "Better endurance"]
      }
    },
    {
      id: 'full-body-burn',
      title: 'Full Body Fat Burn',
      description: 'A comprehensive workout targeting all major muscle groups to boost metabolism and burn fat.',
      level: 'Beginner',
      duration: '45 min',
      calories: 350,
      category: 'weight-loss',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Bodyweight Squats', sets: 3, reps: '15 reps' },
        { name: 'Push-ups (Modified if needed)', sets: 3, reps: '10 reps' },
        { name: 'Lunges', sets: 3, reps: '12 reps each leg' },
        { name: 'Dumbbell Rows', sets: 3, reps: '12 reps each arm' },
        { name: 'Plank', sets: 3, reps: '30 sec hold' },
      ],
      detailedInstructions: {
        steps: [
          "Start with 5 minutes of light cardio to warm up",
          "For Bodyweight Squats: Stand with feet shoulder-width apart, lower your hips as if sitting in a chair, then return to standing",
          "For Push-ups: Start in plank position, lower chest toward floor by bending elbows, then push back up (modify by using knees)",
          "For Lunges: Step forward with one leg, lower until both knees are bent at 90 degrees, then return to start",
          "For Dumbbell Rows: With a dumbbell in one hand, hinge forward with back flat, pull dumbbell toward hip, then lower",
          "For Plank: Hold a push-up position with body in straight line from head to heels"
        ],
        targetedMuscles: ["Quadriceps", "Chest", "Back", "Core", "Glutes"],
        healthBenefits: ["Increased muscle tone", "Enhanced fat burning", "Improved posture"]
      }
    },
    
    // Muscle Gain Workouts
    {
      id: 'upper-body-strength',
      title: 'Upper Body Strength',
      description: 'Build muscle and strength in your chest, back, shoulders, and arms.',
      level: 'Intermediate',
      duration: '50 min',
      calories: 300,
      category: 'muscle-gain',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: '8-10 reps' },
        { name: 'Pull-ups/Assisted Pull-ups', sets: 4, reps: '8-10 reps' },
        { name: 'Shoulder Press', sets: 3, reps: '10-12 reps' },
        { name: 'Bicep Curls', sets: 3, reps: '12 reps' },
        { name: 'Tricep Dips', sets: 3, reps: '12 reps' },
      ],
      detailedInstructions: {
        steps: [
          "Start with arm circles and shoulder mobility exercises for 5 minutes",
          "For Bench Press: Lie on a bench, grasp barbell with hands just wider than shoulders, lower to chest, then press up",
          "For Pull-ups: Hang from bar with hands wider than shoulders, pull up until chin clears bar (use assist machine if needed)",
          "For Shoulder Press: Seated or standing, press dumbbells from shoulder height straight overhead",
          "For Bicep Curls: Stand with dumbbells at sides, palms forward, curl weights to shoulders",
          "For Tricep Dips: Using parallel bars or bench, lower body by bending elbows, then push back up"
        ],
        targetedMuscles: ["Chest", "Back", "Shoulders", "Biceps", "Triceps"],
        healthBenefits: ["Increased upper body strength", "Improved posture", "Enhanced functional mobility"]
      }
    },
    {
      id: 'lower-body-power',
      title: 'Lower Body Power',
      description: 'Build strong, powerful legs with this focused lower body strength workout.',
      level: 'Advanced',
      duration: '45 min',
      calories: 400,
      category: 'muscle-gain',
      image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Barbell Squats', sets: 4, reps: '8 reps' },
        { name: 'Deadlifts', sets: 4, reps: '8 reps' },
        { name: 'Leg Press', sets: 3, reps: '10 reps' },
        { name: 'Walking Lunges', sets: 3, reps: '12 steps each leg' },
        { name: 'Calf Raises', sets: 3, reps: '15 reps' },
      ],
      detailedInstructions: {
        steps: [
          "Begin with dynamic stretches for legs including leg swings and hip circles for 5 minutes",
          "For Barbell Squats: Position barbell on upper back, feet shoulder-width apart, squat down until thighs are parallel, then drive up",
          "For Deadlifts: Stand with feet hip-width apart, hinge at hips to grasp barbell, lift by extending hips and knees",
          "For Leg Press: Sit in machine with feet on platform, extend legs without locking knees, then return to start",
          "For Walking Lunges: Step forward into lunge position, push off front foot to bring feet together, then repeat with other leg",
          "For Calf Raises: Stand with feet hip-width apart, rise onto toes, then lower heels back down"
        ],
        targetedMuscles: ["Quadriceps", "Hamstrings", "Glutes", "Calves", "Lower back"],
        healthBenefits: ["Increased lower body strength", "Improved athletic performance", "Better joint stability"]
      }
    },
    
    // Maintenance Workouts
    {
      id: 'balanced-fitness',
      title: 'Balanced Fitness Routine',
      description: 'Maintain your current fitness level with this balanced full-body workout.',
      level: 'Beginner',
      duration: '40 min',
      calories: 250,
      category: 'maintenance',
      image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Bodyweight Squats', sets: 3, reps: '12 reps' },
        { name: 'Push-ups', sets: 3, reps: '10 reps' },
        { name: 'Dumbbell Rows', sets: 3, reps: '12 reps each arm' },
        { name: 'Bicycle Crunches', sets: 3, reps: '20 reps' },
        { name: 'Jumping Jacks', sets: 2, reps: '1 min' },
      ],
      detailedInstructions: {
        steps: [
          "Begin with 5 minutes of light cardio like marching in place",
          "For Bodyweight Squats: Stand with feet shoulder-width apart, lower hips until thighs are parallel to floor, then return to standing",
          "For Push-ups: With hands slightly wider than shoulders, lower chest to ground, then push back up",
          "For Dumbbell Rows: Hinge at hips with back flat, pull dumbbell to hip, then lower",
          "For Bicycle Crunches: Lie on back, hands behind head, alternate bringing elbow to opposite knee",
          "For Jumping Jacks: Jump feet out wide while bringing arms overhead, then return to start position"
        ],
        targetedMuscles: ["Full body", "Core", "Upper back", "Chest", "Legs"],
        healthBenefits: ["Maintained muscle mass", "Sustained cardiovascular health", "Continued mobility"]
      }
    },
    {
      id: 'bodyweight-circuit',
      title: 'Bodyweight Circuit',
      description: 'A convenient, equipment-free circuit to maintain fitness anywhere.',
      level: 'Intermediate',
      duration: '30 min',
      calories: 300,
      category: 'maintenance',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Squats', sets: 3, reps: '15 reps' },
        { name: 'Push-ups', sets: 3, reps: '12 reps' },
        { name: 'Lunges', sets: 3, reps: '10 reps each leg' },
        { name: 'Plank', sets: 3, reps: '45 sec hold' },
        { name: 'Mountain Climbers', sets: 3, reps: '30 sec' },
      ],
      detailedInstructions: {
        steps: [
          "Start with a 3-minute dynamic warm-up",
          "For Squats: With feet shoulder-width apart, bend knees and push hips back, then return to standing",
          "For Push-ups: In plank position, lower chest to floor by bending elbows, then push back up",
          "For Lunges: Step forward with one leg, lower until both knees are at 90 degrees, then return to start",
          "For Plank: Hold a straight line from head to heels, supporting weight on forearms and toes",
          "For Mountain Climbers: In plank position, rapidly alternate bringing knees toward chest"
        ],
        targetedMuscles: ["Quadriceps", "Chest", "Core", "Hamstrings", "Shoulders"],
        healthBenefits: ["Maintained overall fitness", "Convenience for busy schedules", "No equipment required"]
      }
    },
    
    // Beginner Full Body Workouts
    {
      id: 'beginner-home-workout',
      title: 'Home Starter Workout',
      description: 'A simple yet effective full-body workout routine perfect for beginners with no equipment needed.',
      level: 'Beginner',
      duration: '25 min',
      calories: 200,
      category: 'beginner-full-body',
      image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Jumping Jacks', sets: 2, reps: '30 sec' },
        { name: 'Wall Sit', sets: 2, reps: '20 sec hold' },
        { name: 'Modified Push-ups', sets: 2, reps: '8 reps' },
        { name: 'Bodyweight Squats', sets: 2, reps: '12 reps' },
        { name: 'Plank', sets: 2, reps: '20 sec hold' },
      ],
      detailedInstructions: {
        steps: [
          "Begin with a gentle 3-minute warm-up of marching in place",
          "For Jumping Jacks: Stand with feet together, jump to wide stance while raising arms overhead, then return to start",
          "For Wall Sit: Lean against wall with feet shoulder-width apart, slide down until thighs are parallel to floor, hold position",
          "For Modified Push-ups: On knees with hands shoulder-width apart, lower chest toward floor, then push back up",
          "For Bodyweight Squats: With feet shoulder-width apart, push hips back and bend knees as if sitting in chair, then stand",
          "For Plank: Support weight on forearms and toes, keeping body in straight line from head to heels"
        ],
        targetedMuscles: ["Full body", "Core", "Legs", "Chest", "Shoulders"],
        healthBenefits: ["Building foundation strength", "Learning proper form", "Increasing confidence for beginners"]
      }
    },
    {
      id: 'gentle-mobility',
      title: 'Gentle Mobility Routine',
      description: 'Improve flexibility and joint mobility with this gentle routine suitable for all fitness levels.',
      level: 'Beginner',
      duration: '20 min',
      calories: 120,
      category: 'beginner-full-body',
      image: 'https://images.unsplash.com/photo-1571656315180-3b5611c2b334?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Neck Rotations', sets: 2, reps: '8 each side' },
        { name: 'Shoulder Circles', sets: 2, reps: '10 each direction' },
        { name: 'Hip Circles', sets: 2, reps: '8 each direction' },
        { name: 'Knee Circles', sets: 2, reps: '8 each leg' },
        { name: 'Ankle Rotations', sets: 2, reps: '10 each foot' },
      ],
      detailedInstructions: {
        steps: [
          "Start by standing or sitting in a comfortable position",
          "For Neck Rotations: Slowly turn head to look over right shoulder, then left, moving gently without strain",
          "For Shoulder Circles: Roll shoulders forward in big circles, then backward, keeping arms relaxed",
          "For Hip Circles: Stand on one leg, circle raised knee in wide circles, then switch legs",
          "For Knee Circles: Sitting or standing with support, bend knee slightly and rotate in circular motion",
          "For Ankle Rotations: Lift foot off ground, rotate ankle clockwise then counterclockwise"
        ],
        targetedMuscles: ["Joints", "Connective tissue", "Neck", "Shoulders", "Hips"],
        healthBenefits: ["Improved joint mobility", "Reduced stiffness", "Better overall movement quality"]
      }
    },
    
    // PCOS & Thyroid-Friendly Workouts
    {
      id: 'pcos-yoga-flow',
      title: 'Gentle Yoga for Hormonal Balance',
      description: 'A calming yoga routine designed to help balance hormones and reduce stress for those with PCOS or thyroid conditions.',
      level: 'Beginner',
      duration: '35 min',
      calories: 150,
      category: 'pcos-friendly',
      image: 'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Cat-Cow Pose', sets: 1, reps: '10 repetitions' },
        { name: 'Child\'s Pose', sets: 1, reps: '2 min hold' },
        { name: 'Butterfly Pose', sets: 1, reps: '2 min hold' },
        { name: 'Legs Up The Wall', sets: 1, reps: '5 min hold' },
        { name: 'Corpse Pose with Deep Breathing', sets: 1, reps: '5 min' },
      ],
      detailedInstructions: {
        steps: [
          "Begin in a comfortable seated position with deep breathing for 2 minutes",
          "For Cat-Cow: On hands and knees, alternate between arching and rounding your back with breath",
          "For Child's Pose: Kneel with big toes touching, sit back on heels, extend arms forward with forehead on mat",
          "For Butterfly Pose: Sit with soles of feet together, knees dropped wide, hands holding feet",
          "For Legs Up The Wall: Lie on back with legs extended up wall, creating L-shape with body",
          "For Corpse Pose: Lie flat on back, arms slightly away from body, focus on deep belly breathing"
        ],
        targetedMuscles: ["Core", "Hip flexors", "Lower back", "Pelvic region"],
        healthBenefits: ["Stress reduction", "Improved circulation", "Hormonal regulation support", "Reduced inflammation"]
      }
    },
    {
      id: 'low-impact-cardio',
      title: 'Thyroid-Friendly Low Impact Cardio',
      description: 'Gentle cardio exercises that raise your heart rate without stressing your hormonal system.',
      level: 'Beginner',
      duration: '30 min',
      calories: 200,
      category: 'pcos-friendly',
      image: 'https://images.unsplash.com/photo-1486218119243-13883505764c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Brisk Walking', sets: 1, reps: '10 min' },
        { name: 'Gentle Side Steps', sets: 3, reps: '1 min each' },
        { name: 'Seated Leg Lifts', sets: 3, reps: '12 each leg' },
        { name: 'Arm Circles', sets: 3, reps: '30 sec each direction' },
        { name: 'Gentle Torso Twists', sets: 2, reps: '15 each side' },
      ],
      detailedInstructions: {
        steps: [
          "Start with gentle shoulder and neck rolls for 2 minutes",
          "For Brisk Walking: Walk at a pace where you can still hold a conversation",
          "For Gentle Side Steps: Step to right, bringing left foot to meet, then repeat to left",
          "For Seated Leg Lifts: Sit tall in chair, extend one leg until straight, lower slowly",
          "For Arm Circles: Stand with arms extended to sides, make small circles, gradually increasing size",
          "For Gentle Torso Twists: Sit or stand with feet hip-width apart, twist torso side to side with gentle control"
        ],
        targetedMuscles: ["Heart", "Legs", "Arms", "Core"],
        healthBenefits: ["Improved circulation", "Gentle metabolism support", "Stress reduction", "Energy improvement without hormonal stress"]
      }
    },
    
    // Fat Loss Routines
    {
      id: 'high-intensity-fat-burn',
      title: 'High Intensity Fat Burner',
      description: 'An intense workout designed to maximize calorie burn and target stubborn fat.',
      level: 'Intermediate',
      duration: '40 min',
      calories: 450,
      category: 'fat-loss',
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'High Knees', sets: 4, reps: '40 sec', duration: '20 sec rest' },
        { name: 'Burpees', sets: 4, reps: '30 sec', duration: '20 sec rest' },
        { name: 'Mountain Climbers', sets: 4, reps: '40 sec', duration: '20 sec rest' },
        { name: 'Jump Lunges', sets: 4, reps: '30 sec', duration: '20 sec rest' },
        { name: 'Bicycle Crunches', sets: 4, reps: '40 sec', duration: '20 sec rest' },
      ],
      detailedInstructions: {
        steps: [
          "Begin with 5 minutes of dynamic stretching and light cardio",
          "For High Knees: Run in place, lifting knees as high as possible toward chest",
          "For Burpees: From standing, drop to squat, kick feet back to plank, perform push-up, return to squat, jump up",
          "For Mountain Climbers: In plank position, rapidly alternate bringing knees toward chest",
          "For Jump Lunges: Lunge forward with right leg, jump and switch to left leg forward in midair",
          "For Bicycle Crunches: Lie on back, hands behind head, alternate bringing elbow to opposite knee"
        ],
        targetedMuscles: ["Full body", "Core", "Legs", "Glutes", "Cardiovascular system"],
        healthBenefits: ["Maximum calorie burn", "Improved cardiovascular fitness", "Boosted metabolism for hours after workout"]
      }
    },
    {
      id: 'metabolic-circuit',
      title: 'Metabolic Circuit Training',
      description: 'A strategic circuit workout that combines strength and cardio to optimize fat burning and metabolic rate.',
      level: 'Intermediate',
      duration: '45 min',
      calories: 400,
      category: 'fat-loss',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Kettlebell Swings', sets: 3, reps: '15 reps', duration: '30 sec rest' },
        { name: 'Push-ups', sets: 3, reps: '12 reps', duration: '30 sec rest' },
        { name: 'Dumbbell Rows', sets: 3, reps: '12 each side', duration: '30 sec rest' },
        { name: 'Bodyweight Squats', sets: 3, reps: '20 reps', duration: '30 sec rest' },
        { name: 'Plank to Push-up', sets: 3, reps: '10 reps', duration: '30 sec rest' },
      ],
      detailedInstructions: {
        steps: [
          "Warm up with 5 minutes of light cardio (jumping jacks, high knees, etc.)",
          "For Kettlebell Swings: With feet shoulder-width apart, hinge at hips, swing kettlebell between legs then up to shoulder height",
          "For Push-ups: In plank position, lower chest to floor by bending elbows, then push back up",
          "For Dumbbell Rows: Hinge forward holding dumbbell in one hand, pull weight toward hip, lower and repeat",
          "For Bodyweight Squats: With feet shoulder-width apart, lower hips until thighs are parallel to floor, then stand",
          "For Plank to Push-up: Start in forearm plank, then push up to hand plank one arm at a time, then lower back down"
        ],
        targetedMuscles: ["Total body", "Core", "Back", "Legs", "Chest"],
        healthBenefits: ["Increased metabolism", "Muscle preservation during fat loss", "Improved insulin sensitivity"]
      }
    },
    
    // Senior Citizen Workouts
    {
      id: 'senior-strength-mobility',
      title: 'Senior Strength & Mobility',
      description: 'Safe and effective exercises to maintain strength, balance, and mobility for older adults.',
      level: 'Beginner',
      duration: '25 min',
      calories: 150,
      category: 'senior-friendly',
      image: 'https://images.unsplash.com/photo-1530530824905-661c3ff2edde?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Seated Marching', sets: 2, reps: '30 sec' },
        { name: 'Neck Rotations', sets: 2, reps: '8 each side' },
        { name: 'Seated Arm Raises', sets: 2, reps: '10 reps' },
        { name: 'Resistance Band Pulls', sets: 2, reps: '12 reps' },
        { name: 'Ankle Circles', sets: 2, reps: '10 each foot' },
      ],
      detailedInstructions: {
        steps: [
          "Begin seated in a sturdy chair with feet flat on floor",
          "For Seated Marching: Sitting tall, alternate lifting knees toward ceiling",
          "For Neck Rotations: Slowly turn head to look over right shoulder, then left",
          "For Seated Arm Raises: With or without light weights, raise arms out to sides then overhead",
          "For Resistance Band Pulls: Hold band in front with both hands, pull apart to stretch band",
          "For Ankle Circles: Extend one leg, rotate ankle in circles clockwise then counterclockwise"
        ],
        targetedMuscles: ["Core", "Neck", "Shoulders", "Arms", "Ankles"],
        healthBenefits: ["Maintained mobility", "Improved circulation", "Better balance", "Reduced fall risk"]
      }
    },
    {
      id: 'chair-yoga-seniors',
      title: 'Chair Yoga for Seniors',
      description: 'Gentle yoga poses performed while seated or using a chair for support to improve flexibility and relaxation.',
      level: 'Beginner',
      duration: '20 min',
      calories: 100,
      category: 'senior-friendly',
      image: 'https://images.unsplash.com/photo-1616699002805-0741e1e4a9c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Seated Deep Breathing', sets: 1, reps: '2 min' },
        { name: 'Seated Side Bends', sets: 2, reps: '5 each side' },
        { name: 'Chair Forward Fold', sets: 2, reps: '30 sec hold' },
        { name: 'Seated Spinal Twist', sets: 2, reps: '5 each side' },
        { name: 'Seated Mountain Pose', sets: 1, reps: '1 min' },
      ],
      detailedInstructions: {
        steps: [
          "Sit tall in chair with feet flat on floor, hands resting on thighs",
          "For Seated Deep Breathing: Inhale deeply through nose, expanding belly, then exhale slowly through mouth",
          "For Seated Side Bends: Raise one arm overhead, gently lean to opposite side, then switch",
          "For Chair Forward Fold: Hinge at hips to fold forward, allowing arms to hang toward floor",
          "For Seated Spinal Twist: Sit tall, place right hand on left knee, left hand behind you, gently twist to left, then switch sides",
          "For Seated Mountain Pose: Sit tall with shoulders relaxed, arms at sides, focus on posture and breathing"
        ],
        targetedMuscles: ["Spine", "Core", "Shoulders", "Hips"],
        healthBenefits: ["Improved flexibility", "Stress reduction", "Better breathing capacity", "Reduced joint pain"]
      }
    },
    
    // Kids' Fitness
    {
      id: 'fun-kids-movement',
      title: 'Fun Movement Games for Kids',
      description: 'Playful exercises disguised as games to keep children active and excited about fitness.',
      level: 'Beginner',
      duration: '25 min',
      calories: 200,
      category: 'kids-fitness',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Animal Walks', sets: 3, reps: '30 sec each animal' },
        { name: 'Freeze Dance', sets: 1, reps: '5 min' },
        { name: 'Balloon Volleyball', sets: 1, reps: '5 min' },
        { name: 'Obstacle Course', sets: 3, reps: 'Complete course' },
        { name: 'Simon Says', sets: 1, reps: '5 min' },
      ],
      detailedInstructions: {
        steps: [
          "Start with a quick warm-up of jogging in place and arm circles",
          "For Animal Walks: Demonstrate and have kids move like different animals (bear crawl, crab walk, frog jumps, etc.)",
          "For Freeze Dance: Play music, have kids dance, when music stops they must freeze in position",
          "For Balloon Volleyball: Keep balloon in air using different body parts without letting it touch ground",
          "For Obstacle Course: Set up simple stations to crawl under, jump over, run around, etc.",
          "For Simon Says: Classic game with active movements (jump, spin, hop on one foot, etc.)"
        ],
        targetedMuscles: ["Full body", "Coordination", "Balance", "Agility"],
        healthBenefits: ["Fun introduction to fitness", "Improved coordination", "Development of motor skills", "Healthy activity habits"]
      }
    },
    {
      id: 'kids-yoga-adventure',
      title: 'Yoga Adventure for Kids',
      description: 'A storytelling yoga journey that introduces children to mindfulness and body awareness through playful poses.',
      level: 'Beginner',
      duration: '20 min',
      calories: 100,
      category: 'kids-fitness',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Mountain Pose', sets: 1, reps: '30 sec' },
        { name: 'Tree Pose', sets: 1, reps: '30 sec each leg' },
        { name: 'Downward Dog', sets: 1, reps: '30 sec' },
        { name: 'Cobra Pose', sets: 1, reps: '30 sec' },
        { name: 'Child\'s Pose', sets: 1, reps: '30 sec' },
      ],
      detailedInstructions: {
        steps: [
          "Begin in a circle, sitting cross-legged with good posture",
          "For Mountain Pose: Stand tall with feet together, arms at sides, then raise arms overhead like a mountain peak",
          "For Tree Pose: Stand on one leg, place other foot on inner thigh or calf (not on knee), hands in prayer or raised",
          "For Downward Dog: Form an inverted V-shape with hands and feet on floor, hips high",
          "For Cobra Pose: Lie on stomach, place hands under shoulders, lift chest while keeping hips down",
          "For Child's Pose: Kneel, sit back on heels, rest forehead on mat with arms extended or alongside body"
        ],
        targetedMuscles: ["Core", "Balance", "Flexibility", "Focus"],
        healthBenefits: ["Body awareness", "Flexibility", "Concentration skills", "Emotional regulation"]
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section with new motivational tagline */}
        <section className="bg-gradient-to-r from-health-light to-blue-50 dark:from-health-dark/30 dark:to-blue-900/30 py-12">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{translateText("workout_routines", language)}</h1>
              <p className="text-xl text-health-primary dark:text-health-accent font-semibold mb-4">
                {translateText("motivational_tagline", language)}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                {translateText("workout_description", language)}
              </p>
            </div>
          </div>
        </section>

        {/* Workouts Section */}
        <section className="py-12">
          <div className="container-custom">
            <Tabs defaultValue="weight-loss" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full max-w-4xl">
                  <TabsTrigger value="weight-loss" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span>{translateText("weight_loss", language)}</span>
                  </TabsTrigger>
                  <TabsTrigger value="muscle-gain" className="flex items-center gap-2">
                    <Dumbbell className="h-4 w-4" />
                    <span>{translateText("muscle_gain", language)}</span>
                  </TabsTrigger>
                  <TabsTrigger value="maintenance" className="flex items-center gap-2">
                    <Weight className="h-4 w-4" />
                    <span>{translateText("maintenance", language)}</span>
                  </TabsTrigger>
                  <TabsTrigger value="beginner-full-body" className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <span>{translateText("beginner_full_body", language)}</span>
                  </TabsTrigger>
                  <TabsTrigger value="pcos-friendly" className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-pink-500" />
                    <span>{translateText("pcos_friendly", language)}</span>
                  </TabsTrigger>
                  <TabsTrigger value="senior-kids" className="flex items-center gap-2 relative">
                    <Users className="h-4 w-4" />
                    <span className="hidden md:inline">{translateText("senior_friendly", language)}/{translateText("kids_fitness", language)}</span>
                    <span className="md:hidden">More</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Weight Loss Workouts Tab */}
              <TabsContent value="weight-loss" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {workouts
                    .filter(workout => workout.category === 'weight-loss')
                    .map(workout => (
                      <Card key={workout.id} className="health-card overflow-hidden">
                        <div className="relative h-48 w-full overflow-hidden">
                          <img 
                            src={workout.image} 
                            alt={workout.title} 
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-white dark:bg-gray-800 text-health-primary px-3 py-1 rounded-full text-xs font-medium">
                              {workout.level}
                            </span>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle>{workout.title}</CardTitle>
                          <CardDescription>{workout.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between mb-4">
                            <div className="flex items-center gap-1.5">
                              <Timer className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{workout.duration}</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              ~{workout.calories} calories
                            </div>
                          </div>

                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{translateText("exercises", language)}</h3>
                          <ul className="space-y-2">
                            {workout.exercises.slice(0, 3).map((exercise, index) => (
                              <li key={index} className="text-sm flex justify-between">
                                <span>{exercise.name}</span>
                                <span className="text-gray-500 dark:text-gray-400">
                                  {exercise.sets} {translateText("sets", language)} × {exercise.reps}
                                </span>
                              </li>
                            ))}
                            {workout.exercises.length > 3 && (
                              <li className="text-sm text-health-primary font-medium">
                                +{workout.exercises.length - 3} {translateText("more_exercises", language)}
                              </li>
                            )}
                          </ul>
                        </CardContent>
                        <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
                          <Button asChild className="w-full btn-primary flex items-center justify-center gap-2">
                            <Link to={`/exercise-details?id=${workout.id}`}>
                              <Play className="h-4 w-4" /> {translateText("start_workout", language)}
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Muscle Gain Workouts Tab */}
              <TabsContent value="muscle-gain" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {workouts
                    .filter(workout => workout.category === 'muscle-gain')
                    .map(workout => (
                      <Card key={workout.id} className="health-card overflow-hidden">
                        <div className="relative h-48 w-full overflow-hidden">
                          <img 
                            src={workout.image} 
                            alt={workout.title} 
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-white dark:bg-gray-800 text-health-primary px-3 py-1 rounded-full text-xs font-medium">
                              {workout.level}
                            </span>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle>{workout.title}</CardTitle>
                          <CardDescription>{workout.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between mb-4">
                            <div className="flex items-center gap-1.5">
                              <Timer className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{workout.duration}</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              ~{workout.calories} calories
                            </div>
                          </div>

                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{translateText("exercises", language)}</h3>
                          <ul className="space-y-2">
                            {workout.exercises.slice(0, 3).map((exercise, index) => (
                              <li key={index} className="text-sm flex justify-between">
                                <span>{exercise.name}</span>
                                <span className="text-gray-500 dark:text-gray-400">
                                  {exercise.sets} {translateText("sets", language)} × {exercise.reps}
                                </span>
                              </li>
                            ))}
                            {workout.exercises.length > 3 && (
                              <li className="text-sm text-health-primary font-medium">
                                +{workout.exercises.length - 3} {translateText("more_exercises", language)}
                              </li>
                            )}
                          </ul>
                        </CardContent>
                        <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
                          <Button asChild className="w-full btn-primary flex items-center justify-center gap-2">
                            <Link to={`/exercise-details?id=${workout.id}`}>
                              <Play className="h-4 w-4" /> {translateText("start_workout", language)}
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Maintenance Workouts Tab */}
              <TabsContent value="maintenance" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {workouts
                    .filter(workout => workout.category === 'maintenance')
                    .map(workout => (
                      <Card key={workout.id} className="health-card overflow-hidden">
                        <div className="relative h-48 w-full overflow-hidden">
                          <img 
                            src={workout.image} 
                            alt={workout.title} 
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-white dark:bg-gray-800 text-health-primary px-3 py-1 rounded-full text-xs font-medium">
                              {workout.level}
                            </span>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle>{workout.title}</CardTitle>
                          <CardDescription>{workout.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between mb-4">
                            <div className="flex items-center gap-1.5">
                              <Timer className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{workout.duration}</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              ~{workout.calories} calories
                            </div>
                          </div>

                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{translateText("exercises", language)}</h3>
                          <ul className="space-y-2">
                            {workout.exercises.slice(0, 3).map((exercise, index) => (
                              <li key={index} className="text-sm flex justify-between">
                                <span>{exercise.name}</span>
                                <span className="text-gray-500 dark:text-gray-400">
                                  {exercise.sets} {translateText("sets", language)} × {exercise.reps}
                                </span>
                              </li>
                            ))}
                            {workout.exercises.length > 3 && (
                              <li className="text-sm text-health-primary font-medium">
                                +{workout.exercises.length - 3} {translateText("more_exercises", language)}
                              </li>
                            )}
                          </ul>
                        </CardContent>
                        <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
                          <Button asChild className="w-full btn-primary flex items-center justify-center gap-2">
                            <Link to={`/exercise-details?id=${workout.id}`}>
                              <Play className="h-4 w-4" /> {translateText("start_workout", language)}
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Beginner Full Body Workouts Tab */}
              <TabsContent value="beginner-full-body" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {workouts
                    .filter(workout => workout.category === 'beginner-full-body')
                    .map(workout => (
                      <Card key={workout.id} className="health-card overflow-hidden">
                        <div className="relative h-48 w-full overflow-hidden">
                          <img 
                            src={workout.image} 
                            alt={workout.title} 
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-white dark:bg-gray-800 text-health-primary px-3 py-1 rounded-full text-xs font-medium">
                              {workout.level}
                            </span>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle>{workout.title}</CardTitle>
                          <CardDescription>{workout.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between mb-4">
                            <div className="flex items-center gap-1.5">
                              <Timer className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{workout.duration}</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              ~{workout.calories} calories
                            </div>
                          </div>

                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{translateText("exercises", language)}</h3>
                          <ul className="space-y-2">
                            {workout.exercises.slice(0, 3).map((exercise, index) => (
                              <li key={index} className="text-sm flex justify-between">
                                <span>{exercise.name}</span>
                                <span className="text-gray-500 dark:text-gray-400">
                                  {exercise.sets} {translateText("sets", language)} × {exercise.reps}
                                </span>
                              </li>
                            ))}
                            {workout.exercises.length > 3 && (
                              <li className="text-sm text-health-primary font-medium">
                                +{workout.exercises.length - 3} {translateText("more_exercises", language)}
                              </li>
                            )}
                          </ul>
                        </CardContent>
                        <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
                          <Button asChild className="w-full btn-primary flex items-center justify-center gap-2">
                            <Link to={`/exercise-details?id=${workout.id}`}>
                              <Play className="h-4 w-4" /> {translateText("start_workout", language)}
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* PCOS & Thyroid-Friendly Workouts Tab */}
              <TabsContent value="pcos-friendly" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {workouts
                    .filter(workout => workout.category === 'pcos-friendly')
                    .map(workout => (
                      <Card key={workout.id} className="health-card overflow-hidden">
                        <div className="relative h-48 w-full overflow-hidden">
                          <img 
                            src={workout.image} 
                            alt={workout.title} 
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-white dark:bg-gray-800 text-health-primary px-3 py-1 rounded-full text-xs font-medium">
                              {workout.level}
                            </span>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle>{workout.title}</CardTitle>
                          <CardDescription>{workout.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between mb-4">
                            <div className="flex items-center gap-1.5">
                              <Timer className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{workout.duration}</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              ~{workout.calories} calories
                            </div>
                          </div>

                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{translateText("exercises", language)}</h3>
                          <ul className="space-y-2">
                            {workout.exercises.slice(0, 3).map((exercise, index) => (
                              <li key={index} className="text-sm flex justify-between">
                                <span>{exercise.name}</span>
                                <span className="text-gray-500 dark:text-gray-400">
                                  {exercise.sets} {translateText("sets", language)} × {exercise.reps}
                                </span>
                              </li>
                            ))}
                            {workout.exercises.length > 3 && (
                              <li className="text-sm text-health-primary font-medium">
                                +{workout.exercises.length - 3} {translateText("more_exercises", language)}
                              </li>
                            )}
                          </ul>
                        </CardContent>
                        <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
                          <Button asChild className="w-full btn-primary flex items-center justify-center gap-2">
                            <Link to={`/exercise-details?id=${workout.id}`}>
                              <Play className="h-4 w-4" /> {translateText("start_workout", language)}
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Seniors and Kids Tab (Combined) */}
              <TabsContent value="senior-kids" className="animate-fade-in">
                <Tabs defaultValue="senior">
                  <TabsList className="mb-4">
                    <TabsTrigger value="senior">{translateText("senior_friendly", language)}</TabsTrigger>
                    <TabsTrigger value="kids">{translateText("kids_fitness", language)}</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="senior">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {workouts
                        .filter(workout => workout.category === 'senior-friendly')
                        .map(workout => (
                          <Card key={workout.id} className="health-card overflow-hidden">
                            <div className="relative h-48 w-full overflow-hidden">
                              <img 
                                src={workout.image} 
                                alt={workout.title} 
                                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                              />
                              <div className="absolute top-4 left-4">
                                <span className="bg-white dark:bg-gray-800 text-health-primary px-3 py-1 rounded-full text-xs font-medium">
                                  {workout.level}
                                </span>
                              </div>
                            </div>
                            <CardHeader>
                              <CardTitle>{workout.title}</CardTitle>
                              <CardDescription>{workout.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between mb-4">
                                <div className="flex items-center gap-1.5">
                                  <Timer className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">{workout.duration}</span>
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  ~{workout.calories} calories
                                </div>
                              </div>

                              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{translateText("exercises", language)}</h3>
                              <ul className="space-y-2">
                                {workout.exercises.slice(0, 3).map((exercise, index) => (
                                  <li key={index} className="text-sm flex justify-between">
                                    <span>{exercise.name}</span>
                                    <span className="text-gray-500 dark:text-gray-400">
                                      {exercise.sets} {translateText("sets", language)} × {exercise.reps}
                                    </span>
                                  </li>
                                ))}
                                {workout.exercises.length > 3 && (
                                  <li className="text-sm text-health-primary font-medium">
                                    +{workout.exercises.length - 3} {translateText("more_exercises", language)}
                                  </li>
                                )}
                              </ul>
                            </CardContent>
                            <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
                              <Button asChild className="w-full btn-primary flex items-center justify-center gap-2">
                                <Link to={`/exercise-details?id=${workout.id}`}>
                                  <Play className="h-4 w-4" /> {translateText("start_workout", language)}
                                </Link>
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="kids">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {workouts
                        .filter(workout => workout.category === 'kids-fitness')
                        .map(workout => (
                          <Card key={workout.id} className="health-card overflow-hidden">
                            <div className="relative h-48 w-full overflow-hidden">
                              <img 
                                src={workout.image} 
                                alt={workout.title} 
                                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                              />
                              <div className="absolute top-4 left-4">
                                <span className="bg-white dark:bg-gray-800 text-health-primary px-3 py-1 rounded-full text-xs font-medium">
                                  {workout.level}
                                </span>
                              </div>
                            </div>
                            <CardHeader>
                              <CardTitle>{workout.title}</CardTitle>
                              <CardDescription>{workout.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between mb-4">
                                <div className="flex items-center gap-1.5">
                                  <Timer className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">{workout.duration}</span>
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  ~{workout.calories} calories
                                </div>
                              </div>

                              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{translateText("exercises", language)}</h3>
                              <ul className="space-y-2">
                                {workout.exercises.slice(0, 3).map((exercise, index) => (
                                  <li key={index} className="text-sm flex justify-between">
                                    <span>{exercise.name}</span>
                                    <span className="text-gray-500 dark:text-gray-400">
                                      {exercise.sets} {translateText("sets", language)} × {exercise.reps}
                                    </span>
                                  </li>
                                ))}
                                {workout.exercises.length > 3 && (
                                  <li className="text-sm text-health-primary font-medium">
                                    +{workout.exercises.length - 3} {translateText("more_exercises", language)}
                                  </li>
                                )}
                              </ul>
                            </CardContent>
                            <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
                              <Button asChild className="w-full btn-primary flex items-center justify-center gap-2">
                                <Link to={`/exercise-details?id=${workout.id}`}>
                                  <Play className="h-4 w-4" /> {translateText("start_workout", language)}
                                </Link>
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Fat Loss Tab */}
        <TabsContent value="fat-loss" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workouts
              .filter(workout => workout.category === 'fat-loss')
              .map(workout => (
                <Card key={workout.id} className="health-card overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={workout.image} 
                      alt={workout.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white dark:bg-gray-800 text-health-primary px-3 py-1 rounded-full text-xs font-medium">
                        {workout.level}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{workout.title}</CardTitle>
                    <CardDescription>{workout.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-4">
                      <div className="flex items-center gap-1.5">
                        <Timer className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{workout.duration}</span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        ~{workout.calories} calories
                      </div>
                    </div>

                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{translateText("exercises", language)}</h3>
                    <ul className="space-y-2">
                      {workout.exercises.slice(0, 3).map((exercise, index) => (
                        <li key={index} className="text-sm flex justify-between">
                          <span>{exercise.name}</span>
                          <span className="text-gray-500 dark:text-gray-400">
                            {exercise.sets} {translateText("sets", language)} × {exercise.reps}
                          </span>
                        </li>
                      ))}
                      {workout.exercises.length > 3 && (
                        <li className="text-sm text-health-primary font-medium">
                          +{workout.exercises.length - 3} {translateText("more_exercises", language)}
                        </li>
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
                    <Button asChild className="w-full btn-primary flex items-center justify-center gap-2">
                      <Link to={`/exercise-details?id=${workout.id}`}>
                        <Play className="h-4 w-4" /> {translateText("start_workout", language)}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-health-primary to-health-accent text-white py-16">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{translateText("personalized_workout_plan", language)}</h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                {translateText("custom_workout_routine", language)}
              </p>
              <Button className="bg-white text-health-primary hover:bg-gray-100 hover:text-health-dark" size="lg" asChild>
                <Link to="/bmi-calculator">
                  {translateText("check_bmi_first", language)} <ArrowRight className="ml-2 h-4 w-4" />
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

export default Workouts;


import React from 'react';
import { BlogPostProps } from '@/components/blog/BlogPost';

export const blogPosts: BlogPostProps[] = [
  {
    id: "fruit-sugar-guide",
    title: "How Much Sugar Are You Really Eating in These Fruits?",
    excerpt: "Fruits are nature's candy—but that doesn't mean they're sugar-free! Learn how to enjoy fruits without spiking your blood sugar levels.",
    date: "May 3, 2025",
    category: "Nutrition",
    readTime: "5 min",
    isPremium: true,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2153&q=80",
    content: (
      <>
        <h2>Why Monitor Fruit Sugar Intake?</h2>
        <p>
          Fruits are an essential part of a balanced diet, providing vitamins, minerals, and fiber. 
          However, they also contain natural sugars that can impact your blood glucose levels, 
          especially if you have diabetes or are watching your weight.
        </p>
        
        <h2>Sugar Content in Common Indian Fruits</h2>
        
        <h3>Mango</h3>
        <ul>
          <li><strong>Sugar content:</strong> 14g per 100g</li>
          <li><strong>Ideal serving for diabetics:</strong> 50g (½ small mango)</li>
          <li><strong>Smart pairing:</strong> Mix with chia seeds for added fiber</li>
        </ul>
        
        <h3>Apple</h3>
        <ul>
          <li><strong>Sugar content:</strong> 10g per 100g</li>
          <li><strong>Ideal serving for diabetics:</strong> 100g (1 small apple)</li>
          <li><strong>Smart pairing:</strong> Eat with skin for added fiber; sprinkle cinnamon to help regulate blood sugar</li>
        </ul>
        
        <h3>Grapes</h3>
        <ul>
          <li><strong>Sugar content:</strong> 16g per 100g</li>
          <li><strong>Ideal serving for diabetics:</strong> 75g (approximately 15-17 grapes)</li>
          <li><strong>Smart pairing:</strong> Combine with a handful of nuts</li>
        </ul>
        
        <h3>Pineapple</h3>
        <ul>
          <li><strong>Sugar content:</strong> 10g per 100g</li>
          <li><strong>Ideal serving for diabetics:</strong> 80g (½ cup chunks)</li>
          <li><strong>Smart pairing:</strong> Add to plain yogurt</li>
        </ul>
        
        <h3>Banana</h3>
        <ul>
          <li><strong>Sugar content:</strong> 12g per 100g</li>
          <li><strong>Ideal serving for diabetics:</strong> 60g (1 small banana)</li>
          <li><strong>Smart pairing:</strong> Spread with peanut or almond butter</li>
        </ul>
        
        <h2>Tips for Enjoying Fruits Without Sugar Spikes</h2>
        <ol>
          <li>Always pair fruits with a protein or healthy fat source</li>
          <li>Eat whole fruits instead of drinking fruit juices</li>
          <li>Distribute fruit servings throughout the day</li>
          <li>Monitor your blood glucose response to different fruits</li>
          <li>Consider the glycemic index when selecting fruits</li>
        </ol>
        
        <h2>The Importance of Portion Control</h2>
        <p>
          While whole fruits are healthy and provide essential nutrients, portion control is key, 
          especially for those with diabetes or insulin resistance. The fiber in whole fruits 
          helps slow down sugar absorption, but excessive consumption can still lead to blood sugar spikes.
        </p>
        
        <h2>Take Control of Your Health</h2>
        <p>
          Understanding how different fruits affect your blood sugar is an important step toward better health. 
          Consider regular blood sugar monitoring to see how your body responds to different fruits and portion sizes.
        </p>
        <p>
          <strong>Remember:</strong> Individual responses to fruit sugars can vary. Always consult with your healthcare 
          provider for personalized advice on managing blood sugar levels.
        </p>
      </>
    )
  },
  {
    id: "protein-fruit-pairing",
    title: "How to Pair Fruits with Proteins to Avoid Sugar Spikes",
    excerpt: "Learn the best combinations of fruits and proteins to keep your blood sugar stable and your energy levels high throughout the day.",
    date: "May 1, 2025",
    category: "Nutrition",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    content: (
      <>
        <p>Pairing fruits with proteins is a smart strategy...</p>
      </>
    )
  },
  {
    id: "exercise-blood-sugar",
    title: "Best Exercises to Stabilize Blood Sugar After Meals",
    excerpt: "Discover simple exercises you can do right after eating to help maintain healthy blood sugar levels and improve insulin sensitivity.",
    date: "April 28, 2025",
    category: "Fitness",
    readTime: "6 min",
    isPremium: true,
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    content: (
      <>
        <p>Post-meal exercise can significantly impact blood sugar levels...</p>
      </>
    )
  },
  {
    id: "indian-breakfast-diabetics",
    title: "Top 5 Indian Breakfast Options for Diabetics",
    excerpt: "Start your day right with these diabetes-friendly traditional Indian breakfast ideas that are both delicious and blood sugar friendly.",
    date: "April 25, 2025",
    category: "Diabetes",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979350?ixlib=rb-4.0.3&auto=format&fit=crop&w=1970&q=80",
    content: (
      <>
        <p>Finding the right breakfast options when you have diabetes can be challenging...</p>
      </>
    )
  }
];

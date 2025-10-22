import { HoverEffect } from "./ui/card-hover-effect";

export default function MidSec() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Know What’s Behind Your Symptoms",
    description:
      "Enter your symptoms and let our AI model predict potential diseases with up to 95% accuracy. Built using medical datasets and machine learning, it’s fast, reliable, and easy to use.",
    link: "https://stripe.com",
  },
  {
    title: "Covers 45+ Diseases",
    description:
      "From common cold to chronic conditions, our model can predict over 45 different diseases based on 73 input symptoms — helping you understand your health better than ever before.",
    link: "https://netflix.com",
  },
  {
    title: "Find the Right Treatment Instantly",
    description:
      "Along with prediction, get medically suggested cures and remedies to start managing your condition immediately. It’s like having a pocket doctor for quick guidance.",
    link: "https://google.com",
  },
  {
    title: "95% Prediction Accuracy",
    description:
      "Trained on verified medical data, our model achieves 95% accuracy, ensuring that your health predictions are trustworthy and consistent every time.",
    link: "https://meta.com",
  },
  {
    title: "Simple. Fast. Intuitive.",
    description:
      "Just select your symptoms, click “Predict,” and get your disease insights in seconds — no medical knowledge needed!",
    link: "https://amazon.com",
  },
  {
    title: "Your Data Stays Safe. Our Model Keeps Learning.",
    description:
      "All your health data is processed privately and securely. Plus, our AI continuously learns from new medical information, making predictions more accurate over time — while keeping your privacy protected.",
    link: "https://microsoft.com",
  },
];

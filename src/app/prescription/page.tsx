"use client";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Prediction } from "../components/interface";

export default function ResultsPage() {
    const searchParams = useSearchParams();
    const predictionsParam = searchParams.get("predictions");
    const symptomsParam = searchParams.get("symptoms");
    const predictions: Prediction[] = predictionsParam ? JSON.parse(predictionsParam) : [];
    const symptoms: string[] = symptomsParam ? JSON.parse(symptomsParam) : [];

    const disease = predictions.map((p) => p.disease)
    const create_prescription = async () => {
        const response = await axios.post('/api/prescription', {
            symptoms: symptoms,
            disease: disease
        })
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-500/40 to-black text-white p-6">
            <div className="mb-5 mt-5">
                <h1 className="text-3xl font-semibold mb-6">Top Predicted Diseases</h1>

                {predictions.length > 0 ? (
                    <div className="bg-white/10 p-6 rounded-2xl w-full md:w-1/3 shadow-lg border border-white/10">
                        {predictions.map((p: any, i: number) => (
                            <div key={i} className="flex justify-between py-2 border-b border-white/20">
                                <span>{p.disease}</span>
                                <span>{p.probability}%</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No predictions found. Please try again.</p>
                )}
            </div>
            <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl mt-4 transition"
            >CURE</button>
            <div></div>
            <button
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl mt-4 transition disabled:opacity-50"
                onClick={create_prescription}>Create Prescription</button>
        </div>
    );
}

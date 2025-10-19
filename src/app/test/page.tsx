"use client"

import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation";

interface PredictionResponse {
    success: boolean;
    predictions: { disease: string; probability: number }[];
    message?: string;
}

export default function Test() {
    const router = useRouter()
    const [blockno, setBlockNum] = useState(0)
    const category = [
        null, ['breathlessness', 'cough', 'chest_pain', 'continuous_sneezing', 'patches_in_throat', 'high_fever', 'cold_hands_and_feets', 'shivering'],
        ['altered_sensorium', 'anxiety', 'dizziness', 'headache', 'loss_of_balance', 'mood_swings', 'restlessness', 'lethargy', 'fatigue', 'spinning_movements', 'weakness_of_one_body_side'],
        ['acidity', 'indigestion', 'nausea', 'vomiting', 'stomach_pain', 'diarrhoea', 'constipation', 'pain_during_bowel_movements', 'pain_in_anal_region', 'dark_urine', 'dehydration', 'loss_of_appetite', 'swelling_of_stomach'],
        ['back_pain', 'hip_joint_pain', 'joint_pain', 'knee_pain', 'muscle_wasting', 'muscle_weakness', 'movement_stiffness', 'stiff_neck', 'weakness_in_limbs', 'swelling_joints', 'cramps'],
        ['blackheads', 'blister', 'bruising', 'dischromic _patches', 'nodal_skin_eruptions', 'pus_filled_pimples', 'red_sore_around_nose', 'scurring', 'silver_like_dusting', 'skin_peeling', 'skin_rash', 'itching'],
        ['bladder_discomfort', 'burning_micturition', 'continuous_feel_of_urine', 'foul_smell_of urine', 'extra_marital_contacts'],
        ['blurred_and_distorted_vision', 'watering_from_eyes', 'sunken_eyes'],
        ['weight_gain', 'weight_loss', 'yellowish_skin', 'obesity', 'ulcers_on_tongue', 'sweating', 'weakness_in_limbs']
    ]

    const [loading, setLoading] = useState(false)
    const [selectedSymptom, setSelectedSymptoms] = useState<String[]>([])
    const symptomSubmit = async () => {
        try {
            setLoading(true)
            const { data } = await axios.post<PredictionResponse>("/api/diseaseModel", {
                symptoms: selectedSymptom,
            })
            console.log("Backend response:", data)

            if (data.success) {
                setLoading(false)
                router.push(
                    `/prescription?predictions=${encodeURIComponent(JSON.stringify(data.predictions))}`
                )
                console.log("Predictions set:", data.predictions)
            } else {
                console.warn("Backend returned failure:", data)
            }
        } catch (error) {
            toast.error("Error while sending symptoms from front")
            setLoading(false)
            console.error("Error while sending symptoms from front", error)
        } finally {
            setLoading(false)
            setSelectedSymptoms([])
        }
    }
    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen w-screen bg-gradient-to-b from-purple-500/40 to-black">
            <div className={`absolute bg-black/30 inset-0 z-50 backdrop-blur-md space-x-1 ${blockno === 0 && `hidden`}`}>
                <div className={`fixed top-10 left-10 text-2xl px-3 py-2 rounded-full bg-white/10 hover:cursor-pointer`}
                    onClick={() => setBlockNum(0)}
                >
                    ←
                </div>
                <div className="mx-auto my-10 grid grid-cols-1 gap-4 w-1/2 md:w-1/3 overflow-y-auto p-4 rounded-2xl bg-white/10 shadow-lg border border-white/10">
                    {
                        category[blockno]?.map((symptom, idx) => (
                            <label
                                key={idx}
                                className="flex items-center gap-3 bg-white/10 hover:bg-purple-500/30 cursor-pointer px-4 py-2 rounded-xl text-white transition-all duration-200"
                            >
                                <input
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedSymptoms((prev) => [...prev, e.target.value]);
                                        } else {
                                            setSelectedSymptoms((prev) =>
                                                prev.filter((s) => s !== e.target.value)
                                            );
                                        }
                                    }}
                                    type="checkbox"
                                    value={symptom}
                                    checked={selectedSymptom.includes(symptom)}
                                    className="accent-purple-500 w-5 h-5 hover:cursor-pointer"
                                />
                                <span>{symptom}</span>
                            </label>
                        ))
                    }
                </div>
            </div>
            <p className="mt-25 mb-2 font-serif text-2xl tracking-widest">SELECT YOUR SYMPTOMS</p>
            <button
                onClick={symptomSubmit}
                className="mb-5 px-6 py-3 bg-gradient-to-b from-purple-900/50 to-purple-950/50 
                 rounded-xl hover:-translate-y-1 font-serif tracking-widest text-white 
                 shadow-md hover:shadow-lg transition-all duration-300">SUBMIT</button>
            {
                loading && <div className="flex space-x-4">
                    <div className="mb-5 h-8 w-8 border-4 border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-bold text-xl">Loading</p>
                </div>
            }
            <div className="rounded-lg px-5 py-5 bg-black/30 grid grid-cols-2 gap-3">
                <div
                    onClick={() => setBlockNum(1)}
                    className="text-center rounded-xl px-5 py-10 bg-white/10 hover:bg-purple-500/30 transition-all duration-300 cursor-pointer">
                    <div className="text-3xl">🫁</div>
                    <div className="text-xl">Respiratory</div>
                </div>

                <div
                    onClick={() => setBlockNum(2)}
                    className="text-center rounded-xl px-5 py-10 bg-white/10 hover:bg-purple-500/30 transition-all duration-300 cursor-pointer">
                    <div className="text-3xl">🧠</div>
                    <div className="text-xl">Neurological / Mental</div>
                </div>

                <div
                    onClick={() => setBlockNum(3)}
                    className="text-center rounded-xl px-5 py-10 bg-white/10 hover:bg-purple-500/30 transition-all duration-300 cursor-pointer">
                    <div className="text-3xl">🍽️</div>
                    <div className="text-xl">Digestive</div>
                </div>

                <div
                    onClick={() => setBlockNum(4)}
                    className="text-center rounded-xl px-5 py-10 bg-white/10 hover:bg-purple-500/30 transition-all duration-300 cursor-pointer">
                    <div className="text-3xl">🦴</div>
                    <div className="text-xl">Musculoskeletal</div>
                </div>

                <div
                    onClick={() => setBlockNum(5)}
                    className="text-center rounded-xl px-5 py-10 bg-white/10 hover:bg-purple-500/30 transition-all duration-300 cursor-pointer">
                    <div className="text-3xl">🧴</div>
                    <div className="text-xl">Skin / External</div>
                </div>

                <div
                    onClick={() => setBlockNum(6)}
                    className="text-center rounded-xl px-5 py-10 bg-white/10 hover:bg-purple-500/30 transition-all duration-300 cursor-pointer">
                    <div className="text-3xl">💧</div>
                    <div className="text-xl">Urinary / Reproductive</div>
                </div>

                <div
                    onClick={() => setBlockNum(7)}
                    className="text-center rounded-xl px-5 py-10 bg-white/10 hover:bg-purple-500/30 transition-all duration-300 cursor-pointer">
                    <div className="text-3xl">👁️</div>
                    <div className="text-xl">Sensory / Vision</div>
                </div>

                <div
                    onClick={() => setBlockNum(8)}
                    className="text-center rounded-xl px-5 py-10 bg-white/10 hover:bg-purple-500/30 transition-all duration-300 cursor-pointer">
                    <div className="text-3xl">🧍</div>
                    <div className="text-xl">General / Metabolic</div>
                </div>
            </div>
            <Toaster position="bottom-right" />
        </div>
    )
}

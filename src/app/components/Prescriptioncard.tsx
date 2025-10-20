import { Prescription } from "./interface"

export default function PrescriptionCard({ p }: { p: Prescription }) {
    return (
        <div className="bg-white/10 text-white p-4 rounded-xl border border-white/20">
            <p><strong>Name:</strong> {p.name}</p>
            <p><strong>Age:</strong> {p.age}</p>
            <p><strong>Gender:</strong> {p.gender}</p>
            <p><strong>Symptoms:</strong> {p.symptoms.join(', ')}</p>
            <p><strong>Diseases:</strong> {p.disease.join(', ')}</p>
            <p><strong>Cure:</strong> {p.cure}</p>
        </div>
    )
}
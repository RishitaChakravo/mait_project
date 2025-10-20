import PrescriptionCard from "../components/Prescriptioncard";

export default function Test() {
    const samplePrescription = {
        _id: "123456",
        name: "Rishita",
        age : 19,
        gender: "F",
        symptoms: ["Headache", "Nausea"],
        disease: ["Migraine"],
        cure: "Ibuprofen 200mg",
        createdAt: new Date(),
    };
    return (
        <div className="border w-[70%] mx-auto mt-10 min-h-[500] flex flex-wrap">
            <PrescriptionCard p={samplePrescription}/>
            <PrescriptionCard p={samplePrescription}/>
        </div>
    )
}
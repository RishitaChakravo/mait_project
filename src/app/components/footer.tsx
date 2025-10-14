export default function Footer(){
    return(
        <div className="flex justify-evenly py-4 px-4 bg-black-900 space-x-2">
            <div className="space-y-2">
                <p className="text-center">CONTACT US</p>
                <div className="border-2 border-amber-300 rounded-xl"></div>
                <div>
                    <p>Rishita - +91 XXXXXXXXXX</p>
                    <p>Lavanya - +91 XXXXXXXXXX</p>
                </div>
            </div>
            <div className="space-y-2">
                <p className="text-center">MISSION</p>
                <div className="border-2 border-amber-300 rounded-xl"></div>
                <p>Helping others is our only motive</p>
            </div>
        </div>
    )
}
export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-purple-900 via-purple-950 to-black text-gray-200 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-extrabold text-purple-400 drop-shadow-md">MedWin</h2>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed">
            Empowering health through AI — predict diseases, discover cures, and take control of your well-being with confidence.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold text-purple-300">Contact Us</h3>
          <div className="w-16 h-1 bg-purple-500 rounded-full my-2 mx-auto md:mx-0"></div>
          <p className="text-sm">📞 Rishita — +91 XXXXXXXXXX</p>
          <p className="text-sm">📞 Lavanya — +91 XXXXXXXXXX</p>
          <p className="text-sm mt-2">📧 support@medwin.ai</p>
        </div>

        {/* Mission Section */}
        <div>
          <h3 className="text-lg font-semibold text-purple-300">Our Mission</h3>
          <div className="w-16 h-1 bg-purple-500 rounded-full my-2 mx-auto md:mx-0"></div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Helping people stay informed and healthy through the power of AI and innovation.  
            Your health, our priority.
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-800 mt-10 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} <span className="text-purple-400 font-semibold">MedWin</span>. All rights reserved.
      </div>
    </footer>
  );
}

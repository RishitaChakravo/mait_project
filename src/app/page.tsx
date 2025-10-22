import Footer from "./components/footer";
import { HeroSec } from "./components/HeroSec";
import MidSec from "./components/Midsec";
import NavBar from "./components/NavBar";

export default function Home() {
  return (<div className="relative">
    <NavBar/>
    <HeroSec/>
    <MidSec/>
    <Footer/>
  </div>);
}

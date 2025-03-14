import Hero from "@/components/mainpage/mainhero/hero";
import LogoTicker from "@/components/mainpage/mainlogoticker/logoticker";
import { ProductShowcase } from "@/components/mainpage/mainshowcase/productshowcase";
import Exhibitpro from "@/components/mainpage/mainexhibit/exhibitpro";
import Testimonials from "@/components/mainpage/maintestimonial/testimonial";
import { CallToAction } from "@/components/mainpage/maincalltoaction/calltoaction";



export default function Home() {
  return (
    <>
      <Hero/>  
      <LogoTicker/>  
      <ProductShowcase/>
      <Exhibitpro/>
      <Testimonials/>
      <CallToAction/>
    </>
  );
}

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { LogoCloud } from '@/components/sections/LogoCloud';
import { Manifesto } from '@/components/sections/Manifesto';
import { Workflow } from '@/components/sections/Workflow';
import { Features } from '@/components/sections/Features';
import { Stats } from '@/components/sections/Stats';
import { Pricing } from '@/components/sections/Pricing';
import { FAQ } from '@/components/sections/FAQ';
import { Newsletter } from '@/components/sections/Newsletter';
import { siteConfig } from '@/lib/content';
import { baseNodes, webPage, graph } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

export default function Home() {
   const data = graph([
    ...baseNodes(true),
    webPage({
      path: "/",
      name: "ArboWeb | Web development and SEO for Swedish businesses", // match your real <title>
      description: siteConfig.description, // match your meta description
      lang: "en",
    }),
  ]);

  return (
    <>
      <JsonLd data={data} />
      <Navbar />
      <main>
        <Hero />
        <LogoCloud />
        <Manifesto />
        <Workflow />
        <Features />
        <Stats />
        <Pricing />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

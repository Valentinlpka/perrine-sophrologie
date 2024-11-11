'use client'
import bureau from "@/assets/images/bureau-1.jpg"; // Ajustez le chemin si nécessaire
import bureau1 from "@/assets/images/bureau-2.jpg"; // Ajustez le chemin si nécessaire
import logo from "@/assets/images/photo.png"; // Ajustez le chemin si nécessaire
import { motion } from 'framer-motion'; // Importez motion de framer-motion
import { ChevronDown } from "lucide-react";
import React from 'react';


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Contact from "@/components/ui/contact";
import SeanceTypesTable from "@/components/ui/tableau";
import Image from "next/image";

interface ScrollButtonProps {
  targetId: string;
  children: React.ReactNode;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ targetId, children }) => {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="my-5 w-64 h-10 bg-gradient-to-bl from-orange1 to-orange2 font-medium text-white flex items-center justify-center gap-2 rounded-md hover:opacity-90 transition-opacity"
    >
      {children}
      <ChevronDown size={20} />
    </button>
  );
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);


export default function Home() {
  return (
    <div className="bg-white">
      <AnimatedSection>
        <div className="bg-orange-50 flex px-10 py-10  justify-center justify-items-center flex-col gap-10 lg:flex-row">
          <div className="flex basis-1/3 justify-center align-center items-center justify-items-center flex-wrap">
            <Image
              src={logo}
              alt="Logo"
              width={200}
              height={40}
              className="mr-2"
            />
          </div>

          <div className="basis-2/3 flex flex-col gap-2">
            <h2 className="text-transparent inline-block bg-gradient-to-br from-orange1  from-1%  to-orange2 to-90% text-5xl bg-clip-text font-bold">
              Bienvenue !{" "}
            </h2>
            <h2 className="text-xl py-2">
              Je suis Perrine Dupriez, Sophrologue à{" "}
              <span className="font-medium">Denain</span>
            </h2>
            <div className="w-10/12 gap-2 flex-col flex">
              <p className="font-light">
                Passionnée par le bien-être et le développement personnel, j’ai
                suivi ma formation chez Aliotta Formations, une référence en
                sophrologie. Mon désir profond d’aider les autres m’a
                naturellement conduite vers cette voie.
              </p>
              <p className="font-light">
                Je vous accueille chaleureusement au 556 rue Arthur Brunet, 59220
                Denain, dans un espace dédié à la relaxation et à l’harmonie
                intérieure.
              </p>
              <p className="font-light">
                De plus, je fais également des séances à distance par
                visioconférence.
              </p>
              <ScrollButton targetId="services">
                Découvrir les services
              </ScrollButton>
            </div>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection>

        <div className="bg-kaki">
          <div className="mx-auto container px-10 py-10">
            <h3 className="text-white text-2xl pb-5 font-bold">
              La sophrologie c'est quoi ?
            </h3>
            <Accordion
              type="single"
              collapsible
              className="w-full  flex flex-col gap-3 "
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Qu'est ce que la sophrologie ?
                </AccordionTrigger>
                <AccordionContent>
                  La sophrologie est une méthode de relaxation utilisant la
                  respiration, la relaxation musculaire et la visualisation
                  positive pour améliorer le bien-être physique et mental.{" "}
                  <br></br> <br></br> C’est une pratique non tactile et encadré
                  par un code de déontologie par la Chambre Syndicale de la
                  ophrologie.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Comment se passe une séance ?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-3 w-10/12">
                  <p>
                    Avant de passer par une séance classique de Sophrologie, je
                    vous propose une séance découverte qui va vous permettre de
                    découvrir la sophrologie avec un thème général.
                  </p>
                  <p>
                    Cette séance découverte est un premier pas vers la sophrologie
                    afin de vous faire votre propre avis sur la pratique.
                  </p>
                  <p>
                    De plus, je vous propose une séance dite{" "}
                    <strong>classique</strong> qui débute par :
                  </p>
                  <p>
                    -Un temps d’échange afin de faire connaissance et d’en
                    apprendre plus sur votre quotidien (votre état de santé
                    général, votre environnement familial, social ...).
                  </p>
                  <p>
                    Lors de ce temps d’échange, nous allons fixer ensemble un
                    objectif final à atteindre.
                  </p>
                  <p>
                    - Un temps de pratique qui est composé d’exercices de
                    relaxation dynamique comprenant des mouvements doux du corps
                    et de respiration contrôlée. Ensuite, il y a des
                    visualisations positives où vous êtes installé confortablement
                    et au son de ma voix, vous allez visualiser des images
                    positives.
                  </p>
                  <p>
                    - Un dernier temps d’échange où vous partagez vos ressentis si
                    vous le souhaitez.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection>

        <div className="bg-orange-300 ">
          <div className="mx-auto container px-10 py-10">
            <h3 className="text-white text-2xl pb-5 font-bold">Mon Cabinet</h3>
            <div className="flex gap-5 justify-between items-center flex-col md:flex-row">
              <div className="text-white md:w-auto sm:w-auto flex flex-col gap-4">
                <p>
                  Je vous accueille chaleureusement au 556 rue Arthur Brunet,
                  59220 Denain.
                </p>

                <p>
                  {" "}
                  Dans un espace dédié à la relaxation et à l’harmonie intérieure.
                </p>

                <p>
                  De plus, je fais également des séances à distance par
                  visio-conférence.
                </p>
              </div>
              <div className="w-full lg:w-1/2 flex flex-col sm:flex-row justify-center items-center gap-5">
                <div className="relative w-full sm:w-1/2 aspect-[4/3]">
                  <Image
                    src={bureau}
                    alt="Bureau 1"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="relative w-full sm:w-1/2 aspect-[4/3]">
                  <Image
                    src={bureau1}
                    alt="Bureau 2"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection>

        <div className="bg-orange-50" id="services">
          <div className="mx-auto container px-10 py-10">
            <h3 className="text-black text-2xl pb-10 font-bold">Mes services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-medium text-lg">Séances découvertes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Séance avec une thématique générale pour vous faire découvrir
                    une séance type et les effets de celle-ci.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-medium text-lg">Séances individuelles</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Séances personnalisées selon vos besoins et objectifs avec un
                    protocole de séance unique.</p>
                </CardContent>

              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-medium text-lg">Atelier de groupe</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Pour découvrir et pratiquer la sophrologie en toute convivialité.</p>
                </CardContent>
              </Card>

              <Card className="flex flex-col h-full pr-5">
                <CardHeader>
                  <CardTitle className="font-medium text-lg">
                    Interventions en entreprise/collectivités/<br></br>structures éducatives
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex items-center">
                  <p>Pour faire découvrir à vos collaborateurs les bienfaits de la sophrologie.</p>
                </CardContent>
              </Card>

            </div>

            <ScrollButton targetId="seances">
              Découvrir les seances
            </ScrollButton>

          </div>

        </div>
      </AnimatedSection>
      <AnimatedSection>
        <div className="bg-white">
          <div className="mx-auto container py-10 px-10">
            <h2 className="text-kaki text-2xl font-bold pb-10">Sur quelle problématique la sophrologie peut vous aider ?</h2>
            <div className="flex gap-5 items-center flex-col md:flex-row">
              <div className="flex flex-col gap-5">
                <Card className="bg-kaki text-white">
                  <CardHeader>
                    <CardTitle className="font-medium text-lg">Amélioration du sommeil</CardTitle>
                  </CardHeader>
                  <CardContent className="font-light">
                    <p>Trouver des solutions pour mieux s’endormir et améliorer la qualité du sommeil.</p>
                  </CardContent>
                </Card>

                <Card className="bg-kaki text-white">
                  <CardHeader>
                    <CardTitle className="font-medium text-lg">Préparation aux événements importants</CardTitle>
                  </CardHeader>
                  <CardContent className="font-light">
                    <p>Se préparer mentalement et émotionnellement pour des examens, des compétitions sportives, des interventions médicales ou des présentations.</p>
                  </CardContent>
                </Card>

                <Card className="bg-kaki text-white">
                  <CardHeader>
                    <CardTitle className="font-medium text-lg">Gestion des émotions</CardTitle>
                  </CardHeader>
                  <CardContent className="font-light">
                    <p>Apprendre à mieux gérer ses émotions et à retrouver un équilibre émotionnel.</p>
                  </CardContent>
                </Card>

                <Card className="bg-kaki text-white">
                  <CardHeader>
                    <CardTitle className="font-medium text-lg">Accompagnement dans les changements de vie</CardTitle>
                  </CardHeader>
                  <CardContent className="font-light">
                    <p>Se préparer et s’adapter à des changements importants comme une nouvelle carrière, une grossesse, une retraite, un deuil.</p>
                  </CardContent>
                </Card>
              </div>  <div className="flex flex-col gap-5">
                <Card className="bg-kaki text-white">
                  <CardHeader>
                    <CardTitle className="font-medium text-lg">Gestion du stress et de l’anxiété</CardTitle>
                  </CardHeader>
                  <CardContent className="font-light">
                    <p>Apprendre à se détendre et à réduire le stress au quotidien.</p>
                  </CardContent>
                </Card>

                <Card className="bg-kaki text-white">
                  <CardHeader>
                    <CardTitle className="font-medium text-lg">Renforcement de la confiance en soi</CardTitle>
                  </CardHeader>
                  <CardContent className="font-light"><p>Développer une meilleure estime de soi et se sentir plus sûr de ses capacités.</p>
                  </CardContent>
                </Card>

                <Card className="bg-kaki text-white">
                  <CardHeader>
                    <CardTitle className="font-medium text-lg">Amélioration de la concentration et des performances</CardTitle>
                  </CardHeader>
                  <CardContent className="font-light">
                    <p>Optimiser la concentration et les performances dans les études, au travail ou dans le sport.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      {/* <AnimatedSection>

        <div className="bg-orange-50">
          <div className="py-10 px-10  flex flex-col align-center items-center gap-10 justify-center">
            <h2 className=" text-transparent inline-block bg-gradient-to-r from-amber-500  from-1%  to-yellow-300 to-90% text-2xl bg-clip-text font-bold">Ils m'ont fait confiance !</h2>
            <TestimonialSlider />
          </div>
        </div>
      </AnimatedSection> */}
      <AnimatedSection>


        <div className="bg-white" id="seances">
          <div className="mx-auto container py-10 px-10 flex flex-col items-center justify-center align-center">
            <h2 className="text-black text-2xl font-bold pb-10">Les types de séances</h2>
            <SeanceTypesTable />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>

        <Contact />
      </AnimatedSection>
    </div>
  );
}

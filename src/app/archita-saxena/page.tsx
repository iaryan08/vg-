
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Linkedin, Github, UtensilsCrossed, Coffee, Film, Clapperboard } from 'lucide-react';
import React from 'react';

const skills = {
  design: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'Color Theory', 'Typography'],
  technical: ['HTML', 'CSS', 'JavaScript', 'C++', 'Python', 'Git'],
};

const projects = [
    {
        title: 'Delicious Burger Ad',
        description: 'This design goes beyond a simple food poster to create a full sensory experience. By showcasing a perfectly crafted burger with dynamically floating fries and fresh tomatoes, the ad ignites cravings and captures the pure joy of a delicious meal. The bold call-to-action ensures that desire is just one click away from becoming reality.',
        icon: <UtensilsCrossed className="h-8 w-8" />,
        image: '/archita/2.jpeg',
    },
    {
        title: 'Coffee Splash Advertisement',
        description: 'Feel the jolt of inspiration with this energetic coffee advertisement. A powerful splash from a takeaway cup, framed by rich coffee beans, conveys instant freshness and intensity. The design\'s warm color palette and bold typography work in harmony to promise a premium, invigorating coffee experience that commands attention.',
        icon: <Coffee className="h-8 w-8" />,
        image: '/archita/1.jpeg',
    },
    {
        title: 'Dark Lab Studio Clube Poster',
        description: 'Enter a world of cinematic nostalgia. This retro poster for Dark Lab Studio Clube uses vintage film reels and a neon-lit city skyline to create a captivating, moody atmosphere. It\'s a visual invitation for aspiring filmmakers to join a creative hub and transform their celluloid dreams into reality.',
        icon: <Film className="h-8 w-8" />,
        image: '/archita/3.jpg',
    },
    {
        title: 'Dark Lab Studio – Filmmaker’s Hub',
        description: 'This stylized illustration serves as a beacon for creators, promoting Dark Lab Studio as the ultimate filmmaker\'s hub. Classic film projectors and warm, hanging lightbulbs evoke a sense of timeless craft, while the \'Unleash Your Inner Filmmaker\' tagline inspires action. It\'s perfectly designed to attract and unite a community of film lovers.',
        icon: <Clapperboard className="h-8 w-8" />,
        image: '/archita/4.jpg',
    },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: 'easeOut'
    },
  }),
};

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      viewport={{ once: true, amount: 0.5 }}
      custom={index}
      className="bg-white/40 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-slate-300/20 group"
    >
        <div className="overflow-hidden h-72">
            <Image
                src={project.image}
                alt={project.title}
                width={1200}
                height={800}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
        </div>
        <div className="p-6">
            <div className="flex items-center gap-4 text-purple-600">
                {project.icon}
                <h3 className="text-2xl font-bold tracking-tight text-slate-900">{project.title}</h3>
            </div>
            <p className="mt-4 text-slate-700 text-lg leading-relaxed">{project.description}</p>
        </div>
    </motion.div>
  );
};


export default function ArchitaSaxenaPage() {
  return (
    <div className="min-h-screen bg-[#fbfaf5] text-slate-800 font-sans isolate">
      <div className="fixed top-6 left-6 z-50">
        <Button asChild variant="outline" className="bg-white/50 backdrop-blur-sm border-slate-300 hover:bg-white/80">
            <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
            </Link>
        </Button>
      </div>

      <section className="relative flex items-center min-h-screen px-4 py-24 overflow-hidden">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center md:text-left z-10"
          >
            <h2 className="text-xl font-semibold text-slate-600 tracking-wider font-sans">
              <span className="relative inline-block px-2">
                MEET
                <span className="absolute bottom-0 left-0 w-full h-1/2 bg-purple-200/80 -z-10" />
              </span>
            </h2>
            <h1 className="text-5xl md:text-7xl font-serif font-extrabold text-slate-900 mt-2">
              Archita Saxena
            </h1>
            <p className="mt-4 text-lg text-slate-700 max-w-md mx-auto md:mx-0">
              Graphic Designer & B.Tech CSE Student with a fervent love for visual storytelling.
            </p>
            <div className="mt-8 flex items-center justify-center md:justify-start gap-6">
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-6 py-3 shadow-lg">
                <Link href="#projects">
                  See my portfolio
                </Link>
              </Button>
              <div className="flex gap-1">
                <Button asChild variant="ghost" size="icon" className="text-slate-600 hover:text-pink-600 hover:bg-pink-100 rounded-full">
                  <a href="mailto:architasaxena@example.com" aria-label="Email">
                    <Mail />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon" className="text-slate-600 hover:text-pink-600 hover:bg-pink-100 rounded-full" disabled>
                  <a href="#" aria-label="LinkedIn">
                    <Linkedin />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon" className="text-slate-600 hover:text-pink-600 hover:bg-pink-100 rounded-full" disabled>
                  <a href="#" aria-label="GitHub">
                    <Github />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative flex justify-center items-center h-full min-h-[400px] md:min-h-0"
          >
             <div className="absolute w-full h-full max-w-[500px] max-h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-200 via-purple-200 to-orange-100 rounded-full blur-3xl opacity-70" />
                <motion.div
                    className="absolute top-0 right-0 w-48 h-48 bg-purple-200 rounded-full blur-2xl opacity-80"
                    animate={{
                        x: [0, 20, 0],
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut'
                    }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-40 h-40 bg-pink-200 rounded-full blur-2xl opacity-80"
                    animate={{
                        x: [0, -15, 0],
                        y: [0, 15, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                        delay: 2
                    }}
                />
            </div>

            {/* Geometric Shapes */}
            <motion.div
                className="absolute top-[15%] left-[10%] w-16 h-16 bg-pink-300/30"
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />
             <motion.div
                className="absolute bottom-[20%] right-[5%] w-12 h-12 bg-purple-300/30 rounded-lg"
                animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute bottom-[10%] left-[20%] w-5 h-5 bg-orange-400/50 rounded-full"
                 animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="absolute top-[25%] right-[15%] space-y-1">
                <motion.div className="w-1.5 h-1.5 bg-pink-400/60 rounded-full" animate={{x: [0, 5, 0]}} transition={{duration: 5, repeat: Infinity, ease: 'easeInOut'}} />
                <motion.div className="w-1.5 h-1.5 bg-pink-400/60 rounded-full" animate={{x: [0, -5, 0]}} transition={{duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5}} />
                <motion.div className="w-1.5 h-1.5 bg-pink-400/60 rounded-full" animate={{x: [0, 5, 0]}} transition={{duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1}}/>
            </div>


            <div className="relative w-[300px] h-[450px] md:w-[400px] md:h-[600px]">
              <Image
                src="/archita/archu-profile.png"
                alt="Archita Saxena"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-4 space-y-32 md:space-y-48 py-24 relative">
        
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
        >
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-base font-semibold tracking-wider text-purple-600 uppercase">Who I Am</h2>
                <p className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-slate-900">About Me</p>
                <p className="mt-6 text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
                    I am a passionate and creative <strong>2nd-year B.Tech Computer Science Engineering</strong> student at <strong>Samrat Ashok Technological Institute, Vidisha</strong>, with a fervent love for visual storytelling. My journey is a blend of logic-driven coding and intuitive design, where I strive to create digital experiences that are not only functional but also beautiful and emotionally resonant. I believe great design is about solving problems and creating connections.
                </p>
            </div>
        </motion.section>

        <section id="projects">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold tracking-wider text-purple-600 uppercase">My Creations</h2>
            <p className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-slate-900">Featured Projects</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </section>

        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold tracking-wider text-purple-600 uppercase">My Toolbox</h2>
            <p className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-slate-900">Skills & Expertise</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <motion.div variants={cardVariants} custom={1} initial="hidden" whileInView="visible" viewport={{once: true}}>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Design</h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                      {skills.design.map((skill) => <motion.div key={skill} whileHover={{scale: 1.1}}><Badge className="text-md py-2 px-4 shadow-lg bg-pink-500 text-pink-50 hover:bg-pink-600 border-pink-600">{skill}</Badge></motion.div>)}
                  </div>
              </motion.div>
              <motion.div variants={cardVariants} custom={2} initial="hidden" whileInView="visible" viewport={{once: true}}>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Technical</h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                      {skills.technical.map((skill) => <motion.div key={skill} whileHover={{scale: 1.1}}><Badge className="text-md py-2 px-4 shadow-lg bg-purple-500 text-purple-50 hover:bg-purple-600 border-purple-600">{skill}</Badge></motion.div>)}
                  </div>
              </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-16 border-t border-slate-300/50 mt-32">
        <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold tracking-tight text-slate-900">Let's Connect!</h3>
            <p className="mt-2 text-lg text-slate-700">I'm always open to new opportunities and collaborations.</p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild variant="ghost" size="icon" className="text-slate-600 hover:text-pink-600 hover:bg-pink-100 rounded-full">
                <a href="mailto:architasaxena@example.com" aria-label="Email">
                  <Mail />
                </a>
              </Button>
               <Button asChild variant="ghost" size="icon" className="text-slate-600 hover:text-pink-600 hover:bg-pink-100 rounded-full" disabled>
                <a href="#" aria-label="LinkedIn">
                  <Linkedin />
                </a>
              </Button>
               <Button asChild variant="ghost" size="icon" className="text-slate-600 hover:text-pink-600 hover:bg-pink-100 rounded-full" disabled>
                <a href="#" aria-label="GitHub">
                  <Github />
                </a>
              </Button>
            </div>
            <p className="mt-8 text-sm text-slate-600">Archita Saxena &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

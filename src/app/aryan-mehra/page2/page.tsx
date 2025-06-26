
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Mail, Linkedin, Github, Code, BrainCircuit, Users, Mic, Zap, ArrowDown } from 'lucide-react';
import React from 'react';

const skills = {
  languages: ['Python', 'JavaScript', 'C++', 'TypeScript', 'HTML/CSS'],
  technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Pusher', 'MATLAB/Simulink', 'Tkinter', 'OpenAI API', 'Genkit'],
  libraries: ['PyTorch', 'Pandas', 'NumPy', 'VS Code', 'Jupyter', 'Pycharm'],
};

const projects = [
    {
        title: 'Collaborative Real-time Whiteboard',
        description: 'Developed a full-stack, real-time whiteboard with Next.js, React, and Pusher, supporting multi-user drawing tools. Engineered a serverless architecture using Pusher for live WebSockets and MongoDB for persistent storage.',
        icon: <Users className="h-8 w-8" />,
        image: 'https://placehold.co/1200x800.png',
        imageHint: 'collaboration digital whiteboard'
    },
    {
        title: 'AI-Powered Blog Search Engine',
        description: 'Created a personal search engine focused on surfacing personal blogs and articles, optimizing AI/ML cost and inference time by using lightweight models like Gemma-3 1B and hierarchical classification.',
        icon: <BrainCircuit className="h-8 w-8" />,
        image: 'https://placehold.co/1200x800.png',
        imageHint: 'AI search interface'
    },
    {
        title: 'Voice-Interactive UI',
        description: 'Built a responsive voice-interactive UI in React.js, integrating OpenAI APIs to enable AI conversations. Implemented speech recognition and synthesis features for an intuitive, hands-free user experience.',
        icon: <Mic className="h-8 w-8" />,
        image: 'https://placehold.co/1200x800.png',
        imageHint: 'voice assistant abstract'
    },
];

const experience = [
    {
        role: 'AI/ML Research Intern',
        company: 'Hypothetical Tech Inc.',
        period: 'Summer 2023',
        description: 'Contributed to a research project on optimizing LLM performance for search applications. Developed and tested lightweight models, resulting in a 20% reduction in inference latency.',
        icon: <BrainCircuit className="h-5 w-5 text-primary" />,
    },
    {
        role: 'Full-Stack Developer (Freelance)',
        company: 'Remote',
        period: '2021 - 2027 (Expected)',
        description: 'Designed and developed full-stack web applications for various clients, utilizing modern frameworks like Next.js and React. Focused on creating responsive, scalable, and user-friendly solutions.',
        icon: <Code className="h-5 w-5 text-primary" />,
    }
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: 'easeOut'
    },
  }),
};

const skillBadgeVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: 'easeOut'
    },
  }),
}

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`relative grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-16 py-12`}
    >
        <div className={`space-y-4 ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
            <div className="flex items-center gap-4 text-primary">
            {project.icon}
            <h3 className="text-3xl font-bold tracking-tight">{project.title}</h3>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">{project.description}</p>
        </div>
        <div ref={cardRef} onMouseMove={handleMouseMove} className={`overflow-hidden rounded-xl border border-border/20 shadow-2xl shadow-primary/10 group relative ${index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
             <div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(300px at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary)/0.15), transparent 80%)`,
                }}
            />
            <motion.div style={{ y }}>
                <Image
                    src={project.image}
                    alt={project.title}
                    data-ai-hint={project.imageHint}
                    width={1200}
                    height={800}
                    className="w-full object-cover"
                />
            </motion.div>
      </div>
    </motion.div>
  );
};


export default function AryanMehraPage2() {
  const scrollRef = React.useRef(null);

  return (
    <div ref={scrollRef} className="min-h-screen bg-background text-foreground isolate overflow-x-hidden">
        
        <div className="absolute inset-0 -z-20 h-full w-full bg-background bg-[radial-gradient(hsl(var(--foreground)/0.05)_1px,transparent_1px)] [background-size:32px_32px]" aria-hidden="true" />

        <div className="absolute inset-0 -z-10" aria-hidden="true">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.1),transparent_40%)] blur-3xl" 
            />
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-[radial-gradient(circle,hsl(var(--accent)/0.1),transparent_50%)] blur-3xl" 
            />
             <motion.div 
                initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                whileInView={{ opacity: 0.1, scale: 1, rotate: 15 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.8 }}
                className="absolute top-[10%] left-[5%] h-32 w-32 rounded-full border-2 border-dashed border-primary/30"
            />
            <motion.div 
                initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                whileInView={{ opacity: 0.1, scale: 1, rotate: -30 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                 viewport={{ once: true, amount: 0.8 }}
                className="absolute top-[20%] right-[10%] h-16 w-16 rounded-xl bg-accent/20"
            />
        </div>

       <div className="fixed top-6 left-6 z-50">
           <Button asChild variant="outline" className="bg-background/50 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground">
                <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
                </Link>
            </Button>
        </div>

      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 overflow-hidden">
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
        >
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }} className="relative inline-block mb-6">
                 <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-75 animate-pulse" />
                <Image
                    src="/aryan-photo.jpg"
                    alt="Aryan Mehra"
                    width={160}
                    height={160}
                    className="rounded-full mx-auto relative border-4 border-primary/50 shadow-lg"
                />
            </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-muted-foreground">
            Aryan Mehra
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            A Full-Stack Developer and AI enthusiast from IIT Roorkee, passionate about building intelligent, user-centric applications.
          </p>
          <div className="mt-10 flex justify-center gap-4">
              <Button asChild variant="default" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="mailto:aryan_m@ee.iitr.ac.in">Get In Touch</a>
              </Button>
               <Button asChild variant="outline" size="lg" className="bg-transparent" disabled>
                <a href="#">View Résumé</a>
              </Button>
          </div>
        </motion.div>
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10"
        >
          <ArrowDown className="h-8 w-8 text-muted-foreground animate-bounce" />
        </motion.div>
      </section>

      <main className="container mx-auto px-4 space-y-40 md:space-y-64 py-24 relative">
        
        <div className="absolute top-[15%] right-[5%] -z-10" aria-hidden="true">
             <motion.div
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: -20 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.5 }}
                className="w-48 h-48 bg-primary/5 rounded-full blur-2xl"
             />
        </div>
         <div className="absolute top-1/3 left-[2%] -z-10" aria-hidden="true">
             <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.8 }}
                whileInView={{ opacity: 0.5, y: 0, scale: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
                className="w-32 h-32 border-2 border-dashed border-accent/50 rounded-xl"
             />
        </div>
        <div className="absolute top-2/3 right-[10%] -z-10" aria-hidden="true">
             <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.5 }}
                className="w-24 h-24 bg-accent/10 rounded-full"
             />
             <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                viewport={{ once: true, amount: 0.5 }}
                className="w-40 h-40 border border-primary/20 rounded-full ml-16 -mt-10"
             />
        </div>

        <section>
          <motion.div 
            variants={sectionVariants} 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <h2 className="text-base font-semibold tracking-wider text-primary uppercase">My Work</h2>
            <p className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">Featured Projects</p>
          </motion.div>
          <div className="space-y-16 md:space-y-24">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </section>

        <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-base font-semibold tracking-wider text-primary uppercase">My Toolkit</h2>
            <p className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">Technologies & Skills</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div variants={sectionVariants} custom={1}>
              <h3 className="text-2xl font-bold text-foreground/80 mb-4">Languages & Core</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                  {skills.languages.map((skill, i) => <motion.div key={skill} custom={i} variants={skillBadgeVariants} initial="hidden" whileInView="visible" viewport={{once: true}}><Badge variant="secondary" className="text-md py-2 px-4 shadow-md">{skill}</Badge></motion.div>)}
              </div>
            </motion.div>
             <motion.div variants={sectionVariants} custom={2}>
              <h3 className="text-2xl font-bold text-foreground/80 mb-4">Frameworks & Technologies</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                  {skills.technologies.map((skill, i) => <motion.div key={skill} custom={i} variants={skillBadgeVariants} initial="hidden" whileInView="visible" viewport={{once: true}}><Badge variant="secondary" className="text-md py-2 px-4 shadow-md">{skill}</Badge></motion.div>)}
              </div>
            </motion.div>
             <motion.div variants={sectionVariants} custom={3}>
              <h3 className="text-2xl font-bold text-foreground/80 mb-4">Libraries & Tools</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                  {skills.libraries.map((skill, i) => <motion.div key={skill} custom={i} variants={skillBadgeVariants} initial="hidden" whileInView="visible" viewport={{once: true}}><Badge variant="secondary" className="text-md py-2 px-4 shadow-md">{skill}</Badge></motion.div>)}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-base font-semibold tracking-wider text-primary uppercase">Career Journey</h2>
            <p className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">Professional Experience</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-12 relative">
             <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-border -translate-x-1/2" />
             {experience.map((exp, index) => (
                <motion.div 
                    key={index}
                    variants={sectionVariants}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    className="flex items-start gap-6 relative"
                >
                  <div className="relative z-10 mt-1">
                    <div className="w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center">
                      {exp.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
                    <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                    <p className="text-lg text-muted-foreground">{exp.company}</p>
                    <p className="mt-2 text-foreground/80">{exp.description}</p>
                  </div>
                </motion.div>
             ))}
          </div>
        </motion.section>
      </main>

      <footer className="py-16 border-t border-border mt-32">
        <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold tracking-tight">Let's build something amazing.</h3>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <a href="mailto:aryan_m@ee.iitr.ac.in" aria-label="Email">
                  <Mail />
                </a>
              </Button>
               <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" disabled>
                <a href="#" aria-label="LinkedIn">
                  <Linkedin />
                </a>
              </Button>
               <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" disabled>
                <a href="#" aria-label="GitHub">
                  <Github />
                </a>
              </Button>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">Aryan Mehra &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

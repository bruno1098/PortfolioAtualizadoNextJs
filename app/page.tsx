"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Code2, Database, Globe, Palette, Server, Terminal, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Background3D from "@/components/Background3D";
import Scene3D from "@/components/Scene3D";
import CertificateScene3D from "@/components/CertificateScene3D";

interface Repository {
  name: string;
  html_url: string;
  description: string;
  language: string;
  homepage: string;
}

interface Skill {
  name: string;
  icon: JSX.Element;
  description: string;
  technologies: string[];
  color: string;
}

export default function Home() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const skills: Skill[] = [
    {
      name: "Frontend Development",
      icon: <Code2 className="w-6 h-6 sm:w-8 sm:h-8" />,
      description: "Criação de interfaces modernas e responsivas",
      technologies: ["React", "Next.js", "React-Native", "Html", "Css", "Javascript", "Typescript", "Angular", "SwiftUI", "Tailwind CSS",],
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      name: "Backend Development",
      icon: <Server className="w-6 h-6 sm:w-8 sm:h-8" />,
      description: "Desenvolvimento de APIs e serviços robustos",
      technologies: [ "Java", "Node.js", "Spring Boot", "Python", "Flask"],
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      name: "Database",
      icon: <Database className="w-6 h-6 sm:w-8 sm:h-8" />,
      description: "Modelagem e otimização de bancos de dados",
      technologies: ["MongoDB", "MySQL", "Oracle", "PostgreSQL"],
      color: "from-yellow-500/20 to-orange-500/20"
    },
    {
      name: "UI/UX Design",
      icon: <Palette className="w-6 h-6 sm:w-8 sm:h-8" />,
      description: "Design de interfaces intuitivas e atraentes",
      technologies: ["Figma", "Adobe XD", "Framer Motion", "GSAP", "Remotion"],
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      name: "DevOps",
      icon: <Terminal className="w-6 h-6 sm:w-8 sm:h-8" />,
      description: "Automação e deploy de aplicações",
      technologies: ["Docker", "Git", "CI/CD", "AWS", "Azure", "Github"],
      color: "from-red-500/20 to-rose-500/20"
    },
    {
      name: "Web Performance",
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      description: "Otimização e performance de aplicações web",
      technologies: ["Webpack", "Vite", "SEO", "Analytics", "Google Analytics", "Vercel"],
      color: "from-indigo-500/20 to-violet-500/20"
    }
  ];

  useEffect(() => {
    fetch('https://api.github.com/users/bruno1098/repos')
      .then(response => response.json())
      .then(data => {
        const sortedRepos = data.sort((a: { updated_at: string | number | Date; }, b: { updated_at: string | number | Date; }) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        setRepos(sortedRepos);
      })
      .catch(error => console.error('Error fetching repos:', error));
  }, []);

  return (
    <main className="bg-gradient-to-br from-background/80 to-muted/80 overflow-x-hidden">
      <Background3D />
      {/* Hero Section */}
      <section className="min-h-screen container mx-auto px-4 py-8 md:py-20">
        <div className="grid lg:grid-cols-2 gap-28 lg:gap-22 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="space-y-2">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
              >
                <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  Bruno Antunes
                </span>
              </motion.h1>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
              >
                Desenvolvedor Full Stack
              </motion.h2>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg sm:text-xl text-muted-foreground"
            >
              Transformando ideias em experiências digitais incríveis
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              <Button asChild>
                <a 
                  href="#projects" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#projects')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'nearest'
                    });
                  }}
                >
                  Ver Projetos
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a 
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'nearest'
                    });
                  }}
                >
                  Contato
                </a>
              </Button>
            </motion.div>

            <div className="flex gap-4 sm:gap-6">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/bruno1098"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com/in/bruno-saantunes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:bruno.saantunes1@gmail.com"
                className="text-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 90 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8 }}
            className="relative mt-8 lg:mt-0"
          >
            <div 
              className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]"
            >
              <div className="w-full h-full bg-gradient-to-r from-primary/10 via-blue-500/10 to-primary/10 blur-3xl rounded-full animate-pulse-slow" />
            </div>
            
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative bg-card/30 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-lg shadow-xl border border-border"
            >
              <pre className="font-mono text-xs sm:text-sm md:text-base text-foreground/90 overflow-x-auto relative animate-code-background mt-8 md:mt-12">
                <code>
{`const developer = {
  name: 'Bruno',
  skills: [
    'JavaScript',
    'Typescript',
    'Java',
    'React',
    'Angular',
    'Node.js'
  ],
  passion: 'Criando aplicativos web incríveis'
};

// Sempre buscando aprender mais
function createAwesomeStuff() {
  return developer.skills.map(skill => 
    innovation.build(skill)
  );
}`}
                </code>
              </pre>
            </motion.div>
          </motion.div>
        </div>
        <Scene3D />
      </section>

      {/* About & Skills Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/50">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          {/* About Me */}
          <div className="max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-background/80 to-muted p-6 sm:p-8 rounded-2xl shadow-lg border border-border/50 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">Sobre Mim</h2>
              </div>
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-muted-foreground">
                <p>
                  Olá! Sou um desenvolvedor Full Stack apaixonado por criar soluções web inovadoras e eficientes.
                  Com experiência em tecnologias modernas como React, Angular e Node.js, busco sempre entregar
                  projetos que não apenas funcionem bem, mas também proporcionem uma excelente experiência ao usuário.
                </p>
                <p>
                  Minha jornada na programação começou com a curiosidade de entender como as coisas funcionam,
                  e essa mesma curiosidade me motiva a continuar aprendendo e evoluindo constantemente.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Skills */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">
            Habilidades & Tecnologias
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${skill.color} p-4 sm:p-6 shadow-lg backdrop-blur-sm border border-border/50 h-full`}
                >
                  <div className="relative z-10">
                    <div className="mb-3 sm:mb-4 text-primary">{skill.icon}</div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{skill.name}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">{skill.description}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {skill.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-background/50 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/20 backdrop-blur-[2px]" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Certifications Section */}
      <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <CertificateScene3D />
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center"
          >
            Certificações
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Estatísticas para Soluções em TI",
                issuer: "FIAP",
                date: "Outubro de 2024",
                credential: "2b8bb39d8c600901a11a6edd5e855ee4",
                url: "https://on.fiap.com.br/pluginfile.php/1/local_nanocourses/certificado_nanocourse/126704/2b8bb39d8c600901a11a6edd5e855ee4/certificado.png",
                logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFGUHRJ26bFDw/company-logo_100_100/company-logo_100_100/0/1631312349936?e=1747267200&v=beta&t=rS-t9CbJzndwyX6b7R_lHe06r5Qo9ihIaorqUORtY8I"
              },
              {
                title: "User Experience",
                issuer: "FIAP",
                date: "Outubro de 2024",
                credential: "a38314f5c22fab912d3e953f7b5d6b96",
                url: "https://on.fiap.com.br/pluginfile.php/1/local_nanocourses/certificado_nanocourse/126526/a38314f5c22fab912d3e953f7b5d6b96/certificado.png",
                logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFGUHRJ26bFDw/company-logo_100_100/company-logo_100_100/0/1631312349936?e=1747267200&v=beta&t=rS-t9CbJzndwyX6b7R_lHe06r5Qo9ihIaorqUORtY8I"
              },
              {
                title: "React Native: Construindo um App com Native-base",
                issuer: "Alura",
                date: "Abril de 2024",
                credential: "c08996e1-23b8-4678-b1fe-5c184c558ae8",
                url: "https://cursos.alura.com.br/certificate/c08996e1-23b8-4678-b1fe-5c184c558ae8?lang",
                logo: "https://media.licdn.com/dms/image/v2/D4D0BAQEZkMsv5FwbDA/company-logo_100_100/company-logo_100_100/0/1710187635900/aluracursos_logo?e=1747267200&v=beta&t=aFkqXu_dNXPktcRhqtZJuR3Ms3Gh2AtMGBONsZFc7tU"
              },
              {
                title: "React Native: utilizando Web API",
                issuer: "Alura",
                date: "Abril de 2024",
                credential: "6f4eae92-a420-48af-b86c-e5be5b1576e0",
                url: "https://cursos.alura.com.br/certificate/6f4eae92-a420-48af-b86c-e5be5b1576e0?lang",
                logo: "https://media.licdn.com/dms/image/v2/D4D0BAQEZkMsv5FwbDA/company-logo_100_100/company-logo_100_100/0/1710187635900/aluracursos_logo?e=1747267200&v=beta&t=aFkqXu_dNXPktcRhqtZJuR3Ms3Gh2AtMGBONsZFc7tU"
              },
              {
                title: "Cloud Onboarding: Trabalhando com os principais provedores",
                issuer: "Alura",
                date: "Março de 2024",
                credential: "95477fca-aedc-417f-a6bd-b1e14159d45f",
                url: "https://cursos.alura.com.br/certificate/95477fca-aedc-417f-a6bd-b1e14159d45f?lang",
                logo: "https://media.licdn.com/dms/image/v2/D4D0BAQEZkMsv5FwbDA/company-logo_100_100/company-logo_100_100/0/1710187635900/aluracursos_logo?e=1747267200&v=beta&t=aFkqXu_dNXPktcRhqtZJuR3Ms3Gh2AtMGBONsZFc7tU"
              },
              {
                title: "JavaScript: Explorando a linguagem",
                issuer: "Alura",
                date: "Fevereiro de 2024",
                credential: "932e5e98-6be6-4434-9b40-03384c9ce205",
                url: "https://cursos.alura.com.br/certificate/932e5e98-6be6-4434-9b40-03384c9ce205?lang",
                logo: "https://media.licdn.com/dms/image/v2/D4D0BAQEZkMsv5FwbDA/company-logo_100_100/company-logo_100_100/0/1710187635900/aluracursos_logo?e=1747267200&v=beta&t=aFkqXu_dNXPktcRhqtZJuR3Ms3Gh2AtMGBONsZFc7tU"
              },
              {
                title: "Responsive Web Development",
                issuer: "FIAP",
                date: "Outubro de 2023",
                credential: "ca2892eb7657969cc08ee29d6249783c",
                url: "https://on.fiap.com.br/pluginfile.php/1/local_nanocourses/certificado_nanocourse/97119/ca2892eb7657969cc08ee29d6249783c/certificado.png",
                logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFGUHRJ26bFDw/company-logo_100_100/company-logo_100_100/0/1631312349936?e=1747267200&v=beta&t=rS-t9CbJzndwyX6b7R_lHe06r5Qo9ihIaorqUORtY8I"
              },
              {
                title: "Certificado de Qualificação Profissional em Análise de Sistemas e Prototipação Web",
                issuer: "FIAP",
                date: "Julho de 2023",
                credential: "Certificado de Qualificação",
                url: "https://www2.fiap.com.br/updown/DocumentosAssinados/7966e27d-df12-4167-815a-2f6f22b3ab3b.pdf",
                logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFGUHRJ26bFDw/company-logo_100_100/company-logo_100_100/0/1631312349936?e=1747267200&v=beta&t=rS-t9CbJzndwyX6b7R_lHe06r5Qo9ihIaorqUORtY8I"
              },
              {
                title: "Certificado de Qualificação Profissional em Desenvolvimento e Designer Web 2.0",
                issuer: "FIAP",
                date: "Dezembro de 2023",
                credential: "Certificado de Qualificação",
                url: "https://www2.fiap.com.br/updown/DocumentosAssinados/8d2a8b68-fb2f-491f-8dc3-6dd3985bf8ce.pdf",
                logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFGUHRJ26bFDw/company-logo_100_100/company-logo_100_100/0/1631312349936?e=1747267200&v=beta&t=rS-t9CbJzndwyX6b7R_lHe06r5Qo9ihIaorqUORtY8I"
              }
            ].map((cert, index) => (
              <motion.div
                key={cert.credential}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 10 }}
                className="group"
              >
                <div className="relative h-full bg-gradient-to-br from-background/40 to-background/10 backdrop-blur-lg rounded-2xl p-6 border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-primary/10 p-2">
                        <img 
                          src={cert.logo} 
                          alt={`${cert.issuer} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                        Emitido em: {cert.date}
                      </p>
                      {cert.credential && cert.credential !== "Certificado de Qualificação" && (
                        <p className="text-xs text-muted-foreground/80 break-all">
                          Credencial: {cert.credential}
                        </p>
                      )}
                    </div>

                    <motion.div 
                      className="mt-4"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full bg-gradient-to-r from-primary/80 to-primary hover:from-primary hover:to-primary/90" asChild>
                        <a 
                          href={cert.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Ver Certificado
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-16 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center"
          >
            Meus Projetos
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-semibold">{repo.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {repo.description || "No description available"}
                    </p>
                    {repo.language && (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full" />
                        <span className="text-xs sm:text-sm">{repo.language}</span>
                      </div>
                    )}
                    <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4">
                      <Button variant="outline" size="sm" asChild>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                          Código
                        </a>
                      </Button>
                      {repo.homepage && (
                        <Button size="sm" asChild>
                          <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
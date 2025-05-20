import { HackathonCard } from "@/components/hackathon-card";
import { Phone } from 'lucide-react';
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import ContactForm from "@/components/contact-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { ClientLogos } from "@/components/client-carousel";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`${DATA.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve collaborated on a variety of projects with multiple research institutes and clients. Most of my work revolves around using optical imagery to monitor and analyze our changing planet.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
          {DATA.projects.map((project, id) => {
              let cardMainLink: string;
              // Determine the main link for the ProjectCard (image/video/title)
              // A project can have a top-level 'slug' (for blog post) or 'href' (for external site)
              if ("slug" in project && project.slug) {
                cardMainLink = `/blog/${project.slug}`;
              } else if ("href" in project && project.href) {
                cardMainLink = project.href;
              } else {
                cardMainLink = "#"; // Fallback if neither slug nor href is present
              }

              // Determine the link for the print view
              let cardPrintLink: string | undefined;
              if ("href" in project && project.href) { // Prefer direct external link if available
                cardPrintLink = project.href;
              } else if ("slug" in project && project.slug) { // If no direct href, but has a slug, link to the blog post
                // Construct absolute URL for blog post if DATA.url is set, otherwise relative
                cardPrintLink = DATA.url
                  ? `${DATA.url}/blog/${project.slug}`
                  : `/blog/${project.slug}`;
              }

              return (
                <BlurFade
                  key={project.title} // Unique key for the list item
                  delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                >
                  <ProjectCard
                    // No key prop here as BlurFade has it
                    href={cardMainLink} // Main link for the card
                    title={project.title}
                    description={project.description}
                    dates={project.dates}
                    tags={project.technologies}
                    image={project.image}
                    video={project.video}
                    links={project.links} // Pass the links array for footer buttons
                    printLink={cardPrintLink} // Pass the determined print link
                  />
                </BlurFade>
              );
            })}
          </div>
          {/* Client Logos Carousel */}
          <BlurFade delay={BLUR_FADE_DELAY * 12.5}>
            <ClientLogos />
          </BlurFade>
        </div>
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full mt-0 mb-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat or work together? Send me a {" "}
                <Link href="#contact-form" className="text-blue-500 hover:underline">
                  message
                </Link>{" "}
                or book a free call:
              </p>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 17}>
            <div className="flex justify-center"> {/* ADDED: flex justify-center wrapper */}
              <Link
                href="#" // Replace with your actual scheduling link
                className="flex items-center justify-center rounded-full bg-red-400 text-white px-4 py-2 font-semibold hover:bg-red-300 transition-colors duration-200" // REMOVED: mx-auto
              >
                <Phone className="size-5 mr-2" /> {/* Phone Icon */}
                Book a Call
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="training">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Training</h2>
          </BlurFade>
          {DATA.training.map((training, id) => (
            <BlurFade
              key={training.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={training.company}
                logoUrl={training.logoUrl}
                altText={training.company}
                title={training.company}
                subtitle={training.title}
                href={training.href}
                badges={training.badges}
                period={`${training.start} - ${training.end ?? "Present"}`}
                description={training.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="hackathons">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Hackathons
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  I like building things
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  During my time in university, I attended{" "}
                  {DATA.work.length}+ hackathons. People from around the
                  country would come together and build incredible things in 2-3
                  days. It was eye-opening to see the endless possibilities
                  brought to life by a group of motivated and passionate
                  individuals.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.work.map((project, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <HackathonCard
                    title={project.title}
                    company={project.company}
                    description={project.description}
                    location={project.location}
                    dates={project.dates}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>
      <section id="contact-form">
        <div className="space-y-12 w-full py-12 px-4 md:px-6">
          <BlurFade delay={BLUR_FADE_DELAY * 18}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact Me
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Send me a message
              </h2>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 19}>
            <ContactForm />
          </BlurFade>
        </div>
      </section>
    </main>
  );
}

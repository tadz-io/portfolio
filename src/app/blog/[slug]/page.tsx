import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { getPost, PostMetadata } from "@/data/blog"; // Import PostMetadata type
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import Image from "next/image"; // Import Next.js Image component
import { Badge } from "@/components/ui/badge";

const BLUR_FADE_DELAY = 0.04;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const metadata = post.metadata as PostMetadata; // Cast to ensure type

  return {
    title: metadata.title,
    description: metadata.summary || "A blog post.",
    openGraph: {
      title: metadata.title,
      description: metadata.summary || "A blog post.",
      type: "article",
      publishedTime: metadata.publishedAt,
      url: `/blog/${params.slug}`,
      images: metadata.projectImage ? [{ url: metadata.projectImage }] : (metadata.image ? [{ url: metadata.image }] : []),
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.summary || "A blog post.",
      images: metadata.projectImage ? [metadata.projectImage] : (metadata.image ? [metadata.image] : []),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const metadata = post.metadata as PostMetadata; // Cast to ensure type

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 px-4 md:px-0"> {/* Added padding for smaller screens */}
      <section id="post-header" className="pt-8 md:pt-2">
        <div className="space-y-4 text-center md:text-left"> {/* Increased space-y for visual separation */}
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl"
            yOffset={8}
            text={metadata.title}
          />

          {/* Section for Project Image or Video */}
          {(metadata.projectImage || metadata.projectVideo) && (
            <BlurFade 
              delay={BLUR_FADE_DELAY * 2}
              className="pt-2 -mx-4 md:mx-0" 
            >
              {metadata.projectVideo && (
                <video
                  src={metadata.projectVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-lg object-cover shadow-lg" 
                />
              )}
              {metadata.projectImage && !metadata.projectVideo && (
                <div className="w-full rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={metadata.projectImage}
                    alt={metadata.title} 
                    width={1200} 
                    height={675} 
                    layout="responsive" 
                    className="object-cover" 
                  />
                </div>
              )}
            </BlurFade>
          )}

          <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
            <div className="text-sm text-muted-foreground space-y-2 pt-2">
              {(metadata.client || metadata.services) && (
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1"> {/* Use gap-x for horizontal spacing, gap-y for wrap */}
                  {metadata.client && (
                    <div className="flex items-center">
                      <strong className="font-semibold mr-1.5">Client:</strong> {/* Reduced mr for tighter label */}
                      <span>{metadata.client}</span>
                    </div>
                  )}
                  {metadata.services && (
                    <div className="flex items-center">
                      <strong className="font-semibold mr-1.5">Services:</strong> {/* Reduced mr for tighter label */}
                      <span>{metadata.services}</span>
                    </div>
                  )}
                </div>
              )}
              {metadata.stack && metadata.stack.length > 0 && (
                <div className="flex items-start pt-1"> {/* Added pt-1 for slight separation if client/services wrapped */}
                  <strong className="font-semibold mr-2 mt-0.5">Stack:</strong>
                  <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                    {metadata.stack.map((tech) => {
                      return (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="px-1.5 py-0.5 text-[10px]"
                        >
                          {tech}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Section for Post Summary - ADDED HERE */}
      {metadata.summary && (
        <section id="post-summary" className="pt-2"> {/* Adjusted padding/margin as needed */}
          <BlurFade delay={BLUR_FADE_DELAY * 2.75}> {/* Adjusted delay */}
            <p className="text-muted-foreground text-xl/relaxed text-pretty text-center md:text-left">
              {metadata.summary}
            </p>
          </BlurFade>
        </section>
      )}

      <section id="post-content">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <article
            className="px-8 prose text-pretty font-sans text-md text-muted-foreground dark:prose-invert mx-auto" 
            dangerouslySetInnerHTML={{ __html: post.source }}
          />
        </BlurFade>
      </section>
    </main>
  );
}



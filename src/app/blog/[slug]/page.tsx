import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { getPost, PostMetadata } from "@/data/blog"; // Import PostMetadata type
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import Image from "next/image"; // Import Next.js Image component

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
      <section id="post-header" className="pt-8 md:pt-12">
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
              className="-mx-4 md:mx-0" 
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
            <time className="text-sm text-muted-foreground">
              Published on {formatDate(metadata.publishedAt)}
            </time>
          </BlurFade>
        </div>
      </section>

      {/* Section for Post Summary - ADDED HERE */}
      {metadata.summary && (
        <section id="post-summary" className="pt-2"> {/* Adjusted padding/margin as needed */}
          <BlurFade delay={BLUR_FADE_DELAY * 2.75}> {/* Adjusted delay */}
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed text-pretty text-center md:text-left">
              {metadata.summary}
            </p>
          </BlurFade>
        </section>
      )}

      <section id="post-content">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <article
            className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert lg:prose-lg xl:prose-xl mx-auto" 
            dangerouslySetInnerHTML={{ __html: post.source }}
          />
        </BlurFade>
      </section>
    </main>
  );
}



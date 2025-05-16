import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { getPost } from "@/data/blog"; // Adjust path if necessary
import { formatDate } from "@/lib/utils"; // Adjust path if necessary
import { notFound } from "next/navigation";

const BLUR_FADE_DELAY = 0.04; // Consistent with your main page

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
  return {
    title: post.metadata.title,
    description: post.metadata.summary || "A blog post by Tadzio.", // Fallback description
    openGraph: {
        title: post.metadata.title,
        description: post.metadata.summary || "A blog post by Tadzio.",
        type: 'article',
        publishedTime: post.metadata.publishedAt,
        url: `/blog/${params.slug}`, // Construct the canonical URL
        // Add images if available in metadata: images: [{ url: post.metadata.image }]
    },
    twitter: {
        card: "summary_large_image",
        title: post.metadata.title,
        description: post.metadata.summary || "A blog post by Tadzio.",
        // Add images if available: images: [post.metadata.image],
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
  const post = await getPost(params.slug); // Ensure this returns { source (HTML string), metadata: { title, publishedAt, summary? } }

  if (!post) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="post-header" className="pt-8 md:pt-12">
        <div className="space-y-2">
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl"
            yOffset={8}
            text={post.metadata.title}
          />
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <time className="text-sm text-muted-foreground">
              Published on {formatDate(post.metadata.publishedAt)}
            </time>
          </BlurFade>
        </div>
      </section>

      <section id="post-content">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <article
            className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.source }} // Assumes post.source is pre-rendered HTML
          />
        </BlurFade>
      </section>
    </main>
  );
}

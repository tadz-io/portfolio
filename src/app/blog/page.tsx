import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { getBlogPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export const metadata = {
  title: "Blog",
  description: "My thoughts, stories, and insights on technology and development.",
};

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="blog-header" className="pt-8 md:pt-12">
        <div className="space-y-2">
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl"
            yOffset={8}
            text="My Blog"
          />
          <BlurFadeText
            className="max-w-[600px] text-muted-foreground md:text-lg"
            delay={BLUR_FADE_DELAY * 2}
            text="Welcome to my personal blog. Here I share my thoughts, stories, and ideas on software development, technology, and more."
          />
        </div>
      </section>

      <section id="blog-post-list">
        <div className="space-y-6">
          {posts && posts.length > 0 ? (
            posts
              .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
              .map((post, id) => (
                <BlurFade
                  key={post.slug}
                  delay={BLUR_FADE_DELAY * 3 + id * 0.05}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block p-4 sm:p-6 border rounded-lg transition-colors duration-150 ease-in-out hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <article className="space-y-1">
                      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                        {post.metadata.title}
                      </h2>
                      <time className="text-sm text-muted-foreground">
                        {formatDate(post.metadata.publishedAt)}
                      </time>
                      {post.metadata.summary && (
                        <p className="text-sm text-muted-foreground text-pretty leading-relaxed pt-1">
                          {post.metadata.summary}
                        </p>
                      )}
                    </article>
                  </Link>
                </BlurFade>
              ))
          ) : (
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <p className="text-center text-muted-foreground">
                No posts published yet. Check back soon!
              </p>
            </BlurFade>
          )}
        </div>
      </section>
    </main>
  );
}

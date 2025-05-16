import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href: string; // This is the main link for the card (image/video/title), determined by the parent page
  description: string;
  dates: string;
  tags: readonly string[];
  printLink?: string; // For the print-visible link (previously `link`)
  image?: string;
  video?: string;
  links?: readonly { // For the footer buttons
    icon?: React.ReactNode;
    type: string;    // Text for the button
    href?: string;    // URL for this specific button, OR
    slug?: string;    // Slug for this specific button (links to /blog/slug)
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href, // Main link for the card, determined by parent
  description,
  dates,
  tags,
  printLink, // Use new prop name for clarity
  image,
  video,
  links, // This is for footer buttons
  className,
}: Props) {
  return (
    <Card
      className={
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full"
      }
    >
      <Link
        href={href} // Main card link (image/video area)
        className={cn("block cursor-pointer", className)}
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
          />
        )}
        {image && !video && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-40 w-full overflow-hidden object-cover object-top"
          />
        )}
      </Link>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">
            <Link href={href}>{title}</Link> {/* Title also uses the main card link */}
          </CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {printLink?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2 pt-1">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links.map((itemLink, idx) => {
              let determinedHref: string;
              let determinedTarget: string = "_blank"; // Default to new tab for external links

              if (itemLink.slug) {
                determinedHref = `/blog/${itemLink.slug}`;
                determinedTarget = "_self"; // Internal blog link
              } else if (itemLink.href) {
                determinedHref = itemLink.href;
                // Check if it's an internal site link (starts with / or #)
                if (determinedHref.startsWith("/") || determinedHref.startsWith("#")) {
                  determinedTarget = "_self";
                }
                // Else, it's external, target remains "_blank"
              } else {
                // Fallback if neither slug nor href is provided for a button link
                // You might want to not render the button or log an error
                determinedHref = "#";
                determinedTarget = "_self";
              }

              return (
                <Link href={determinedHref} key={idx} target={determinedTarget} rel="noopener noreferrer">
                  <Badge className="flex gap-2 px-2 py-1 text-[10px] items-center">
                    {itemLink.icon}
                    {itemLink.type} {/* This is now just the button text */}
                  </Badge>
                </Link>
              );
            })}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

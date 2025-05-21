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
import { Icons } from "@/components/icons";

interface Props {
  title: string;
  href: string; 
  description: string;
  type: string;
  dates: string;
  tags: readonly string[];
  printLink?: string; // For the print-visible link (previously `link`)
  image?: string;
  video?: string;
  links?: readonly { // For the footer buttons
    icon?: React.ReactNode;
    type: string;    // Text for the button
    href?: string;    // URL for this specific button, OR
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  type,
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
        href={href}
        className={cn("block cursor-pointer", className)}
        target={href.startsWith("/") || href.startsWith("#") ? "_self" : "_blank"}
        rel={href.startsWith("/") || href.startsWith("#") ? "" : "noopener noreferrer"}
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
            className="h-40 w-full overflow-hidden object-cover object-center"
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
        <div className="flex flex-row flex-wrap items-start gap-1">
          {/* Primary Button */}
          <Link 
            href={href} 
            target={href.startsWith("/") || href.startsWith("#") ? "_self" : "_blank"}
            rel={href.startsWith("/") || href.startsWith("#") ? "" : "noopener noreferrer"}
          >
            <Badge className="flex gap-2 px-2 py-1 text-[10px] items-center">
              <Icons.globe className="size-3"/>
              {type} {/* Use the new top-level 'type' prop for button text */}
            </Badge>
          </Link>

          {/* Additional Buttons from links array */}
          {links && links.length > 0 && (
            links.map((itemLink, idx) => {
              return itemLink.href ? (
                <Link href={itemLink.href} key={idx} target="_blank">
                  <Badge className="flex gap-2 px-2 py-1 text-[10px] items-center">
                    {itemLink.icon}
                    {itemLink.type} {/* This is the button text from the links array item */}
                  </Badge>
                </Link>
              ) : null;
            })
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

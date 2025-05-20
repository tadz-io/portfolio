import Image from "next/image";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

interface Client {
  name: string;
  logoUrl: string;
}

export function ClientLogos() {
  // Ensure DATA.clients exists and is an array before trying to access it
  const clients = DATA.clients && Array.isArray(DATA.clients) ? DATA.clients : [];

  if (!clients.length) {
    return null;
  }

  // Duplicate clients for a seamless scrolling effect, especially if the list is short
  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <div className="py-2 group">
      <h3 className="text-xl font-bold text-center mb-8">Collaborated with</h3>
      <div className="w-full overflow-hidden">
        <div className="flex animate-scroll group-hover:pause-animation">
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 mx-6 h-20 w-36 relative flex items-center justify-center"
              title={client.name}
            >
              <Image
                src={client.logoUrl}
                alt={client.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optional: for performance
                style={{ objectFit: "contain" }}
                className="grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


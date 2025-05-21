import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Tadzio",
  initials: "",
  url: "https://github.com/tadz-io",
  location: "Ericeira, Portugal",
  locationLink: "",
  description:
    "Geospatial Data Scientist with 8+ years of experience, passionate about leveraging remote sensing technology to address planetary challenges",
  summary:
    "I have a broad interest in the application of geospatial and remote sensing technologies to address environmental and societal challenges at scale. My background is in Remote Sensing & Oceanography, but since then I have branched out into data science, geospatial analysis, and software development. I’m particularly excited by the convergence of physics-based simulations (especially radiative transfer), remote sensing and machine learning. Take a look at my portfolio, and if you’d like to collaborate, please don’t hesitate to get in touch!",
  avatarUrl: "",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "Go",
    "Postgres",
    "Docker",
    "Kubernetes",
    "Java",
    "C++",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/tadz-io",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/tadzio-holtrop-659856115/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "",
        icon: Icons.x,

        navbar: false,
      },
      Youtube: {
        name: "Youtube",
        url: "",
        icon: Icons.youtube,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  training: [
    {
      company: "Planblue GmbH",
      href: "https://www.planblue.com",
      badges: [],
      location: "Remote",
      title: "Data Scientist & Geospatial consultant",
      logoUrl: "/planblue-work.png",
      start: "Feb 2024",
      end: "Apr 2025",
      description:
        `• Implemented automated validation workflows and quality control for raw sensor data and end-user data products.
        
        • Specified requirements and implemented solutions for geospatial data processing and storage using Xarray and Zarr.

        • Delivered analysis-ready geospatial data products as GIS compatible raster files
        `,
    },
    {
      company: "Planblue GmbH",
      href: "https://www.planblue.com",
      badges: [],
      location: "Remote",
      title: "Senior Data Scientist",
      logoUrl: "/planblue-work.png",
      start: "Jun 2022",
      end: "Jan 2024",
      description:
        `• Led the design and development of processing pipelines for hyperspectral imagery, transforming raw data into analysis-ready products
        
        • Spearheaded the acquisition of a new optical sensor, enabling our imaging system to derive precise spectral reflectance measurements

        • Designed and conducted calibration and validation experiments to ensure accuracy and reliability of hyperspectral measurements

        • Interfacing between data science, engineering and business teams
        `,
    },
    {
      company: "Nvidia",
      href: "https://nvidia.com/",
      badges: [],
      location: "Santa Clara, CA",
      title: "Software Engineer",
      logoUrl: "/nvidia.png",
      start: "January 2020",
      end: "April 2020",
      description:
        "Architected and wrote the entire MVP of the GeForce Now Cloud Gaming internal admin and A/B testing dashboard using React, Redux, TypeScript, and Python.",
    },
    {
      company: "Splunk",
      href: "https://splunk.com",
      badges: [],
      location: "San Jose, CA",
      title: "Software Engineer",
      logoUrl: "/splunk.svg",
      start: "January 2019",
      end: "April 2019",
      description:
        "Co-developed a prototype iOS app with another intern in Swift for the new Splunk Phantom security orchestration product (later publicly demoed and launched at .conf annual conference in Las Vegas). Implemented a realtime service for the iOS app in Django (Python) and C++; serialized data using protobufs transmitted over gRPC resulting in an approximate 500% increase in data throughput.",
    },
    {
      company: "Lime",
      href: "https://li.me/",
      badges: [],
      location: "San Francisco, CA",
      title: "Software Engineer",
      logoUrl: "/lime.svg",
      start: "January 2018",
      end: "April 2018",
      description:
        "Proposed and implemented an internal ruby API for sending/receiving commands to scooters over LTE networks. Developed a fully automated bike firmware update system to handle asynchronous firmware updates of over 100,000+ scooters worldwide, and provide progress reports in real-time using React, Ruby on Rails, PostgreSQL and AWS EC2 saving hundreds of developer hours.",
    },
    {
      company: "Mitre Media",
      href: "https://mitremedia.com/",
      badges: [],
      location: "Toronto, ON",
      title: "Software Engineer",
      logoUrl: "/mitremedia.png",
      start: "May 2017",
      end: "August 2017",
      description:
        "Designed and implemented a robust password encryption and browser cookie storage system in Ruby on Rails. Leveraged the Yahoo finance API to develop the dividend.com equity screener",
    },
  ],
  education: [
    {
      school: "University of Amsterdam",
      href: "",
      degree: "MSc. Oceanography",
      logoUrl: "/uva-work.jpg",
      start: "2013",
      end: "2016",
    },
    {
      school: "University of Queensland",
      href: "",
      degree: "MSc. Internship",
      logoUrl: "/uq-edu.jpg",
      start: "2015",
      end: "2015",
    },
    {
      school: "University of Amsterdam",
      href: "",
      degree: "BSc. Neuroscience",
      logoUrl: "/uva-work.jpg",
      start: "2006",
      end: "2009",
    },
    {
      school: "Technical University Twente",
      href: "",
      degree: "Applied Physics",
      logoUrl: "/utwente-edu.jpg",
      start: "2005",
      end: "2006",
    },
  ],
  projects: [
    {
      title: "Advancing water quality monitoring from space",
      active: true,
      dates: "",
      slug: "hello-world",
      description:
        "...",
      technologies: [
        "Python",
        "Lmfit",
        "Scikit-learn",
        "Xarray",
        "Pandas",
        "Docker",
      ],
      links: [
        {
          type: "Case study",
          slug: "hello-world",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "https://deims.org/sites/default/files/styles/full_size/public/photos/lake-stechlin-germany_6405.jpg",
      video: "",
    },
    {
      title: "Underwater hyperspectral imaging",
      active: true,
      dates: "",
      description:
        "Designed, developed and sold animated UI components for developers.",
      technologies: [
        "Python",
        "Rasterio",
        "Pytorch",
        "Xarray",
        "Scikit-learn",
        "Dask",
        "Kedro",
        "Docker",
        "AWS",
        "Airflow",
      ],
      links: [
        {
          type: "Website",
          href: "https://ihr.iho.int/articles/closing-the-data-gap-automated-seafloor-health-maps-to-accelerate-nature-based-solutions/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/images/planblue-hsi.jpg",
      video: "",
    },
    {
      title: "Physics-based inverse modelling of multi- and hyperspectral observations",
      active: true,
      dates: "",
      description:
        "HYDROPT, open source, ocean color,...",
      technologies: [
        "Python",
        "Lmfit",
        "JAX",
        "Scikit-learn",
        "Xarray",
        "Pandas",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.mdpi.com/2072-4292/13/15/3006",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/tadz-io/hydropt",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/images/hydropt.jpg",
      video: "",
    },
    {
      title: "Hyperspectral image processing at scale",
      active: true,
      dates: "",
      description:
        "Hyperspectral imagery, radiometric & geometric image calibration, reflectance, band models",
      technologies: [
        "Python",
        "Rasterio",
        "Xarray",
        "Scikit-learn",
        "Dask",
        "Kedro",
        "Zarr", 
        "Docker",
        "AWS",
        "Airflow",
        "Terraform"
      ],
      links: [
        {
          type: "Case study",
          slug: "hello-world",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/images/hyperspectral-stack.png",
      video: "",
    },
  ],
  clients: [
    { name: "University of Amsterdam", logoUrl: "/uva-dark.png" },
    { name: "SCRIPPS", logoUrl: "/scripps-dark.png" },
    { name: "planblue", logoUrl: "/planblue.svg" },
    { name: "University of Queensland", logoUrl: "/uq-dark.png" },
    { name: "Gybe Inc.", logoUrl: "/gybe-dark.png" },
    { name: "Global Change Institute", logoUrl: "/gci-dark.png" },
    { name: "Vrije Universiteit Amsterdam", logoUrl: "/vu-dark.png" },

  ],
  work: [
    {
      title: "Data Scientist & Geospatial Consultant",
      company: "Planblue GmbH",
      dates: "Feb 2024 - Apr 2025",
      location: "🇩🇪 Bremen, Germany",
      description:
        `• Implemented automated validation workflows and quality control for raw sensor data and end-user data products.
        
        • Specified requirements and implemented solutions for geospatial data processing and storage using Xarray and Zarr.

        • Delivered analysis-ready geospatial data products as GIS compatible raster files
        `,
      image:
        "/planblue-work.png",
      mlh: "",
      links: [],
    },
    {
      title: "Senior Data Scientist",
      company: "Planblue GmbH",
      dates: "Jun 2022 - Jan 2024",
      location: "🇩🇪 Bremen, Germany",
      description:
        `• Led the design and development of processing pipelines for hyperspectral imagery, transforming raw data into analysis-ready products
        
        • Spearheaded the acquisition of a new optical sensor, enabling our imaging system to derive spectral reflectance measurements

        • Designed and conducted calibration and validation experiments to ensure accuracy and reliability of hyperspectral measurements

        • Interfacing between data science, engineering and business teams
        `,
      image: "",
      mlh: "",
      links: [],
    },
    {
      title: "Remote Sensing Consultant",
      company: "Gybe (Flying Gybe Inc.)",
      dates: "Nov 2021 - Mar 2022",
      location: "🇺🇸 Portland, Oregon, United States",
      description:
      `• Implementation of a physics based retrieval framework (HYDROPT) for the retrieval of water-quality parameters. 

      • Implement the HYDROPT framework in a Docker container to scale and optimize processing of Sentinel-2 imagery in the cloud.

      • Validation of water quality retrievals for lakes and rivers in the US and Germany against in-situ measurements.
      `,
      image:
        "/gybe-work.png",
      links: []
    },
    {
      title: "PhD Remote Sensing & Oceanography",
      company: "Vrije Universiteit Amsterdam",
      dates: "Oct 2016 - Feb 2021",
      location: "🇳🇱 Amsterdam, The Netherlands",
      description:
      `• Developed and validated a physics-based inversion framework for multi- and hyperspectral sensors (HYDROPT)

      • Developed processing pipelines for hyperspectral radiative transfer simulations

      • Published research and presented at international conferences.
      `,
      image:
        "/vu-work.jpg",
      links: [
        {
          title: "Hydropt",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/tadz-io/hydropt",
        },
        {
          title: "Ocean Sciences 2020",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://agu.confex.com/agu/osm20/meetingapp.cgi/Paper/651689",
        },
        {
          title: "EARSeL Imaging Spectroscopy",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://is.earsel.org/workshop/12-IS-Potsdam2022/",
        },
      ],
    },
    {
      title: "Guest Researcher",
      company: "University of Amsterdam",
      dates: "Oct 2016 - Feb 2021",
      location: "🇳🇱 Amsterdam, The Netherlands",
      description:
      `• PhD guest researcher conducting research on in-water radiative transfer and bio-optical models
      `,
      image:
        "/uva-work.jpg",
      links: [],
    },
    {
      title: "Visiting Research Scientist",
      company: "Scripps Institution of Oceanography",
      dates: "Mar 2020 - Jun 2020",
      location: "🇺🇸 La Jolla Shores, California, United States",
      description:
      `• On-going development of a physics based retrieval algorithm for satellite ocean color applications
      `,
      image:
        "/scripps-work.png",
      links: [],
    },
  ],
} as const;

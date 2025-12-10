// --- Project Interfaces ---
export interface BaseProject {
  id: string;
  title: string;
  description: string;
  location: string;
  client: string;
  date: string;
  status: string;
  category: string;
  tags: string[];
  image: string;
}

// Type for the Strapi Rich Text field (array of blocks)
export type StrapiContentBlock = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}[];

// ProjectDetail extends BaseProject for the single view
export interface ProjectDetail extends BaseProject {
  fullDescription: StrapiContentBlock;
  contractValue?: string;
  startingPoint?: string;
  endingPoint?: string;
  gridImages?: string[];
}

// --- Team Member Interface (Included for completeness) ---
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  qualification: string;
  experience: string;
  profilePicture: string;
  sortOrder: number;
}


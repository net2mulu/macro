// lib/interfaces.ts

// --- 1. Strapi Helper Types (for Rich Text) ---

/**
 * Type for the Strapi Rich Text field (array of Lexical blocks).
 * Used for fields like 'fullDescription'.
 */
export type StrapiContentBlock = {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }[];
  
  
  // --- 2. Category Interface (The missing piece) ---
  
  /**
   * Defines the structure of the category objects retrieved from Strapi.
   * This object is mapped in useMemo to extract the 'name' string.
   */
  export interface Category {
    id: string | number;
    name: string; // The category string needed for filtering
    documentId?: string; 
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  }
  
  
  // --- 3. Project Interfaces ---
  
  /**
   * Defines the core properties for a project, used primarily in project lists and cards.
   */
  export interface BaseProject {
    id: string | number;
    slug: string;
    title: string;
    description: string; // Short summary
    location: string;
    client: string;
    date: string;
    status: string;
    category: string; // This is the string name of the category (e.g., 'Residential')
    tags: string[];
    image: string; // URL for the main image/thumbnail
  }
  
  /**
   * ProjectDetail extends BaseProject for the single view.
   */
  export interface ProjectDetail extends BaseProject {
    fullDescription: StrapiContentBlock; // The rich text content
    contractValue?: string;
    startingPoint?: string;
    endingPoint?: string;
    gridImages?: string[]; // Array of image URLs for the detail gallery
  }
  
  
  // --- 4. Team Member Interface (Included for completeness) ---
  
  /**
   * Defines the structure for a team member object.
   */
  export interface TeamMember {
    id: string | number;
    name: string;
    position: string;
    qualification: string;
    experience: string;
    profilePicture: string; // URL for the profile image
    sortOrder: number;
  }
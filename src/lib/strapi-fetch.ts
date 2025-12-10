




// lib/strapi-fetch.ts

import { BaseProject, ProjectDetail, TeamMember, StrapiContentBlock } from './interfaces';

// --- CONFIGURATION ---
// Ensure this environment variable is set correctly in your .env.local file
const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// --- UTILITY TYPES ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StrapiDataItem<T> = {
    id: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attributes: Record<string, any>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StrapiListResponse<T> = { data: StrapiDataItem<T>[] };

// --- CORE UTILITY FUNCTION (Handles Fetching & Errors) ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchStrapiData(path: string): Promise<any> {
    // This correctly handles the API path concatenation
    const fullUrl = `${API_URL}${path}`;

    const headers = {
        'Content-Type': 'application/json',
    };

    const response = await fetch(fullUrl, {
        method: 'GET',
        headers: headers,
        cache: 'no-store'
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Strapi API Error: ${response.status} ${response.statusText}`, errorBody);
        // Throwing the error is what React Query catches to display the "Error Loading Team Data" message
        throw new Error(`Failed to fetch from Strapi: ${response.statusText}. Check API URL: ${fullUrl}`); 
    }

    return response.json();
}

// Helper to get the full image URL
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getImageUrl = (mediaData: any): string => {
    const url = mediaData?.data?.attributes?.url || mediaData?.url;
    // Ensure the resulting URL is absolute
    return url ? (url.startsWith('http') ? url : `${API_URL}${url}`) : '/placeholder.png';
};


// --- Data Mappers ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStrapiToProject = (item: StrapiDataItem<any>): BaseProject | ProjectDetail => {
    // ... (Project mapping logic remains unchanged) ...
    const attr = item.attributes;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mappedTags = attr.tags?.data?.map((tag: any) => tag.attributes.name) || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mappedGridImages = attr.gridImage?.map((img: any) => getImageUrl(img)) || [];

    const baseData: BaseProject = {
        id: attr.slug || item.id.toString(), 
        title: attr.title,
        description: attr.description,
        location: attr.location,
        client: attr.client,
        status: attr.projectStatus?.trim() || 'N/A', 
        date: attr.date,
        category: attr.category?.data?.attributes?.name || attr.category?.name || 'N/A',
        tags: mappedTags, 
        image: getImageUrl(attr.mainImage), 
    };

    const detailData: ProjectDetail = {
        ...baseData,
        fullDescription: attr.fullDescription as StrapiContentBlock,
        contractValue: attr.contractValue,
        startingPoint: attr.startingPoint,
        endingPoint: attr.endingPoint,
        gridImages: mappedGridImages,
    };
    
    return detailData; 
};


// Map Strapi team member to frontend shape
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 




// lib/strapi-fetch.ts

// lib/strapi-fetch.ts - TEMPORARY DEBUGGING VERSION

const mapStrapiToTeamMember = (item: StrapiDataItem<any>): TeamMember => {
  const attr = item.attributes || {};
  
  console.log("Strapi Attributes:", attr); // <-- ADD THIS DEBUG LINE

  return {
      id: attr.slug || item.id.toString(),
      name: attr.name || 'Unknown', 
      position: attr.position || 'Unknown Position',
      qualification: attr.qualification || 'Unknown Qualification',
      experience: attr.experience || 'Unknown Experience',
      profilePicture: getImageUrl(attr.profilePicture),
      sortOrder: typeof attr.sortOrder === 'number' ? attr.sortOrder : 0,
  };
};

// --- EXPORTED FETCHING FUNCTIONS ---

export const fetchAllProjects = async (): Promise<BaseProject[]> => {
    const populate = 'populate[0]=category&populate[1]=tags&populate[2]=mainImage';
    const path = `/api/projects?${populate}`;

    const json: StrapiListResponse<BaseProject> = await fetchStrapiData(path);

    return json.data ? (json.data.map(mapStrapiToProject) as BaseProject[]) : [];
};

export const fetchProjectDetail = async (slug: string): Promise<ProjectDetail | null> => {
    const populate = 'populate[0]=category&populate[1]=tags&populate[2]=mainImage&populate[3]=gridImage';
    const path = `/api/projects?filters[slug][$eq]=${slug}&${populate}`;

    const json: StrapiListResponse<ProjectDetail> = await fetchStrapiData(path);

    if (!json.data || json.data.length === 0) {
        return null;
    }

    return mapStrapiToProject(json.data[0] as StrapiDataItem<ProjectDetail>) as ProjectDetail;
};

/**
 * Fetches all team members.
 * FIX: Removed the invalid 'sort=sortOrder:asc' parameter to avoid the 400 error.
 */
export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
    // ONLY populate the profile picture; removed the sort parameter.
    const populate = 'populate[0]=profilePicture'; 
    const path = `/api/team-members?${populate}`; 

    const json: StrapiListResponse<TeamMember> = await fetchStrapiData(path);
    
    return json.data ? (json.data.map(mapStrapiToTeamMember) as TeamMember[]) : [];
};
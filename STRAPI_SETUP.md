# Strapi Integration Setup Guide

This project is configured to fetch projects data from Strapi CMS using React Query.

## Prerequisites

1. A running Strapi instance with a `projects` content type
2. The projects content type should have the following fields:
   - `title` (Text)
   - `description` (Text)
   - `fullDescription` (Text, optional)
   - `location` (Text)
   - `client` (Text)
   - `date` (Text)
   - `tags` (JSON or Text, optional)
   - `category` (Text)
   - `image` (Media - Single)
   - `status` (Text)
   - `startingPoint` (Text, optional)
   - `endingPoint` (Text, optional)
   - `gridImages` (Media - Multiple, optional)
   - `slug` (UID - unique identifier)
   - `contract` (Text, optional)

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
# Your Strapi API URL (without trailing slash)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# Optional: Strapi API Token for authenticated requests
# Leave empty if your Strapi API is public
NEXT_PUBLIC_STRAPI_API_TOKEN=your_api_token_here
```

## Strapi Content Type Setup

1. In your Strapi admin panel, create a content type called `projects`
2. Add the fields mentioned above
3. Make sure to set the `slug` field as a UID type and configure it to auto-generate from the `title` field
4. In Settings > Users & Permissions Plugin > Roles > Public, enable `find` and `findOne` for the `projects` content type (or use an API token)

## API Endpoints

The integration uses the following Strapi API endpoints:

- `GET /api/projects?populate=*&sort=createdAt:desc` - Fetch all projects
- `GET /api/projects?filters[slug][$eq]={slug}&populate=*` - Fetch a single project by slug

## Usage

The projects page (`/projects`) automatically fetches data from Strapi using React Query. The data is cached for 5 minutes and refetched as needed.

### Components

- `useProjects()` - Hook to fetch all projects
- `useProjectBySlug(slug)` - Hook to fetch a single project by slug

### Example

```tsx
import { useProjects } from '@/hooks/useProjects'

function MyComponent() {
  const { data: projects, isLoading, error } = useProjects()
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      {projects?.map(project => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  )
}
```

## Troubleshooting

1. **Projects not loading**: Check that your Strapi URL is correct in `.env.local`
2. **401 Unauthorized**: Make sure the `projects` content type is public or you've set a valid API token
3. **Images not showing**: Ensure images are uploaded in Strapi and the `populate=*` parameter is included in the API call
4. **CORS errors**: Configure CORS in your Strapi `config/middlewares.js` to allow requests from your Next.js app URL


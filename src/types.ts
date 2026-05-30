/**
 * Sarthak Portfolio Type Declarations
 */

export interface Project {
  id: string;
  title: string;
  tagline: string;
  stack: string[];
  category: string[];
  year: string;
  featured: boolean;
  thumbnail: string;
  overview: string;
  problem: string;
  architecture: string[];
  features: string[];
  status: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
  type: 'origin' | 'milestone' | 'education' | 'leadership' | 'project' | 'work' | 'award' | 'creative' | 'current';
}

export interface Artwork {
  id: string;
  title: string;
  medium: string;
  description: string;
  category: 'sculpture' | 'painting' | 'sketch' | 'uiux';
  filePath: string;
  recognition?: string;
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number }[];
}

import { useState, useMemo } from 'react';
import { Filter, Grid, List, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectCard } from '@/components/ProjectCard';
import projectsData from '@/data/projects.json';
const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get unique categories
  const categories = ['All', ...new Set(projectsData.map(project => project.category))];

  // Filter projects based on search query and category
  const filteredProjects = useMemo(() => {
    let filtered = projectsData;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(project => project.title.toLowerCase().includes(searchQuery.toLowerCase()) || project.description.toLowerCase().includes(searchQuery.toLowerCase()) || project.category.toLowerCase().includes(searchQuery.toLowerCase()) || project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())));
    }
    return filtered;
  }, [searchQuery, selectedCategory]);
  return <div className="min-h-screen bg-background">
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            All Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore my complete portfolio of web development, mobile apps, and digital solutions.
          </p>
        </div>

        {/* Filters and Controls */}
        

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8">
          
          
          {(searchQuery || selectedCategory !== 'All') && <Button variant="ghost" size="sm" onClick={() => {
          setSearchQuery('');
          setSelectedCategory('All');
        }} className="text-muted-foreground hover:text-primary">
              Clear Filters
            </Button>}
        </div>

        {/* Projects Grid/List */}
        {filteredProjects.length > 0 ? <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-8"}>
            {filteredProjects.map(project => <ProjectCard key={project.id} project={project} />)}
          </div> : <div className="text-center py-16">
            <div className="text-muted-foreground mb-4">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No projects found matching your criteria.</p>
              <p className="text-sm">Try adjusting your search or filter options.</p>
            </div>
            <Button variant="outline" onClick={() => {
          setSearchQuery('');
          setSelectedCategory('All');
        }} className="mt-4">
              Clear All Filters
            </Button>
          </div>}
      </div>

      <Footer />
    </div>;
};
export default Projects;
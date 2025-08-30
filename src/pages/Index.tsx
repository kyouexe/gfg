import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Zap, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectCard } from '@/components/ProjectCard';
import projectsData from '@/data/projects.json';
const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) {
      return projectsData;
    }
    return projectsData.filter(project => project.title.toLowerCase().includes(searchQuery.toLowerCase()) || project.description.toLowerCase().includes(searchQuery.toLowerCase()) || project.category.toLowerCase().includes(searchQuery.toLowerCase()) || project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [searchQuery]);
  const featuredProjects = filteredProjects.filter(project => project.featured);
  const stats = [{
    icon: Code2,
    label: 'Projects Completed',
    value: '50+'
  }, {
    icon: Users,
    label: 'Happy Clients',
    value: '30+'
  }, {
    icon: Star,
    label: 'GitHub Stars',
    value: '2.5K+'
  }, {
    icon: Zap,
    label: 'Lines of Code',
    value: '100K+'
  }];
  return <div className="min-h-screen bg-background">
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      {/* Hero Section */}
      

      {/* Stats Section */}
      

      {/* Featured Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work spanning web development, mobile apps, 
              and innovative digital solutions.
            </p>
          </div>

          {/* Search Results Info */}
          {searchQuery && <div className="mb-8 text-center">
              <p className="text-muted-foreground">
                {filteredProjects.length === 0 ? `No projects found for "${searchQuery}"` : `Found ${filteredProjects.length} project${filteredProjects.length === 1 ? '' : 's'} for "${searchQuery}"`}
              </p>
            </div>}

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {(searchQuery ? filteredProjects : featuredProjects).map(project => <ProjectCard key={project.id} project={project} />)}
          </div>

          {/* Show all projects link when not searching */}
          {!searchQuery && <div className="text-center">
              <Button size="lg" variant="outline" className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300" asChild>
                <Link to="/projects">
                  View All Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>}

          {/* No results state */}
          {searchQuery && filteredProjects.length === 0 && <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Code2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No projects found matching your search.</p>
                <p className="text-sm">Try searching for different keywords or technologies.</p>
              </div>
              <Button variant="outline" onClick={() => setSearchQuery('')} className="mt-4">
                Clear Search
              </Button>
            </div>}
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;
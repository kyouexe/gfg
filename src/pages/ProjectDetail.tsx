import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, ExternalLink, Github, Star, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import projectsData from '@/data/projects.json';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Convert markdown-style content to JSX
  const renderContent = (content: string) => {
    const sections = content.split('\n\n');
    
    return sections.map((section, index) => {
      if (section.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">
            {section.replace('## ', '')}
          </h2>
        );
      } else if (section.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-foreground mt-6 mb-3">
            {section.replace('### ', '')}
          </h3>
        );
      } else if (section.startsWith('- ')) {
        const listItems = section.split('\n').filter(item => item.startsWith('- '));
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex} className="ml-4">
                {item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')}
              </li>
            ))}
          </ul>
        );
      } else {
        return (
          <p key={index} className="text-muted-foreground leading-relaxed mb-4">
            {section.replace(/\*\*(.*?)\*\*/g, '<span class="font-semibold text-foreground">$1</span>')}
          </p>
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={() => {}} searchQuery="" />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-primary">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        {/* Project Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" className="border-primary/20 text-primary">
              {project.category}
            </Badge>
            {project.featured && (
              <Badge className="bg-accent text-accent-foreground">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Featured
              </Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            {project.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(project.date)}
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2" />
              {project.technologies.length} Technologies
            </div>
          </div>

          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            {project.description}
          </p>

        </header>

        {/* Technologies Used */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-sm bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300 px-4 py-2"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        {/* Project Content */}
        <section className="prose prose-lg max-w-none">
          <div className="text-base leading-relaxed">
            {renderContent(project.content)}
          </div>
        </section>

      </article>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
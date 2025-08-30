import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  date: string;
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <h3 className="text-lg font-bold mb-2">{project.title}</h3>
      <p className="text-gray-600 mb-3">{project.description}</p>
      <div className="mb-3">
        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {project.category}
        </span>
      </div>
      <div className="mb-3">
        {project.technologies.map((tech) => (
          <span key={tech} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded mr-1">
            {tech}
          </span>
        ))}
      </div>
      <Link 
        to={`/project/${project.id}`}
        className="text-blue-600 hover:text-blue-800 underline"
      >
        Read More
      </Link>
    </div>
  );
};
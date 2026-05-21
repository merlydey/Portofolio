import React, { useEffect, useState } from "react";
import { ExternalLink, Github, RefreshCw } from "lucide-react";
import { fetchPortfolioProjects } from "@/lib/odooApi";

const normalizeTags = (value) => {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return String(value || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const normalizeProject = (project) => ({
  id: project.id,
  title: project.name || project.title || "Untitled project",
  description: project.description || "",
  imageUrl: project.image_url || project.imageUrl || "",
  tags: normalizeTags(project.tags),
  demoUrl: project.demo_url || project.demoUrl || "",
  githubUrl: project.github_url || project.githubUrl || "",
});

export const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjects = async (signal) => {
    setIsLoading(true);
    setError("");

    try {
      const data = await fetchPortfolioProjects(signal);
      setProjects(data.map(normalizeProject));
    } catch (err) {
      if (err.name === "AbortError") {
        return;
      }

      setError(err.message || "Failed to load projects from Odoo.");
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    void loadProjects(controller.signal);

    return () => controller.abort();
  }, []);

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Projects below are loaded from your Odoo backend. Manage them from the
            Odoo admin panel and they will appear here automatically.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
            <p>{error}</p>
            <button
              onClick={() => void loadProjects()}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-red-400/30 px-4 py-2 text-red-100 transition-colors hover:bg-red-500/10"
              type="button"
            >
              <RefreshCw size={14} /> Retry
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="py-12 text-center text-muted-foreground">
            Loading projects from Odoo...
          </div>
        ) : projects.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            No published projects were returned by the Odoo API yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group bg-card rounded-lg overflow-hidden shadow-xs transform transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="h-44 bg-gray-100 dark:bg-gray-800 overflow-hidden flex items-center justify-center">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-sm text-muted-foreground px-4">
                      No image
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="pr-2">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-primary/20 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 shrink-0">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open demo"
                          className="p-2 rounded-md hover:bg-primary/10"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open repository"
                          className="p-2 rounded-md hover:bg-primary/10"
                        >
                          <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

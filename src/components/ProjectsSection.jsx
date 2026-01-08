import React, { useEffect, useState } from "react";
import { ExternalLink, Github, PlusCircle, Edit2, Trash2, X } from "lucide-react";

const STORAGE_KEY = "my_projects_v1";

const defaultProjects = [
  {
    id: Date.now(),
    title: "SaaS Landing Page",
    description: "Contoh project awal",
    image: "",
    tags: ["React", "TailwindCSS"],
    demoUrl: "",
    githubUrl: "",
  },
];

const readFileAsDataURL = (file) =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = () => rej(new Error("File read error"));
    reader.readAsDataURL(file);
  });

export const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null); // project id or null
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    tags: "",
    demoUrl: "",
    githubUrl: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setProjects(stored ? JSON.parse(stored) : defaultProjects);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const openNew = () => {
    setEditing(null);
    setForm({
      title: "",
      description: "",
      image: "",
      tags: "",
      demoUrl: "",
      githubUrl: "",
    });
    setIsFormOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p.id);
    setForm({
      title: p.title,
      description: p.description,
      image: p.image || "",
      tags: (p.tags || []).join(", "),
      demoUrl: p.demoUrl || "",
      githubUrl: p.githubUrl || "",
    });
    setIsFormOpen(true);
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataURL(file);
      setForm((s) => ({ ...s, image: dataUrl }));
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      image: form.image,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      demoUrl: form.demoUrl.trim(),
      githubUrl: form.githubUrl.trim(),
    };
    if (!payload.title) return;

    if (editing) {
      setProjects((prev) => prev.map((p) => (p.id === editing ? { ...p, ...payload } : p)));
    } else {
      setProjects((prev) => [{ id: Date.now(), ...payload }, ...prev]);
    }

    setIsFormOpen(false);
    setEditing(null);
  };

  const handleDelete = (id) => {
    if (!confirm("Hapus project ini?")) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Header centered */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Manage projects below. Upload an image, set description, tags, demo and repo links.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group bg-card rounded-lg overflow-hidden shadow-xs transform transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="h-44 bg-gray-100 dark:bg-gray-800 overflow-hidden flex items-center justify-center">
                {project.image ? (
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <img src={project.image} alt={project.title + " image"} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-sm text-muted-foreground px-4">No image</div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="pr-4">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {(project.tags || []).map((t) => (
                        <span key={t} className="px-2 py-1 text-xs bg-primary/20 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 ml-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(project)}
                        className="p-2 rounded-md hover:bg-primary/10"
                        aria-label="Edit"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 rounded-md hover:bg-red-50 text-red-500"
                        aria-label="Delete"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex gap-2 mt-2">
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" title="Open demo">
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" title="Open repo">
                          <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Add Project button centered under the grid */}
        <div className="mt-8 text-center">
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 cosmic-button px-4 py-2"
            title="Add project"
          >
            <PlusCircle size={16} /> Add Project
          </button>
        </div>

        {/* Form modal/drawer */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsFormOpen(false)} />
            <div className="relative bg-card rounded-lg shadow-lg w-full max-w-2xl p-6 z-10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold">{editing ? "Edit Project" : "New Project"}</h4>
                <button onClick={() => setIsFormOpen(false)} className="p-1 rounded hover:bg-gray-200">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    className="w-full px-3 py-2 rounded border"
                    value={form.title}
                    onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    className="w-full px-3 py-2 rounded border"
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                  <input
                    className="w-full px-3 py-2 rounded border"
                    value={form.tags}
                    onChange={(e) => setForm((s) => ({ ...s, tags: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Demo URL</label>
                    <input
                      className="w-full px-3 py-2 rounded border"
                      value={form.demoUrl}
                      onChange={(e) => setForm((s) => ({ ...s, demoUrl: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Github URL</label>
                    <input
                      className="w-full px-3 py-2 rounded border"
                      value={form.githubUrl}
                      onChange={(e) => setForm((s) => ({ ...s, githubUrl: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Image (optional)</label>
                  <div className="flex items-center gap-3">
                    <input type="file" accept="image/*" onChange={handleFile} />
                    {form.image && (
                      <img src={form.image} alt="preview" className="h-12 w-20 object-cover rounded" />
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-3 py-2 rounded border">
                    Cancel
                  </button>
                  <button type="submit" className="cosmic-button px-4 py-2">
                    {editing ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
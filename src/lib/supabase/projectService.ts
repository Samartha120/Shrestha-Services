import { supabase } from "./supabaseClient";
import type { Project } from "@/types/project.types";

export const projectService = {
  getAll: async (): Promise<Project[]> => {
    const { data, error } = await supabase
      .from("projects")
      .select("id, title, slug, image, description")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  },

  getBySlug: async (slug: string): Promise<Project | undefined> => {
    const { data, error } = await supabase
      .from("projects")
      .select("id, title, slug, image, description")
      .eq("slug", slug)
      .single();

    if (error || !data) return undefined;
    return data;
  },

  create: async (project: Omit<Project, "id">): Promise<Project> => {
    const { data, error } = await supabase
      .from("projects")
      .insert({
        title: project.title,
        slug: project.slug,
        image: project.image,
        description: project.description,
      })
      .select("id, title, slug, image, description")
      .single();

    if (error || !data) throw new Error(error.message);
    return data;
  },

  update: async (id: string, project: Partial<Project>): Promise<Project> => {
    const { data, error } = await supabase
      .from("projects")
      .update({
        title: project.title,
        slug: project.slug,
        image: project.image,
        description: project.description,
      })
      .eq("id", id)
      .select("id, title, slug, image, description")
      .single();

    if (error || !data) throw new Error(error.message);
    return data;
  },

  delete: async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    return !error;
  },

  uploadImage: async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error } = await supabase.storage
      .from("project-images")
      .upload(filePath, file);

    if (error) throw new Error(error.message);

    const { data } = supabase.storage
      .from("project-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  },
};

import { supabase } from "../supabase";
import { Content } from "../types";

export const fetchUserContents = async (userId: string): Promise<Content[]> => {
  const { data, error } = await supabase
    .from("content")
    .select("*")
    .eq("userId", userId)
    .order("createdAt", { ascending: false });

  if (error) throw error;
  return data as Content[];
};

export const createContent = async (newContent: Partial<Content>) => {
  const { data, error } = await supabase
    .from("content")
    .insert(newContent)
    .select()
    .single();

  if (error) throw error;
  return data as Content;
};

export const fetchContentById = async (id: string): Promise<Content | null> => {
  if (!id) {
    throw new Error("Invalid Content ID");
  }

  const { data, error } = await supabase
    .from("content")
    .select("*")
    .eq("id", id)
    .order("createdAt", { ascending: false });

  if (error) throw error;

  return data?.[0] ?? null;
};

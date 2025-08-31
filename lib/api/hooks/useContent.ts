import { Content } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserContents,
  deleteContent,
  createContent,
  updateContent,
  markAsFavorite,
  markNotFavorite,
  fetchContentById,
} from "../content";

export const useContent = () => {
  const queryClient = useQueryClient();

  const getUserContents = (userId: string) => {
    return useQuery<Content[], Error>({
      queryKey: ["contents", userId],
      queryFn: () => fetchUserContents(userId),
      enabled: !!userId,
    });
  };

  const getContentById = (id: string) => {
    return useQuery<Content, Error>({
      queryKey: ["content", id],
      queryFn: () => fetchContentById(id),
      enabled: !!id,
    });
  };

  const createContentMutation = useMutation({
    mutationFn: ({ content }: { content: Partial<Content> }) =>
      createContent(content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const updateContentReminderDate = useMutation({
    mutationFn: ({
      contentId,
      newDate,
    }: {
      contentId: string;
      newDate: Date;
    }) =>
      updateContent(contentId, {
        remindAt: newDate,
      }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
      queryClient.setQueryData(
        ["content", variables.contentId],
        (oldData: Content | undefined) => {
          if (oldData) {
            return { ...oldData, remindAt: variables.newDate };
          }
          return oldData;
        }
      );
    },
  });

  const markContentAsFavorite = useMutation({
    mutationFn: ({ contentId }: { contentId: string }) =>
      markAsFavorite(contentId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
      queryClient.setQueryData(
        ["content", variables.contentId],
        (oldData: Content | undefined) => {
          if (oldData) {
            return { ...oldData, isFavorite: true };
          }
          return oldData;
        }
      );
    },
  });

  const removeContentFromFavorites = useMutation({
    mutationFn: ({ contentId }: { contentId: string }) =>
      markNotFavorite(contentId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
      queryClient.setQueryData(
        ["content", variables.contentId],
        (oldData: Content | undefined) => {
          if (oldData) {
            return { ...oldData, isFavorite: false };
          }
          return oldData;
        }
      );
    },
  });

  const deleteContentMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteContent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
  });

  return {
    getUserContents,
    getContentById,
    createContentMutation,
    deleteContentMutation,
    markContentAsFavorite,
    removeContentFromFavorites,
    updateContentReminderDate,
  };
};

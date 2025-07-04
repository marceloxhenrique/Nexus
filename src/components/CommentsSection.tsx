"use client";
import {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { UserContext } from "@/contexts/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import { toast } from "sonner";
import { Ellipsis, Loader2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const commentSchema = z.object({
  content: z.string().min(1, { message: "Comment cannot be empty" }),
});

type CommentFormValues = z.infer<typeof commentSchema>;

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    slug: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

function CommentsSectionComponent(
  { articleId }: { articleId: string },
  ref: React.Ref<{ focusInput: () => void }>,
) {
  const user = useContext(UserContext)?.user;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  useImperativeHandle(ref, () => ({
    focusInput: () => {
      textareaRef.current?.focus();
    },
  }));
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const { data } = useQuery({
    queryKey: ["comments", articleId],
    queryFn: async (): Promise<Comment[]> => {
      const response = await api.get(`/comments?articleId=${articleId}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const addCommentMutation = useMutation({
    mutationFn: async (newComment: { content: string; articleId: string }) => {
      await api.post("/comments", newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", articleId] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      reset();
    },
    onError: (error) => {
      console.log("Error commenting article :", error);
      toast.error("Something went wrong. Please try again");
    },
  });

  const addComment = async (data: CommentFormValues) => {
    if (!user) {
      router.push("/sign-up");
      return;
    }
    const newComment = {
      content: data.content,
      articleId: articleId,
    };
    addCommentMutation.mutate(newComment);
  };

  return (
    <section className="mt-1 pt-8 text-custom-text-primary">
      <h2 className="mb-6 text-2xl font-bold">Comments</h2>
      <Card className="mb-10 border-0 bg-custom-background shadow-none sm:border sm:shadow-sm">
        <CardContent>
          <form onSubmit={handleSubmit(addComment)}>
            <Textarea
              {...register("content")}
              ref={(el) => {
                register("content").ref(el);
                textareaRef.current = el;
              }}
              placeholder="Add a comment..."
              className="mb-1 resize-none bg-custom-background p-3 shadow-none focus-visible:ring-1"
              rows={3}
            />
            <div className="h-8">
              {errors.content && (
                <p className="mb-2 text-sm text-red-500">
                  {errors.content.message}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {data?.map((comment: Comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
      {data?.length === 0 && (
        <div className="py-12 text-center text-custom-text-light">
          <h3 className="mb-2 text-lg font-medium">No Comments yet</h3>
          <p>Be the first to share your thoughts!</p>
        </div>
      )}
    </section>
  );
}

const CommentItem = ({ comment }: { comment: Comment }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const user = useContext(UserContext)?.user;
  const queryClient = useQueryClient();

  const deleteCommentMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/comments/${comment.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      setDeleteDialogOpen(false);
    },
    onError: (error) => {
      console.error("Error while deleting comment: ", error);
      toast.error("Something went wrong. Please try again.");
      setDeleteDialogOpen(false);
    },
  });

  return (
    <section className="mb-6 flex flex-col gap-3 border-b-[0.01rem] border-neutral-400 pb-4">
      <div className="flex justify-between">
        <Link
          href={`/@${comment.author.slug}`}
          className="flex items-center gap-2"
        >
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage
              src={comment.author.avatar!}
              alt={comment.author.name}
            />
            <AvatarFallback>
              {comment.author.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col sm:flex-row sm:gap-2">
            {comment.author.name}
            <span className="text-sm text-custom-text-light">
              {new Date(comment.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </Link>
        {user?.id === comment.author.id && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Ellipsis className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 shadow-lg dark:bg-custom-background">
              <DropdownMenuItem className="my-2 cursor-pointer p-0">
                <Button
                  variant={"secondary"}
                  onClick={() => setDeleteDialogOpen(true)}
                  className="flex w-full justify-baseline"
                >
                  <Trash2 className="text-custom-secondary" />
                  Delete comment
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-red-500">Delete Comment</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this comment?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                className="border-[0.01rem] text-custom-text-primary"
                disabled={deleteCommentMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  deleteCommentMutation.mutate();
                }}
                disabled={deleteCommentMutation.isPending}
                className="w-full sm:w-auto"
              >
                {deleteCommentMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin transition duration-1000" />
                ) : (
                  "Delete"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <p className="mb-3 text-custom-primary">{comment.content}</p>
    </section>
  );
};

export const CommentsSection = forwardRef(CommentsSectionComponent);

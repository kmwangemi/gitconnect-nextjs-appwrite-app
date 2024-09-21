"use client";

import { useSession } from "@/app/(dashboard)/SessionProvider";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { submitPost } from "./actions";
import "./styles.css";

export default function PostEditor() {
  const { user } = useSession();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "Post content...",
      }),
    ],
  });
  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  async function onSubmit() {
    await submitPost(input);
    editor?.commands.clearContent();
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user?.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className="max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3"
        />
        {/* <div {...rootProps} className="w-full">
            <EditorContent
              editor={editor}
              className={cn(
                "max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3",
                isDragActive && "outline-dashed",
              )}
              onPaste={onPaste}
            />
            <input {...getInputProps()} />
          </div> */}
      </div>
      <div className="flex gap-5">
        <Button
          onClick={onSubmit}
          disabled={!input.trim()}
          className="min-w-20"
        >
          Post
        </Button>
      </div>
      {/* {!!attachments.length && (
          <AttachmentPreviews
            attachments={attachments}
            removeAttachment={removeAttachment}
          />
        )} */}
      {/* <div className="flex items-center justify-end gap-3">
          {isUploading && (
            <>
              <span className="text-sm">{uploadProgress ?? 0}%</span>
              <Loader2 className="size-5 animate-spin text-primary" />
            </>
          )}
          <AddAttachmentsButton
            onFilesSelected={startUpload}
            disabled={isUploading || attachments.length >= 5}
          />
          <LoadingButton
            onClick={onSubmit}
            loading={mutation.isPending}
            disabled={!input.trim() || isUploading}
            className="min-w-20"
          >
            Post
          </LoadingButton>
        </div> */}
    </div>
  );
}

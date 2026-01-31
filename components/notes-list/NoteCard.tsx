import type { NoteCardProps } from "@/app/types";
import { format } from "date-fns";
import Link from "next/link";

export default function NoteCard({ note, tagNames }: NoteCardProps) {
  const formattedDate = format(new Date(note.updated_at), "dd MMM yyyy");
  return (
    <Link href={`/notes/${note.id}`}>
      <div className="flex flex-col gap-3 border-b border-border pb-2 my-2">
        <h1 className="font-medium text-primary text-xl">{note.title}</h1>
        <div className="flex flex-wrap gap-2">
          {tagNames.map((tagName: string) => (
            <span
              className="h-7 inline-flex items-center gap-2 border text-popover text-xs rounded-md px-2 py bg-card flex items-center gap-2"
              key={tagName}
            >
              {tagName}
            </span>
          ))}
        </div>
        <p className="font-light text-secondary">{formattedDate}</p>
      </div>
    </Link>
  );
}

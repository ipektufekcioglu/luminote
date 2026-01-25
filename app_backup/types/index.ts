export type LoginState = {
  success: boolean;
  message?: string;
};

export type SignUpState = {
  success: boolean;
  message?: string;
};

export type Note = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  is_archived: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  tags?: Tag[];
};

export type NoteEditorProps = {
  initialNote?: {
    id: string;
    title: string;
    content: string;
    tags: Tag[];
    updated_at: string;
  };
  mode: "create" | "edit";
};

export type Tag = {
  id: string;
  name: string;
};

export type AddTagProps = {
  onChange: (data: string) => void;
  handleAddNew: (data: string) => void;
};

export type SelectedTagProps = {
  handleSelect: () => void;
  tagName: string;
};

export type TagSelectorProps = {
  handleSelect: (tag: Tag) => void;
  selectedTags: Tag[];
};

export type NoteCardProps = {
  note: Note;
  tagNames: string[];
};

export type NoteTagRow = {
  tag_id: string;
  tags: { name: string | null } | null;
};

export type NotesListClientProps = {
  initialNotes: Note[];
  initialTagsMap: Record<string, string[]>;
};

export type SideBarClientProps = {
  initialTagNames: Tag[];
};

export type SearchContextType = {
  searchText: string;
  setSearchText: (text: string) => void;
};

export type TagFilterContextType = {
  filterTag: string;
  setFilterTag: (text: string) => void;
};

export type FontTheme = "sans" | "serif" | "mono";
export type ColorTheme = "light" | "dark" | "system";

export type SettingsType = {
  fontTheme: FontTheme;
  colorTheme: ColorTheme;
};

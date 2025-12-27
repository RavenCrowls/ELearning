export type VideoItem = {
  id: string;
  name: string;
  order: number;
  isChecked: boolean;
  duration?: string;
  url?: string;
};

export type Lecture = {
  id: string;
  name: string;
  order: number;
  videos: VideoItem[];
};

export type CourseFormErrors = Partial<
  Record<
    | "title"
    | "category"
    | "subCategory"
    | "description"
    | "output"
    | "level"
    | "price"
    | "duration"
    | "image",
    string
  >
>;

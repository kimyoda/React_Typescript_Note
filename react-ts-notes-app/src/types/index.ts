export interface NoteInterface {
  id: string;
  message: string;
}

export interface PageButton {
  page: number;
  current: boolean;
  dots: boolean;
}

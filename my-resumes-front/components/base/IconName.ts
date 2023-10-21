export type IconName =
  | "email"
  | "delete"
  | "linkedin"
  | "github"
  | "chevrondown"
  | "chevroup"
  | "template"
  | "plus"
  | "previous"
  | "calendar"
  | "edit"
  | "eye"
  | "expand"
  | "document"
  | "info"
  | "list"
  | "download"
  | "close"
  | "next"
  | "check"
  | "spinner";

export const iconNameToFontIconMap: Record<IconName, string> = {
  email: "fa-envelope",
  delete: "fa-trash-o",
  linkedin: "fa-linkedin",
  github: "fa-github",
  chevrondown: "fa-chevron-down",
  chevroup: "fa-chevron-up",
  template: "fa-paint-brush",
  plus: "fa-plus",
  previous: "fa-chevron-left",
  calendar: "fa-calendar-o",
  edit: "fa-pencil",
  eye: "fa-eye",
  expand: "fa-caret-down",
  document: "fa-file-text-o",
  info: "fa-info-circle",
  list: "fa-list-ul",
  download: "fa-arrow-circle-o-down",
  close: "fa-times",
  next: "fa-chevron-right",
  check: "fa-check-circle-o",
  spinner: "fa-spinner",
};

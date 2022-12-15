export type IQuestionSubject =
  | "Math"
  | "Port"
  | "Geo"
  | "Hist"
  | "Bio"
  | "Chem"
  | "Socio"
  | "Philo"
  | "Essay";

export type IQuestionSubjectDisplayName =
  | "Matemática"
  | "Português"
  | "Geografia"
  | "História"
  | "Biologia"
  | "Química"
  | "Sociologia"
  | "Filosofia"
  | "Redação";

export interface SubjectInfo {
  displayName: IQuestionSubjectDisplayName;
  icon: string;
}

type SubjectsMap = {
  [subject in IQuestionSubject]: SubjectInfo;
};

export const subjectsMap: SubjectsMap = {
  Math: {
    displayName: "Matemática",
    icon: "calculate",
  },
  Port: {
    displayName: "Português",
    icon: "book",
  },
  Geo: {
    displayName: "Geografia",
    icon: "public",
  },
  Hist: {
    displayName: "História",
    icon: "history-edu",
  },
  Bio: {
    displayName: "Biologia",
    icon: "biotech",
  },
  Chem: {
    displayName: "Química",
    icon: "science",
  },
  Socio: {
    displayName: "Sociologia",
    icon: "groups",
  },
  Philo: {
    displayName: "Filosofia",
    icon: "lightbulb",
  },
  Essay: {
    displayName: "Redação",
    icon: "edit",
  },
} as const;

export const SubjectsList: SubjectInfo[] = Object.entries(subjectsMap).map(
  ([k, v]) => v
);
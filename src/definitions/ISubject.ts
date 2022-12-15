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
  name: IQuestionSubject;
  icon: string;
}

type SubjectsMap = {
  [subject in IQuestionSubject]: SubjectInfo;
};

export const subjectsMap: SubjectsMap = {
  Math: {
    displayName: "Matemática",
    name: "Math",
    icon: "calculate",
  },
  Port: {
    displayName: "Português",
    name: "Port",
    icon: "book",
  },
  Geo: {
    displayName: "Geografia",
    name: "Geo",
    icon: "public",
  },
  Hist: {
    displayName: "História",
    name: "Hist",
    icon: "history-edu",
  },
  Bio: {
    displayName: "Biologia",
    name: "Bio",
    icon: "biotech",
  },
  Chem: {
    displayName: "Química",
    name: "Chem",
    icon: "science",
  },
  Socio: {
    displayName: "Sociologia",
    name: "Socio",
    icon: "groups",
  },
  Philo: {
    displayName: "Filosofia",
    name: "Philo",
    icon: "lightbulb",
  },
  Essay: {
    displayName: "Redação",
    name: "Essay",
    icon: "edit",
  },
} as const;

export const SubjectsList: SubjectInfo[] = Object.entries(subjectsMap).map(
  ([k, v]) => v
);

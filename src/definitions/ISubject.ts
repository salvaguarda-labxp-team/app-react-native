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

export type SubjectInfo = {
  name: string;
  icon: string;
};

type SubjectsMap = {
  [subject in IQuestionSubject]: SubjectInfo;
};

export const subjectsMap: SubjectsMap = {
  Math: {
    name: "Matemática",
    icon: "calculate",
  },
  Port: {
    name: "Português",
    icon: "book",
  },
  Geo: {
    name: "Geografia",
    icon: "public",
  },
  Hist: {
    name: "História",
    icon: "history-edu",
  },
  Bio: {
    name: "Biologia",
    icon: "biotech",
  },
  Chem: {
    name: "Química",
    icon: "science",
  },
  Socio: {
    name: "Sociologia",
    icon: "groups",
  },
  Philo: {
    name: "Filosofia",
    icon: "lightbulb",
  },
  Essay: {
    name: "Redação",
    icon: "edit",
  },
} as const;

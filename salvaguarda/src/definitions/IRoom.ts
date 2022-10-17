export type IRoomType = "public" | "private";

export type IRoomSubject = "Math" | "Port" | "Geo" | "Hist" | "Bio" | "Chem" | "Socio" | "Philo" | "Tutor" | "Essay";

export type IRoom = {
	_id: string;
	createdAt: Date;
    lm: Date;
	name: string;
    subject: IRoomSubject;
    type: IRoomType;
    creatorId: string;
};

export enum LearnRate {
    GREY,
    YELLOW,
    ORANGE,
    GREEN
}

export type Word = {
    word: string,
    score: number,
    dateAdded: string,
    translations: string[],
    source: {
        image: string,
        title: string,
        subtitle: string
    }
}


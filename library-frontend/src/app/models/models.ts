export type BookModel = {
    _id: String,
    title: String,
    description: String,
    count: number,
    countLeft: number
}

export type ReservationModel = {
    _id: String,
    bookId: String,
    userName: String,
    startDate: Date,
    endDate: Date
}

export type ResultModel<T> = {
    data: T,
    success: boolean,
    message: string
}
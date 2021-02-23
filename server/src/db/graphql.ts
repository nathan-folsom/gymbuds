
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum UserStatus {
    ACTIVE = "ACTIVE",
    DELETED = "DELETED",
    ADMIN = "ADMIN"
}

export interface CreateUserInput {
    username: string;
    password: string;
}

export interface IMutation {
    createUser(user?: CreateUserInput): User | Promise<User>;
    createRandomUser(): User | Promise<User>;
}

export interface IQuery {
    user(id: string): User | Promise<User>;
    reservation(): ReservationQuery | Promise<ReservationQuery>;
}

export interface Reservation {
    id: string;
    userId: string;
    time: string;
    location: string;
}

export interface ReservationQuery {
    allReservations?: Reservation[];
    myReservations?: Reservation[];
}

export interface User {
    userId: string;
    username: string;
    created: string;
    reservations?: Reservation[];
    status?: UserStatus;
}
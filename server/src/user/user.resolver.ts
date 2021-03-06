import {Args, Context, Mutation, Query, Resolver} from "@nestjs/graphql";
import {UserService} from "./user.service";
import {CreateUserInput} from "../graphql";
import {ServerResponse} from "http";
import {SessionsService} from "../sessions/sessions.service";
import {COOKIE_NAME} from "../app.module";

@Resolver('User')
export class UserResolver {
    constructor(private userService: UserService,
                private sessionService: SessionsService) {
    }

    @Query('user')
    async getUser(@Context('authToken') token: string) {
        if (token) {
            const session = await this.sessionService.get(token);
            return session ? this.userService.getUser(session.userId) : undefined;
        }
        return undefined;
    }

    @Mutation('login')
    async login(@Args('username') username: string,
                @Args('password') password: string,
                @Context('res') res: ServerResponse) {
        const user = await this.userService.login(username, password);
        if (user) {
            const session = await this.sessionService.create(user.userId);
            res.setHeader('Set-Cookie', `${COOKIE_NAME}=${session.token}`);
            return true;
        }
        return false;
    }

    @Mutation()
    async logout(@Context('authToken') token: string) {
        await this.sessionService.delete(token);
        return true;
    }

    @Mutation('createUser')
    async createUser(@Args('user') input: CreateUserInput,
                     @Context('res') res: ServerResponse) {
        try {
            const user = await this.userService.createUser(input);
            const session = await this.sessionService.create(user.userId);
            res.setHeader('Set-Cookie', `${COOKIE_NAME}=${session.token}`);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    @Query('getUserId')
    async getUserId(@Args('username') username: string) {
        const user = await this.userService.getUserByName(username);
        return user.userId;
    }
}

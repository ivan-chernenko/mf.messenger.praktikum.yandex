import {Router} from './lib/router/index';
import {ChangePasswordPage} from './pages/change-password/index';
import {RegisterPage, RegisterPageProps} from './pages/register/index';
import {LoginPage, LoginPageProps} from './pages/login/index';
import {ProfilePage, ProfilePageProps} from './pages/profile/index';
import {PageNotFound} from './pages/page-not-found/index';
import {InternalErrorPage} from './pages/internal-error/index';
import {ChangeProfilePage, ChangeProfilePageProps} from './pages/change-profile/index';
import {ChatListPage, ChatListPageProps} from './pages/chat-list/index';
import {HTTPTransport} from './lib/http-transport/index';
import {LoginApi} from './api/login-api/index';
import {LoginController} from './controllers/login-controller/index';
import {Page} from './lib/page/index';
import {ProfileApi} from './api/profile-api/index';
import {ProfileController} from './controllers/profile-controller/index';
import {ChangePasswordProps} from "./pages/change-password/types";
import {ChatListApi} from "./api/chat-list-api/index";
import {ChatListController} from "./controllers/chat-list-controller/index";

const router = new Router(PageNotFound);

const http = new HTTPTransport();

const loginApi = new LoginApi(http);
const loginController = new LoginController(loginApi);

const profileApi = new ProfileApi(http);
const profileController = new ProfileController(profileApi);

const chatListApi = new ChatListApi(http);
const chatListController = new ChatListController(chatListApi);


router
    .use<ChangePasswordProps>(
        '/change-password',
        ChangePasswordPage as unknown as new () => Page<ChangePasswordProps>,
        {profileController}
    )
    .use<RegisterPageProps>(
        '/register',
        RegisterPage as unknown as new () => Page<RegisterPageProps>,
        {loginController}
    )
    .use<LoginPageProps>(
        '/login',
        LoginPage as unknown as new () => Page<LoginPageProps>,
        {loginController}
    )
    .use<ProfilePageProps>(
        '/profile',
        ProfilePage as unknown as new () => Page<ProfilePageProps>, {
            profileController,
            loginController
        })
    .use(
        '/internal-error',
        InternalErrorPage
    )
    .use<ChangeProfilePageProps>(
        '/change-profile',
        ChangeProfilePage as unknown as new () => Page<ChangeProfilePageProps>,
        {profileController}
    )
    .use<ChatListPageProps>(
        '/chat-list',
        ChatListPage as unknown as new () => Page<ChatListPageProps>,
        {
            chatListController,
            chats: []
        }
    );

export {router};
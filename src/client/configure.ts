import { Router } from './lib/router';
import { ChangePasswordPage } from './pages/change-password';
import { RegisterPage, RegisterPageProps } from './pages/register';
import { LoginPage, LoginPageProps } from './pages/login';
import { ProfilePage, ProfilePageProps } from './pages/profile';
import { PageNotFound } from './pages/page-not-found';
import { InternalErrorPage } from './pages/internal-error';
import {
    ChangeProfilePage,
    ChangeProfilePageProps,
} from './pages/change-profile';
import { ChatListPage, ChatListPageProps } from './pages/chat-list';
import { HTTPTransport } from './lib/http-transport';
import { LoginApi } from './api/login-api';
import { LoginController } from './controllers/login-controller';
import { Page } from './lib/page';
import { ProfileApi } from './api/profile-api';
import { ProfileController } from './controllers/profile-controller';
import { ChangePasswordProps } from './pages/change-password';
import { ChatListApi } from './api/chat-list-api';
import { ChatListController } from './controllers/chat-list-controller';
import './common/styles/avatar.less';
import './common/styles/modal.less';
import './common/styles/body.less';
import './common/styles/content.less';
import './common/styles/form.less';

const router = new Router(PageNotFound);

const http = new HTTPTransport('https://ya-praktikum.tech/api/v2/');

const loginApi = new LoginApi(http);
const loginController = new LoginController(loginApi);

const profileApi = new ProfileApi(http);
const profileController = new ProfileController(profileApi);

const chatListApi = new ChatListApi(http);
const chatListController = new ChatListController(chatListApi);

router
    .use<ChangePasswordProps>(
        '/change-password',
        (ChangePasswordPage as unknown) as new () => Page<ChangePasswordProps>,
        { profileController },
    )
    .use<RegisterPageProps>(
        '/register',
        (RegisterPage as unknown) as new () => Page<RegisterPageProps>,
        { loginController },
    )
    .use<LoginPageProps>(
        '/login',
        (LoginPage as unknown) as new () => Page<LoginPageProps>,
        { loginController },
    )
    .use<ProfilePageProps>(
        '/profile',
        (ProfilePage as unknown) as new () => Page<ProfilePageProps>,
        {
            profileController,
            loginController,
        },
    )
    .use('/internal-error', InternalErrorPage)
    .use<ChangeProfilePageProps>(
        '/change-profile',
        (ChangeProfilePage as unknown) as new () => Page<ChangeProfilePageProps>,
        { profileController },
    )
    .use<ChatListPageProps>(
        '/chat-list',
        (ChatListPage as unknown) as new () => Page<ChatListPageProps>,
        {
            chatListController,
            chats: [],
            messages: [],
            selectedChat: undefined,
        },
    );

export { router };

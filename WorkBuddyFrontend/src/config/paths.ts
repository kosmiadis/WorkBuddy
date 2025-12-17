class Path {
    path: string;

    constructor (path: string) {
        this.path = path;
    }

    getPath(redirectTo?: string) {
        return redirectTo ? `${this.path}?redirectTo=${encodeURIComponent(redirectTo)}` : this.path;
    }

    getAbsoluteRoutedPath (redirectTo?: string) {
        return redirectTo ? `/${this.path}?redirectTo=${encodeURIComponent(redirectTo)}` : '/'+this.path;
    }
}


const paths = {
    auth: {
        login: new Path('login'),
        register: new Path('register'),
        me: new Path('me')
    },
    app: {
        dashboard: new Path('dashboard'),
        worklog: new Path('worklog'),
        settings: new Path('settings')
    },
}

export default paths;
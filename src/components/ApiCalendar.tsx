let CLIENT_ID: string = "474857817188-o8gdccn66v5jbh6uarqod8jv1vfq2pl8.apps.googleusercontent.com";
let API_KEY: string = "AIzaSyBNuPUopv37muXGvxuDCE7ShrFyPEw6JEM";
let SCOPES: string = "https://www.googleapis.com/auth/calendar.readonly";
let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

class ApiCalendar {
    sign: boolean = false;

    constructor() {
        this.updateSigninStatus = this.updateSigninStatus.bind(this);
        this.initClient = this.initClient.bind(this);
        this.handleSignoutClick = this.handleSignoutClick.bind(this);
        this.handleAuthClick = this.handleAuthClick.bind(this);

        this.handleClientLoad();
    }

    /**
     * Update connection status.
     * @param {boolean} isSignedIn
     */
    private updateSigninStatus(isSignedIn: boolean): void {
        this.sign = isSignedIn;
    }

    /**
     * Sign in Google user account
     */
    public handleAuthClick(): void {
        window['gapi'].auth2.getAuthInstance().signIn();
    }

    /**
     * Sign out user google account
     */
    public handleSignoutClick(): void {
        window['gapi'].auth2.getAuthInstance().signOut();
        this.sign = false;
    }

    /**
     * List all events in the calendar
     * @returns {promise}
     */
    public listUpcomingEvents(): any {
        return window['gapi'].client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        })
    }

    /**
     * Auth to the google Api.
     */
    private initClient(): void {
        window['gapi'].client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(() => {
            // Listen for sign-in state changes.
            window['gapi'].auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
            // Handle the initial sign-in state.
            this.updateSigninStatus(window['gapi'].auth2.getAuthInstance().isSignedIn.get());
        });
    }

    /**
     * Init Google Api
     * And create gapi in global
     */
    public handleClientLoad(): void {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        document.body.appendChild(script);
        script.onload = (): void => {
            window['gapi'].load('client:auth2', this.initClient);
        }
    }
}

const apiCalendar = new ApiCalendar();
export default apiCalendar;
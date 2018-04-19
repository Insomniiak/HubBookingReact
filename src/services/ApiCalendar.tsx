const Config = require("./apiGoogleconfig.json");

class ApiCalendar {
    sign: boolean = false;
    gapi: any = null;
    onLoadCallback: any = null;

    constructor() {
        this.updateSigninStatus = this.updateSigninStatus.bind(this);
        this.initClient = this.initClient.bind(this);
        this.handleSignoutClick = this.handleSignoutClick.bind(this);
        this.handleAuthClick = this.handleAuthClick.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
        this.createEventFromNow = this.createEventFromNow.bind(this);
        this.listenSign = this.listenSign.bind(this);
        this.onLoad = this.onLoad.bind(this);

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
     * Auth to the google Api.
     */
    private initClient(): void {
        this.gapi = window['gapi'];
        this.gapi.client.init(Config)
            .then(() => {
                // Listen for sign-in state changes.
                this.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
                // Handle the initial sign-in state.
                this.updateSigninStatus(this.gapi.auth2.getAuthInstance().isSignedIn.get());
                if (this.onLoadCallback) {
                    this.onLoadCallback();
                }
            })
    }

    /**
     * Sign in Google user account
     */
    public handleAuthClick(): void {
        if (this.gapi) {
            this.gapi.auth2.getAuthInstance().signIn();
        } else {
            console.log("Error: this.gapi not loaded")
        }
    }

    /**
     * Execute the callback function when a user is disconnected or connected with the sign status.
     * @param callback
     */
    public listenSign(callback: any): void {
        if (this.gapi) {
            this.gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
        } else {
            console.log("Error: this.gapi not loaded")
        }
    }

    /**
     * Execute the callback function when gapi is loaded
     * @param callback
     */
    public onLoad(callback: any): void {
        if (this.gapi) {
            callback();
        } else {
            this.onLoadCallback = callback;
        }
    }

    /**
     * Sign out user google account
     */
    public handleSignoutClick(): void {
        if (this.gapi) {
            this.gapi.auth2.getAuthInstance().signOut();
        } else {
            console.log("Error: this.gapi not loaded");
        }
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

    /**
     * List all events in the calendar
     * @param {string} calendarId to see
     * @param {number} maxResults to see
     * @returns {any}
     */
    public listUpcomingEvents(calendarId: string, maxResults: number): any {
        if (this.gapi) {
            return this.gapi.client.calendar.events.list({
                'calendarId': calendarId,
                'timeMin': (new Date()).toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': maxResults,
                'orderBy': 'startTime'
            })
        } else {
            console.log("Error: this.gapi not loaded");
            return false
        }
    }

    /**
     * Create an event from the current time for a certain period
     * @param {string} calendarId
     * @param {number} time in minutes for the event
     * @param {string} summary of the event
     * @param {string} description of the event
     * @returns {any}
     */
    public createEventFromNow(calendarId: string, {time, summary, description = ''}: any): any {
        const event = {
            summary,
            description,
            start: {
                dateTime: (new Date()).toISOString(),
                timeZone: "Europe/Paris",
            },
            end: {
                dateTime: (new Date(new Date().getTime() + time * 60000)),
                timeZone: "Europe/Paris",
            }
        };

        return this.gapi.client.calendar.events.insert({
            'calendarId': calendarId,
            'resource': event,
        });
    }

    /**
     * Create Calendar event
     * @param {string} calendarId for the event.
     * @param {object} event with start and end dateTime
     * @returns {any}
     */
    public createEvent(calendarId: string, event: object): any {
        return this.gapi.client.calendar.events.insert({
            'calendarId': calendarId,
            'resource': event,
        });
    }
}

const apiCalendar = new ApiCalendar();
export default apiCalendar;
import React, {ReactNode} from "react";
import Header from "./components/Header";
import ApiCalendar from "./services/ApiCalendar";

import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {Button} from "semantic-ui-react";

let eventFromNow: object = {
    summary: "Poc Dev From Now",
    time: 480,
};

class App extends React.Component {
    constructor(props: any) {
        super(props);
        this.getMsg = this.getMsg.bind(this);
        this.createEv = this.createEv.bind(this);
    }

    public getMsg(): void {
        if (ApiCalendar.sign)
            ApiCalendar.listUpcomingEvents('primary', 10)
                .then(({result}: any) => {
                    console.log(result.items);
                });
    }

    public createEv(): void {
        ApiCalendar.createEventFromNow('primary', eventFromNow)
            .then((result: object) => {
                console.log(result);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    public render(): ReactNode {
        return (
            <div>
                <Header />
                <Button onClick={ApiCalendar.handleAuthClick}>Connect</Button>
                <Button onClick={this.getMsg}>CheckMsg</Button>
                <Button onClick={ApiCalendar.handleSignoutClick}>Disconnect</Button>
                <Button onClick={this.createEv}>Create Event</Button>
                <p>Hello</p>
            </div>
        );
    }
}

export default App;

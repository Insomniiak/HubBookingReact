import React, {ReactNode} from "react";
import Header from "./components/Header";
import ApiCalendar from "./services/ApiCalendar";

import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {Button} from "semantic-ui-react";

class App extends React.Component {
    constructor(props: any) {
        super(props);
        this.getMsg = this.getMsg.bind(this);
    }
    public getMsg(): void {
        if (ApiCalendar.sign)
            ApiCalendar.listUpcomingEvents().then((result: any) => {
               console.log(result);
            });
    }

    public render(): ReactNode {
        return (
            <div>
                <Header />
                <Button onClick={ApiCalendar.handleAuthClick}>Connect</Button>
                <Button onClick={this.getMsg}>CheckMsg</Button>
                <Button onClick={ApiCalendar.handleSignoutClick}>Disconnect</Button>
                <p>Hello</p>
            </div>
        );
    }
}

export default App;

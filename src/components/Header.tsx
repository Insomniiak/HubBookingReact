import React, {ReactNode, SyntheticEvent} from "react";
import {Menu} from "semantic-ui-react";
import ApiCalendar from "../services/ApiCalendar";

export default class Header extends React.Component<any, any> {
    constructor(props: object) {
        super(props);

        this.state = {
            sign: ApiCalendar.sign,
            activeItem: 'none',
        };
        this.handleItemClick = this.handleItemClick.bind(this);
        this.signUpdate = this.signUpdate.bind(this);
        ApiCalendar.onLoad(() => {
            ApiCalendar.listenSign(this.signUpdate);
        });
    }

    public signUpdate(sign: boolean): any {
        this.setState({
            sign
        })
    }

    public handleItemClick(event: SyntheticEvent<any>, { name }: any): void {
        event.preventDefault();
        if (name === 'sign-in') {
            ApiCalendar.handleAuthClick();
        } else if (name === 'sign-out') {
            ApiCalendar.handleSignoutClick();
        }
        this.setState({
            activeItem: name,
        })
    }

    render(): ReactNode {
        return (
            <Menu stackable inverted>
                <Menu.Item
                    name='status'
                >
                    {this.state.sign ? "Connected" : "Disconnected" }
                </Menu.Item>

                { !ApiCalendar.sign ?
                    <Menu.Item
                        name='sign-in'
                        active={this.state.activeItem === 'sign-in'}
                        onClick={this.handleItemClick}
                    >
                        Sign-in
                    </Menu.Item>
                    :
                    <Menu.Item
                        name='sign-out'
                        active={this.state.activeItem === 'sign-out'}
                        onClick={this.handleItemClick}
                    >
                        Sign-out
                    </Menu.Item>
                }
            </Menu>
        );
    }
}
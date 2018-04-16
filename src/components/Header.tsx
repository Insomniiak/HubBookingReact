import React, {ReactNode, SyntheticEvent} from "react";
import {Menu} from "semantic-ui-react";

export default class Header extends React.Component<any, any> {
    state: object = {};

    constructor(props: object) {
        super(props);

        this.handleItemClick = this.handleItemClick.bind(this);
    }

    public handleItemClick(event: SyntheticEvent<any>, { name }: any): void {
        event.preventDefault();
        this.setState({
            activeItem: name,
        })
    }

    render(): ReactNode {
        const { activeItem }: any = this.state;

        return (
            <Menu stackable inverted>
                <Menu.Item>
                </Menu.Item>

                <Menu.Item
                    name='features'
                    active={activeItem === 'features'}
                    onClick={this.handleItemClick}
                >
                    Features
                </Menu.Item>

                <Menu.Item
                    name='testimonials'
                    active={activeItem === 'testimonials'}
                    onClick={this.handleItemClick}
                >
                    Testimonials
                </Menu.Item>

                <Menu.Item
                    name='sign-in'
                    active={activeItem === 'sign-in'}
                    onClick={this.handleItemClick}
                >
                    Sign-in
                </Menu.Item>
            </Menu>
        );
    }
}
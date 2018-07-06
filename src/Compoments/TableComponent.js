import React, {Component} from 'react';
import {Button, Icon, Input, Table, Label, Segment, Dropdown} from 'semantic-ui-react'

const CSS_COLOR_NAMES = ['yellow', 'black', 'blue', 'red', 'green', 'purple', 'teal', 'orange', 'olive', 'pink', 'brown'];

const options = [
    {key: 'W', text: 'West', value: 'W'},
    {key: 'N', text: 'North', value: 'N'},
    {key: 'S', text: 'South', value: 'S'},
    {key: 'E', text: 'East', value: 'E'},
];

class TableComponent extends Component {
    state = {
        initialStateX: "",
        initialStateY: "",
        initialDirection: "",
        rovers: []
    };

    handleNewRover = () => {

        if (this.state.initialStateX >= this.props.planetSizeX || this.state.initialStateY >= this.props.planetSizeY) {

            if(this.state.initialStateX >= this.props.planetSizeX){
                alert("You entered an X start value outside the planet boundaries. The value you entered has been set as the upper limit.");
                this.setState({initialStateX: this.props.planetSizeX-1});

            }
            if(this.state.initialStateY >= this.props.planetSizeY){
                alert("You entered an Y start value outside the planet boundaries. The value you entered has been set as the upper limit.");
                this.setState({initialStateY: this.props.planetSizeY-1});

            }

        }
        else {
            this.setState({
                rovers: [...this.state.rovers, {
                    stateX: this.state.initialStateX,
                    stateY: this.state.initialStateY,
                    direction: this.state.initialDirection
                }]
            });
            this.setState({
                initialStateX: "",
                initialStateY: "",
                initialDirection: ""
            })
        }


    };

    changeInitialX = (e) => {
        this.setState({initialStateX: e.target.value})
    };

    changeInitialY = (e) => {
        this.setState({initialStateY: e.target.value})
    };

    changeInitialDirection = (e, data) => {
        this.setState({initialDirection: data.value})
    };

    coordinateExists = (i, j) => {
        let returnValue = null;
        this.state.rovers.map((rover, index) => {
            if ((rover.stateX == i) && (rover.stateY == j)) {
                if (rover.direction.localeCompare("N") === 0) {
                    returnValue = (<i className={"big arrow up icon " + CSS_COLOR_NAMES[index]}/>);
                } else if (rover.direction.localeCompare("E") == 0) {
                    returnValue = (<i className={"big arrow right icon " + CSS_COLOR_NAMES[index]}/>);
                } else if (rover.direction.localeCompare("W") == 0) {
                    returnValue = (<i className={"big arrow left icon " + CSS_COLOR_NAMES[index]}/>);
                } else if (rover.direction.localeCompare("S") == 0) {
                    returnValue = (<i className={"big arrow down icon " + CSS_COLOR_NAMES[index]}/>);
                }
            }
        });
        return returnValue;
    };

    createTable = () => {
        const tableItems = [];

        for (let i = this.props.planetSizeY - 1; i > -1; i--) {
            const tableSubItems = [];
            for (let j = 0; j < this.props.planetSizeX; j++) {
                let coordinate = this.props.planetSizeY * i + j;
                let icon = this.coordinateExists(i, j);
                if (icon) {
                    tableSubItems.push(
                        <Table.Cell key={coordinate}>{icon}</Table.Cell>
                    )
                } else {
                    tableSubItems.push(
                        <Table.Cell key={coordinate}>{}</Table.Cell>
                    )
                }
            }
            tableItems.push(
                <Table.Row key={i}>
                    {tableSubItems}
                </Table.Row>
            );
        }
        return tableItems;
    };

    rotateLeft = (index) => {
        if (this.state.rovers[index].direction.localeCompare("N") == 0) {
            const rovers = this.state.rovers;
            rovers[index].direction = "W";
            this.setState({rovers: rovers});
        } else if (this.state.rovers[index].direction.localeCompare("E") == 0) {
            const rovers = this.state.rovers;
            rovers[index].direction = "N";
            this.setState({rovers: rovers});
        } else if (this.state.rovers[index].direction.localeCompare("W") == 0) {
            const rovers = this.state.rovers;
            rovers[index].direction = "S";
            this.setState({rovers: rovers});
        } else if (this.state.rovers[index].direction.localeCompare("S") == 0) {
            const rovers = this.state.rovers;
            rovers[index].direction = "E";
            this.setState({rovers: rovers});
        }
    };

    rotateRight = (index) => {
        if (this.state.rovers[index].direction.localeCompare("N") == 0) {
            const rovers = this.state.rovers;
            rovers[index].direction = "E";
            this.setState({rovers: rovers});
        } else if (this.state.rovers[index].direction.localeCompare("E") == 0) {
            const rovers = this.state.rovers;
            rovers[index].direction = "S";
            this.setState({rovers: rovers});
        } else if (this.state.rovers[index].direction.localeCompare("W") == 0) {
            const rovers = this.state.rovers;
            rovers[index].direction = "N";
            this.setState({rovers: rovers});
        } else if (this.state.rovers[index].direction.localeCompare("S") == 0) {
            const rovers = this.state.rovers;
            rovers[index].direction = "W";
            this.setState({rovers: rovers});
        }
    };

    move = (index) => {
        if (this.state.rovers[index].direction.localeCompare("N") == 0) {
            if (this.state.rovers[index].stateX + 1 != this.props.planetSizeY) {
                const rovers = this.state.rovers;
                rovers[index].stateX = parseInt(rovers[index].stateX + 1);
                this.setState({rovers: rovers});
            } else {
                alert("You will fall into black hole! Change your direction.");
            }
        } else if (this.state.rovers[index].direction.localeCompare("E") == 0) {
            if (this.state.rovers[index].stateY + 1 != this.props.planetSizeX) {
                const rovers = this.state.rovers;
                rovers[index].stateY = parseInt(rovers[index].stateY + 1);
                this.setState({rovers: rovers});
            } else {
                alert("You will fall into black hole! Change your direction.");
            }
        } else if (this.state.rovers[index].direction.localeCompare("W") == 0) {
            if (this.state.rovers[index].stateY != 0) {
                const rovers = this.state.rovers;
                rovers[index].stateY = rovers[index].stateY - 1;
                this.setState({rovers: rovers});
            } else {
                alert("You will fall into black hole! Change your direction.");
            }
        } else if (this.state.rovers[index].direction.localeCompare("S") == 0) {
            if (this.state.rovers[index].stateX != 0) {
                const rovers = this.state.rovers;
                rovers[index].stateX = rovers[index].stateX - 1;
                this.setState({rovers: rovers});
            } else {
                alert("You will fall into black hole! Change your direction.");
            }
        }
    };

    getControlButtons = () => {
        let controlButtons = [];
        this.state.rovers.map((rover, index) => {
            controlButtons.push(
                <div key={index} id="rover-attr">

                    <Segment>
                        <Label id="rover-label" as='a' color={CSS_COLOR_NAMES[index]} ribbon>
                            {index + 1}.rover is {CSS_COLOR_NAMES[index]}
                        </Label>
                        <Button inverted color='orange' onClick={() => this.rotateLeft(index)}>
                            Rotate Left
                        </Button>
                        <Button inverted color='blue' onClick={() => this.rotateRight(index)}>
                            Rotate Right
                        </Button>
                        <Button inverted color='green' onClick={() => this.move(index)}>
                            Move
                        </Button>

                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>StateX</Table.HeaderCell>
                                    <Table.HeaderCell>StateY</Table.HeaderCell>
                                    <Table.HeaderCell>Direction</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>{rover.stateX}</Table.Cell>
                                    <Table.Cell>{rover.stateY}</Table.Cell>
                                    <Table.Cell>{rover.direction}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Segment>

                </div>
            )
        });
        return controlButtons;
    };

    render() {

        return (
            <div>
                <h1 align="center">Because of the color scale, I recommend you to add maximum 6 rovers.</h1>
                <Segment>
                    <div className="new-rover-container">
                        <div>
                            <Input type='text' placeholder='Initial X position for new rover'
                                   onChange={this.changeInitialX}
                                   value={this.state.initialStateX}/>
                            <Input type='text' placeholder='Initial Y position for new rover'
                                   onChange={this.changeInitialY}
                                   value={this.state.initialStateY}/>


                            <Dropdown placeholder='Direction' selection options={options}
                                      onChange={this.changeInitialDirection} value={this.state.initialDirection}/>


                        </div>
                        <div className="new-rover-container-second--child">
                            <Button icon labelPosition='right' onClick={this.handleNewRover} className="add-rover">
                                Add new rover
                                <Icon name='plus'/>
                            </Button>
                        </div>

                    </div>
                </Segment>
                <div className="move-rover-container">
                    {
                        this.getControlButtons()
                    }
                </div>
                <Table celled>
                    <Table.Body>
                        {
                            this.createTable()
                        }
                    </Table.Body>
                </Table>
            </div>

        );
    }
}

export default TableComponent;


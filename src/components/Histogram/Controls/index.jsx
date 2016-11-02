import React, { Component } from 'react';
import _ from 'lodash';

class Toggle extends Component {
    constructor() {
        super();

        this.state = {value: false};
    }

    componentWillReceiveProps(newProps) {
        this.setState({value: newProps.value});
    }

    handleClick(event) {
        let newValue = !this.state.value;
        this.setState({value: newValue});
        this.props.onClick(this.props.name, newValue);
    }

    render() {
        let className = 'btn btn-default';

        if (this.state.value) {
            className += ' btn-primary';
        }

        return (
            <button className={className} onClick={this.handleClick.bind(this)}>
                {this.props.label}
            </button>
        );
    }
}

class ControlRow extends Component {
    makePick(picked, newState) {

    }

    componentWillMount() {
        let toggles = this.props.getToggleNames(this.props.data),
            toggleValues = _.zipObject(toggles,
                                       toggles.map(() => false));

        this.state = {toggleValues: toggleValues};
    }

    _addToggle(name) {
        let key = `toggle-${name}`,
            label = name;

        if (this.props.capitalize) {
            label = label.toUpperCase();
        }

        return (
            <Toggle label={label}
                    name={name}
                    key={key}
                    value={this.state.toggleValues[name]}
                    onClick={this.makePick.bind(this)} />
        );
    }

    render() {
        return (
            <div className='row'>
                <div className='col-md-12'>
                    {this.props
                         .getToggleNames(this.props.data)
                         .map((name) => this._addToggle(name))}
                </div>
            </div>
        );
    }
}

class Controls extends Component {
    render() {
        let getYears = (data) => {
            return _.keys(_.groupBy(data,
                                    (d) => d.submit_date.getFullYear()))
                    .map(Number);
        }

        return (
            <div>
                <ControlRow data={this.props.data}
                            getToggleNames={getYears}
                            updateDataFilter={() => true} />
            </div>
        )
    }
}

export default Controls;
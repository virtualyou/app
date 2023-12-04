import * as React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface DateConstructor  {
    startDate: Date;
}

export class DateSelector extends React.Component<{}, DateConstructor> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    private handleChange(date: any) {
        console.log('date is here!', date);
        this.setState({
            startDate: date
        });
    }

    public render() {
        const { startDate } = this.state;
        return (
            <DatePicker
                dateFormat="yyyy-MM-dd"
                selected={startDate}
                onChange={this.handleChange}
            />
        )
    }
}
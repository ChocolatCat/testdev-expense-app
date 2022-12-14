import React from 'react';
import DatePicker from 'react-datepicker';

export default class ExpenseForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? props.expense.amount.toString() : '',
            createdAt: props.expense ? props.expense.createdAt : Date.now(),
            calendarFocused: false,
            mode: props.mode,
            error: ''
        };
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(()=>({
            description
        }));
    }
    onTextareaChange = (e) => {
        const note = e.target.value;
        this.setState(()=>({
            note
        }));
    }
    onAmountChange = (e) => {
        const amount = e.target.value;
        //Regex for a number with 2 decimal numbers
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(()=>({
                amount
            }));
        }
    }
    onDateChange = (createdAt) => {
        if(createdAt){
            this.setState(() => ({
                createdAt: Date.parse(createdAt)
            }));
        }
    }
    onSubmit = (e) => {
        //prevent refresh
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            //Set error state = to "Please provide description and amount"
            this.setState( () => ({
                error: "Please provide a description and amount!"
            }));
        }
        else{
            //clear the error
            this.setState( () => ({
                error: ''
            }));
            this.props.onSubmit({
                description: this.state.description,
                note: this.state.note,
                amount: parseFloat(this.state.amount, 10),
                createdAt: this.state.createdAt
            });
        }
    }
    render(){
        return (
            <form className="form" name="expenseForm" onSubmit={this.onSubmit}>
            {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    className='text-input'
                    type="text"
                    placeholder="Description"
                    autoFocus
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                >
                </input>
                <input
                    className='text-input'
                    type="text"
                    placeholder="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                >
                </input>
                <DatePicker 
                    className='calendar'
                    selected={this.state.createdAt}
                    onChange={this.onDateChange}
                    dateFormat="dd/MM/yyyy"
                />
                <textarea
                className='text-area'
                    placeholder="Add a note to this expense! (optional)"
                    value={this.state.note}
                    onChange={this.onTextareaChange}
                >
                </textarea>
                <button 
                className='button'
                name="submit">
                    {this.state.mode === "add" && 'Save Expense'}
                    {this.state.mode === "edit" && `Save edits for ${this.state.description}`}
                </button>
            </form>
        );
    }
}
import React from 'react';
import BennyEditor from 'components/editor/BennyEditor.js';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export class Form extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    const { onInputChange } = this.props
    console.log(e);
    onInputChange(e.target)
  }

  render() {
    const { project } = this.props
    const startedAt = moment(project.startedAt);
    return (
      <form>
        <FieldGroup
          label="Title"
          type="text"
          name="title"
          placeholder="Enter title"
          value={ !project.title ? "": project.title }
          onChange={this.handleChange}
        />
        <FieldGroup
          label="Icon URL"
          type="text"
          name="icon"
          placeholder="Enter icon URL"
          value={ !project.icon ? "": project.icon }
          onChange={this.handleChange}
        />
        <ControlLabel>Project started at</ControlLabel>
        <FormGroup>
          <DatePicker
            dateFormat="YYYY.MM.DD"
            selected={startedAt}
            onChange={this.handleDatePickerChange}
            className="form-control"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            todayButton={"Today"}
            inline
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Brief</ControlLabel>
          <FormControl name="brief" componentClass="textarea" placeholder="Enter brief" value={ !project.brief ? "": project.brief } onChange={this.handleChange}/>
        </FormGroup>
      </form>

      );
   }
}

const FieldGroup = ({ id, label, help, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default Form;

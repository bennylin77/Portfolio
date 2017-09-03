import React from 'react';
import BennyEditor from 'components/editor/BennyEditor.js';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Grid, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
  }
  handleChange(e){
    const { onInputChange } = this.props
    onInputChange(e.target)
  }
  handleDatePickerChange(value){
    const { onStartedAtChange } = this.props
    onStartedAtChange(value)
  }
  render() {
    const { project } = this.props
    const startedAt = moment(project.startedAt);
    return (
      <Grid className="" style={{"padding-top": "100px"}}>
        <Row className="show-grid">
          <Col sm={12} className="">
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
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12} className="">
            <BennyEditor content={this.props.editorContent} onEditorUpdate={this.props.onEditorUpdate} />
          </Col>
        </Row>
      </Grid>
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

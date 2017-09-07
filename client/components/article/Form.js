import React from 'react';
import BennyEditor from 'components/editor/BennyEditor.js';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Grid, Row, Col } from 'react-bootstrap';

export class Form extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    const { onInputChange } = this.props
    onInputChange(e.target)
  }

  render() {
    const { article } = this.props
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
                value={ !article.title ? "": article.title }
                onChange={this.handleChange}
              />
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

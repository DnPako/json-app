import React from 'react';
import { Grid, Form, Select, Divider, Button } from 'semantic-ui-react';
import EmbeddedTable from './EmbeddedTable';

class EditFile extends React.Component {
    // handleChange(e,value) {
    //     const key = value;
    //     const val = this.state.object[value];
    //     const type = typeof(val);
    //     const select = document.querySelector('#type').children[1];
    //     console.log(type);
    //     this.value.value = val;
    //     this.key.value = key;
    // }

    render() {
        return (
            <Grid.Row centered columns={2}>
                <Grid.Column>
                    <Divider hidden />
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label htmlFor="objects">Objects</label>
                                <Select name='objects' placeholder='Select object' options={this.props.options} onChange={(e,{value}) => this.props.handleObjectChange(e,value)}/>
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Grid.Column >
            </Grid.Row>
        )
    }
}


export default EditFile;

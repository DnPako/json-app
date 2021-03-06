import React from 'react';
import { Grid, Form, Select, Divider, Icon } from 'semantic-ui-react';

class EditFile extends React.Component {

    render() {
        return (
            <Grid.Row centered columns={2}>
                <Grid.Column>
                    <Divider hidden />
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field inline>
                                <label htmlFor="objects">Objects</label>
                                <Select name='objects' placeholder='Select object' options={this.props.options} onChange={(e,{value}) => this.props.handleObjectChange(e,value)}/>
                                <Icon name='trash' size='big' link={true} onClick={() => this.props.deleteObject()}/>
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Grid.Column >
            </Grid.Row>
        )
    }
}


export default EditFile;

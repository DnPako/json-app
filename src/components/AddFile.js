import React from 'react';
import { Grid, Form, Select, Divider, Button,Table, Icon, Header } from 'semantic-ui-react';


class AddFile extends React.Component {
    constructor(){
        super();
        this.inObject = [];
        this.displayTable = false;
        this.state = {
            object : {}
        }
    }

    // Cells of embedded object
    renderEmbedded(key){
        return (
            <Table.Row key={key}>
                <Table.Cell>
                    <Form.Field>
                    <input type="text" placeholder="Key"/>
                    </Form.Field>
                </Table.Cell>
                <Table.Cell>
                    <input type="text" placeholder="Key"/>
                </Table.Cell>
                <Table.Cell><Header textAlign='center'><Icon name='add' /></Header></Table.Cell>
            </Table.Row>)
    }

    // Add json object
    addObject() {
        const object = {...this.state.object};
        const key = this.key.value;
        const value = this.value.value;
        const type = this.type;
        switch (type) {
            case 'int':
                object[key] = parseInt(value);
                break;
            case 'float':
                object[key] = parseFloat(value);
                break;
            case 'string':
                object[key] = value;

                break;
            case 'object':
                this.displayTable = true;
                this.inObject.push(key);
                break;
        }
        this.setState({object});
    }

    //Add embedded Object to json
    addEmbeddedOject() {
        console.log('Object added');
    }

    // Cancel adding embedded object to json
    cancelEmbeddedObject(){
        console.log('Cancelling add');
    }

    render() {
        let table = null;
        const  addObjectButton = <Button onClick={() => this.addObject()}>Add to object</Button>;
        const addEmbeddedButtons = <div>
                                        <Divider hidden />
                                        <Button onClick={() => this.addEmbeddedOject()}>Add to embedded object</Button>
                                        <Button onClick={() => this.cancelEmbeddedObject()}>Cancel</Button>
                                  </div>;
        const types = [
                        { key: 'int', value: 'int', text: 'Integer' },
                        { key: 'float', value: 'float', text: 'Number' },
                        { key: 'string', value: 'string', text: 'String' },
                        { key: 'object', value: 'object', text: 'Object' },
                      ];
        if(this.displayTable){
            table = <Table celled>
              <Table.Header>
                    <Table.Row>
                          <Table.HeaderCell>Key</Table.HeaderCell>
                          <Table.HeaderCell>Value</Table.HeaderCell>
                          <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
              </Table.Header>

              <Table.Body>
                          {this.inObject.map(this.renderEmbedded)}
              </Table.Body>
            </Table>;
        }
        return (
            <Grid>
                <Grid.Column>
                    <Divider hidden />
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label htmlFor="key">key</label>
                                <input type="text" placeholder="Key" ref={input => {this.key = input}}/>
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="value">Value</label>
                                <input type="text" placeholder="Value" ref={input => {this.value = input}}/>
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="types">Types</label>
                                <Select name='type' placeholder='Select type' options={types} onChange={(e, { value }) => this.type = value}/>
                            </Form.Field>
                        </Form.Group>
                        {table}
                    </Form>
                    {!this.displayTable ? addObjectButton : addEmbeddedButtons}
                </Grid.Column >
            </Grid>
        )
    }
}


export default AddFile;

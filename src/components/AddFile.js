import React from 'react';
import { Grid, Form, Select, Divider, Button,Table, Icon, Header } from 'semantic-ui-react';
import EmbeddedTable from './EmbeddedTable';


class AddFile extends React.Component {
    constructor(){
        super();
        this.inObject = [];// Keys for embedded object case
        this.displayTable = false;// Display table for embedded object elements
        this.addEmbeddedRow = this.addEmbeddedRow.bind(this);
        this.state = {
            object : {}
        }
    }

    // Type list changes
    handleListChange(e,value) {
        this.inObject = [];
        this.type = value;
        if(value === 'object') {
            this.displayTable = true;
            this.inObject.push(this.key.value);
        }else {
            this.displayTable = false;
        }
        this.forceUpdate();
    }

    // Add json object
    addObject() {
        const object = {...this.state.object};
        const {key, value, type} = this;
        switch (type) {
            case 'int':
                object[key.value] = parseInt(value.value);
                break;
            case 'float':
                object[key.value] = parseFloat(value.value);
                break;
            case 'string':
                object[key.value] = value.value;
                break;
            default:
                break;
        }
        this.setState({object});
        this.key.value = this.value.value = '';
    }

    // add a row to embedded table
    addEmbeddedRow(e) {
        const timestamp = Date.now();
        this.inObject.push(timestamp);
        console.log(timestamp);
        this.forceUpdate();
    }

    //Add json with embedded Object
    addEmbeddedOject() {
        console.log('Object added');
        console.log(this.refs.embeddedTable);
    }

    // Cancel adding json with embedded object
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
            table = <EmbeddedTable
                                    ref='embeddedTable'
                                    inObject={this.inObject}
                                    addEmbeddedRow={this.addEmbeddedRow}>
                     </EmbeddedTable>;
        }else {
            table = null;
        }
        return (
            <Grid>
                <Grid.Column>
                    <Divider hidden />
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label htmlFor="types">Types</label>
                                <Select name='type' placeholder='Select type' options={types} onChange={(e,{value}) => this.handleListChange(e,value)}/>
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="key">key</label>
                                <input type="text" placeholder="Key" ref={input => {this.key = input}}/>
                            </Form.Field>
                            {!this.displayTable ? <Form.Field>
                                <label htmlFor="value">Value</label>
                                <input type="text" placeholder="Value" ref={input => {this.value = input}}/>
                            </Form.Field> : null}
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

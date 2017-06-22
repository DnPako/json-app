import React from 'react';
import { Grid, Form, Select, Divider, Button, Icon } from 'semantic-ui-react';
import EmbeddedTable from './EmbeddedTable';
import EditFile from './EditFile';
import PropTypes from 'prop-types';


class File extends React.Component {
    constructor(){
        super();
        this.displayTable = false;// Display table for embedded object elements
        this.addEmbeddedRow = this.addEmbeddedRow.bind(this);
        this.deleteEmbeddedRow = this.deleteEmbeddedRow.bind(this);
        this.handleObjectChange = this.handleObjectChange.bind(this);
        this.deleteObject = this.deleteObject.bind(this);
        this.state = {
            object : {},
            options : [{key:'null', value:'null',text:''}]
        }
    }

    componentWillMount() {
        this.deleted = false;
        this.path = this.props.match.url.split('/')[2]; // Edit or Add
        if(this.path === 'edit') {
            this.selectedObject = '';
            // Get object
            const objectName = this.props.match.params.idFile;
            const object = JSON.parse(localStorage.getItem(`file-${objectName}`));
            for (var obj in object) {
                const option = {key:obj, value:obj,text:obj}
                this.state.options.push(option)
            }
            this.setState({object});
        }
    }

    handleObjectChange(e,value) {
        this.displayTable = false;
        this.switchInput = false;
        this.inObject = [];
        if(value !== 'null') {
            const key = this.selectedObject = value;
            const val = this.state.object[value];
            const type = typeof(val);
            this.key.value = key;
            if(type === 'object') {
                this.displayTable = true;
                for (var obj in val) {
                    this.inObject.push(obj);
                }
            } else if(type === 'boolean'){
                this.switchInput = true;
            }
        }
        setTimeout(() => {
            if(this.value != null) {
                if(this.switchInput) {
                    this.value.checked =  this.state.object[value]
                }
                 this.value.value = this.state.object[value];
            }else {
                const table = this.refs.embeddedTable;
                for (const [index,key] of this.inObject.entries()) {
                    table[`key${index}`].value = key;
                    table[`value${index}`].value = this.state.object[this.selectedObject][key];
                }
            }
            if(value === 'null') {
                this.value.value = '';
                this.key.value = '';
                this.selectedObject = '';
            }
        }, 100)
        this.forceUpdate();
    }

    // Type list changes
    handleEdit(e,value) {
        if(value !== undefined) {// select case: update or add
            this.type = value;
            this.inObject = [];
            this.displayTable = false;
            this.switchInput = false;
            if(value === 'object') {
                this.displayTable = true;
                this.inObject.push(this.key.value);
            } else if (value === 'bool') {
                this.switchInput = true;
            }
        }
        if(this.path === 'edit' && this.state.object[this.selectedObject] !== undefined) {// Update
            const object = {...this.state.object};
            if(value === undefined) {
                object[this.selectedObject] = e.target.type === 'text' ? e.target.value : e.target.checked;
                this.setState({object});
            }
        }
        this.forceUpdate();
    }

    // Add json object
    addObject() {
        const object = {...this.state.object};
        const {key, value, type} = this;
        switch (type) {
            case 'bool':
                object[key.value] = value.checked;
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
        this.key.value = '';
        type === 'bool' ? this.value.checked = false : this.value.value = '';

    }

    // save object in local
    saveObject() {
        const objectName = this.props.match.params.idFile;
        localStorage.setItem(`file-${objectName}`,JSON.stringify(this.state.object));
    }

    // add a row to embedded table
    addEmbeddedRow() {
        const timestamp = Date.now();
        this.inObject.push(timestamp);
        this.forceUpdate();
    }

    // Delete embedded row
    deleteEmbeddedRow(e) {
        const index = e.target.dataset.index;
        const table = this.refs.embeddedTable;

        console.log(index);
        console.log('here',this.inObject[index]);
        if(this.inObject.length === 1){
            table[`key${index}`].value = '';
            table[`value${index}`].value = '';
        }
        else {
            this.inObject.splice(index,1);
        }
        this.forceUpdate();
    }

    //Add json with embedded Object
    addEmbeddedOject() {
        const object = {...this.state.object};
        const embeddedObject = {};
        const table = this.refs.embeddedTable;
        const objectKey = this.key.value;
        for (const index in this.inObject) {
            if(table[`key${index}`].value !== '' &&  table[`value${index}`] !== '') {
                switch (table[`emtype${index}`]) {
                    case 'bool':
                    embeddedObject[table[`key${index}`].value] = table[`value${index}`].checked;
                    break;
                    case 'float':
                    embeddedObject[table[`key${index}`].value] = parseFloat(table[`value${index}`].value);
                    break;
                    default:
                    embeddedObject[table[`key${index}`].value] = table[`value${index}`].value;
                    break;
                }
                object[objectKey] = embeddedObject;
            }
        }
        this.setState({object});
        this.key.value = '';
        this.cancelEmbeddedObject();
    }

    // Cancel adding json with embedded object
    cancelEmbeddedObject(){
        this.displayTable = false;
        this.switchInput = false;
        this.forceUpdate();
    }

    // Go home
    goHome() {
        this.context.router.history.push(`/`);
    }

    // Delete object from file
    deleteObject(){
        if(this.selectedObject !== '') {
            this.deleted = true;
            const object = {...this.state.object};
            delete object[this.selectedObject];
            this.setState({object});
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if(this.deleted){
            const objectName = this.props.match.params.idFile;
            localStorage.setItem(`file-${objectName}`,JSON.stringify(nextState.object));
        }
    }

    render() {
        let table = null;
        let editList = null;
        let valInput = null;
        const  addObjectButton =    <div>
                                        <Button onClick={() => this.addObject()}>Add to object</Button>
                                        <Button onClick={() => this.saveObject()}>Save</Button>
                                    </div>;
        const addEmbeddedButtons =  <div>
                                        <Divider hidden />
                                        <Button onClick={() => this.addEmbeddedOject()}>Add to embedded object</Button>
                                        <Button onClick={() => this.cancelEmbeddedObject()}>Cancel</Button>
                                    </div>;
        const types = [
                        { key: 'bool', value: 'bool', text: 'Boolean' },
                        { key: 'float', value: 'float', text: 'Number' },
                        { key: 'string', value: 'string', text: 'String' },
                        { key: 'object', value: 'object', text: 'Object' },
                      ];
        valInput = !this.switchInput ? <input type="text" placeholder="Value" ref={input => {this.value = input}} onChange={(e) => this.handleEdit(e)}/> : <input type="checkbox" ref={input => {this.value = input}} onChange={(e) => this.handleEdit(e)}/>;
        table = this.displayTable ? <EmbeddedTable
                                        ref='embeddedTable'
                                        inObject={this.inObject}
                                        addEmbeddedRow={this.addEmbeddedRow}
                                        deleteEmbeddedRow={this.deleteEmbeddedRow}
                                        embeddedObject={this.state.object[this.selectedObject] || ''}></EmbeddedTable> : null;
        editList = this.path === 'edit' ? <EditFile
                                        options={this.state.options}
                                        object={this.state.object}
                                        handleObjectChange={this.handleObjectChange}
                                        deleteObject={this.deleteObject}></EditFile> : null;
        return (
            <Grid>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Icon name='home' size='big' link={true} onClick={() => this.goHome()}/>
                    </Grid.Column>
                </Grid.Row>
                {editList}
                <Grid.Row centered columns={1}>
                    <Grid.Column>
                        <Divider hidden />
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label htmlFor="types">Types</label>
                                    <Select name='type' placeholder='Select type' options={types} onChange={(e,{value}) => this.handleEdit(e,value)}/>
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="key">key</label>
                                    <input type="text" placeholder="Key" disabled={(this.path === 'edit' && this.selectedObject !== '') ? 'disabled' : ''} ref={input => {this.key = input}} onChange={(e) => this.handleEdit(e)}/>
                                </Form.Field>
                                {!this.displayTable ? <Form.Field>
                                    <label htmlFor="value">Value</label>
                                    {valInput}
                                </Form.Field> : null}
                            </Form.Group>
                            {table}
                        </Form>
                        {!this.displayTable ? addObjectButton : addEmbeddedButtons}
                    </Grid.Column >
                </Grid.Row>
            </Grid>
        )
    }
}

File.contextTypes = {
    router : PropTypes.object
}

export default File;

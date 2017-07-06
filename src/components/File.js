import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Form, Select, Divider, Button, Icon } from 'semantic-ui-react';
import EmbeddedTable from './EmbeddedTable';
import EditFile from './EditFile';


class File extends React.Component {
    constructor(){
        super();
        this.displayTable = false;// Display table for embedded object elements
        this.addEmbeddedRow = this.addEmbeddedRow.bind(this);
        this.deleteEmbeddedRow = this.deleteEmbeddedRow.bind(this);
        this.handleObjectChange = this.handleObjectChange.bind(this);
        this.deleteObject = this.deleteObject.bind(this);
        this.state = {
            object: {},
            options: [{key: 'null', value: 'null',text: ''}]
        }
    }

    componentWillMount() {
        this.deleted = false;
        this.path = this.props.match.url.split('/')[2]; // Edit or Add
        if(this.path === 'edit') {
            const options = [...this.state.options];
            this.selectedObject = ''; // La valeur séléctionnée dans le dropdown de la modification
            // Remplir component state avec les valeurs fichiers et liste dropdown
            const objectName = this.props.match.params.idFile;
            const object = JSON.parse(localStorage.getItem(`file-${objectName}`));
            for (var obj of Object.keys(object)) {
                const option = {key:obj, value:obj,text:obj}
                options.push(option)
            }
            this.setState({object,options});
        }
    }

    // Changement dans la liste des fichier 'Modification'
    handleObjectChange(e,value) {
        this.displayTable = false; // Pour afficher ou pas la table des objets embarqués
        this.switchInput = false; // switch entre input et checkbox "this.value"
        this.selectedObject = '';
        this.inObject = []; // Argument à passer pour dessiner les objets embarqués
        if(value !== 'null') { // cas d'une séléction vide
            // Les trois valeur à ajouter dans les champs du formulaire
            const key = value;
            this.selectedObject = value;
            const val = this.state.object[value];
            const type = typeof(val);
            this.key.value = key;
            if(type === 'object') { // Choix d'un type Object
                this.displayTable = true;
                for (var obj of Object.keys(val)) {
                    this.inObject.push(obj);
                }
            } else if(type === 'boolean'){ // Choix d'un type boolean
                this.switchInput = true;
            }
        }
        setTimeout(() => {// Vider ou non les champs après Changements des types
            if(this.value != null) {
                if(this.switchInput) {
                    this.value.checked =  this.state.object[value]
                }
                 this.value.value = this.state.object[value];
            }else {
                const table = this.embeddedTable;
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
        this.setState(this.state);
    }

    // Changement dans le formulaire
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
            this.setState(this.state);
        }
        if(this.path === 'edit' && this.state.object[this.selectedObject] !== undefined) {// Update
            // Ajout direct des modifications à l'objet
            const object = {...this.state.object};
            if(value === undefined) {
                object[this.selectedObject] = e.target.type === 'text' ? e.target.value : e.target.checked;
                this.setState({object});
            }
        }
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
        if(this.path === 'edit') {
            const options = [...this.state.options];
            const option = {key:this.key.value, value:this.key.value,text:this.key.value};
            options.push(option);
            this.setState(options);
        }
        this.setState({object});
        this.key.value = '';
        if(type === 'bool')
            this.value.checked = false;
        else
            this.value.value = '';
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
        this.setState(this.state);
    }

    // Delete embedded row
    deleteEmbeddedRow(e) {
        const index = e.target.dataset.index;
        const table = this.embeddedTable;

        if(this.inObject.length === 1){ // Si la ligne à supprimer est la dernières
            table[`key${index}`].value = '';
            table[`value${index}`].value = '';
        }
        else { // Sinon on supprime la ligne
            this.inObject.splice(index,1);
        }
        this.setState(this.state);
    }

    //Add json with embedded Object
    addEmbeddedOject() {
        const object = {...this.state.object};
        const embeddedObject = {};
        const table = this.embeddedTable;
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
        this.setState(this.state);
    }

    // Go home
    goHome() {
        this.context.router.history.push(`/`);
    }

    // Delete object from file
    deleteObject(){
        if(this.selectedObject !== '') {
            this.deleted = true;// sert pour mettre à jour state
            const object = {...this.state.object};
            const options = [...this.state.options];
            const index = this.state.options.map(obj => obj.key ).indexOf(this.selectedObject);

            options.splice(index,1)
            if(typeof(object[this.selectedObject]) !== 'object')
                this.value.value = '';
            delete object[this.selectedObject];
            this.setState({object,options});
            this.selectedObject = '';
            this.key.value = ''
        }
    }

    componentWillUpdate(nextProps, nextState) {
        // Enregistrer les modifications après la suppression dans localstorage
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
                                        ref={input => {this.embeddedTable = input}}
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
    router: PropTypes.object
};
File.propTypes = {
    match: PropTypes.object.isRequired
}

export default File;

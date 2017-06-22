import React from 'react';
import FileTable from './FileTable';
import PropTypes from 'prop-types';
import { Grid, Form, Select, Icon, Divider } from 'semantic-ui-react';

class Home extends React.Component {
    constructor(){
        super();
        this.deleteFile = this.deleteFile.bind(this);
        this.options = [];// liste à afficher dans le dropdown
        this.state = {
        files : [] }
    }

    componentWillMount() {
        // Récupération des fichiers depuis localstorage
        for (const local in localStorage) {
            if(local.startsWith('file-')) {
                const option = {key:local, value:local.replace(/file-/g,''),text:local.replace(/file-/g,'')}
                this.state.files.push(local);
                this.options.push(option)
            }
        }
    }

    componentDidMount() {
        this.state.files.length > 0 ? this.display = true : this.display = false;
        this.forceUpdate();
    }

    // Naviger vers la page de l'ajout d'un nouveau fichier
    goToFile(e) {
        e.preventDefault();
        this.context.router.history.push(`/file/new/${this.name.value}`);
    }

    // Supprimer fichier depuis local
    deleteFile(key,index) {
        const files = [...this.state.files];
        localStorage.removeItem(key);
        files.splice(index, 1);
        this.options.splice(index, 1);
        this.setState({files});
    }

    handleFileChange(e,value) {
        if(e.target.localName === 'div') {
            this.link = value;
            return;
        }
        this.context.router.history.push(`/file/edit/${this.link}`);
    }

    render() {
        const options = this.options || [{ key: 'null', value: 'null', text: 'No file available'}];
        let fileTable = null;
        if(this.display){
            fileTable = <FileTable
                            files={this.state.files}
                            deleteFile ={this.deleteFile}>
                        </FileTable>;
        }else {
            fileTable = null;
        }
        return (
            <Grid>
                <Grid.Column width={1}></Grid.Column >
                <Grid.Column width={6}>
                    <Divider hidden />
                    <Form>
                        <Form.Group>
                            <Form.Field width={12}>
                                <input type="text" placeholder="Name" ref={input => {this.name = input}}/>
                            </Form.Field>
                            <Form.Field width={1}>
                                <Icon.Group size='big' onClick={(e) => this.goToFile(e)}>
                                    <Icon name='puzzle' link={true}/>
                                    <Icon corner name='add' />
                                </Icon.Group>
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Grid.Column >
                <Grid.Column width={2}>
                    <Divider hidden />
                    <Divider vertical>Or</Divider>
                </Grid.Column >
                <Grid.Column width={1}></Grid.Column >
                <Grid.Column width={6}>
                    <Divider hidden />
                    <Form>
                        <Form.Group>
                            <Form.Field width={12}>
                                <Select placeholder='Select your file' options={options} onChange={(e,{value}) => this.handleFileChange(e,value)}/>
                            </Form.Field>
                            <Form.Field width={1}>
                                <Icon.Group size='big' onClick={(e) => this.handleFileChange(e)}>
                                    <Icon name='edit' link={true}/>
                                    <Icon corner name='add' />
                                </Icon.Group>
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Grid.Column >
                <Grid.Row centered columns={2}>
                    <Grid.Column>
                        {fileTable}
                    </Grid.Column >
                </Grid.Row>
            </Grid>
        )
    }
}

Home.contextTypes = {
    router : PropTypes.object
}

export default Home;

import React from 'react';
import FileTable from './FileTable';
import PropTypes from 'prop-types';
import { Grid, Form, Select, Icon, Divider } from 'semantic-ui-react';

class Home extends React.Component {
    constructor(){
        super();
        this.state = {
        files : [] }
    }

    componentWillMount() {
        for (const local in localStorage) {
            if(local.startsWith('file-')) {
                this.state.files.push(local);
            }
        }
    }

    componentDidMount() {
        this.state.files.length > 0 ? this.display = true : this.display = false;
        this.forceUpdate();
    }

    goToFile(e) {
        e.preventDefault();
        this.context.router.history.push(`/file/new/${this.name.value}`);
    }


    render() {
        const options = [{ key: 'af', value: 'af', text: 'Choose file' }];
        let fileTable = null;
        if(this.display){
            fileTable = <FileTable
                            files = {this.state.files}>
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
                                    <Icon name='puzzle' />
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
                                <Select placeholder='Select your file' options={options} />
                            </Form.Field>
                            <Form.Field width={1}>
                                <Icon.Group size='big'>
                                    <Icon name='edit' />
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

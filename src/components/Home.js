import React from 'react';
import { Grid, Form, Select, Icon, Divider } from 'semantic-ui-react';

class Home extends React.Component {
    render() {
        const options = [{ key: 'af', value: 'af', text: 'Choose file' }];
        return (
            <Grid>
                <Grid.Column width={1}></Grid.Column >
                <Grid.Column width={6}>
                    <Divider hidden />
                    <Form>
                        <Form.Group>
                            <Form.Field width={12}>
                                <input type="text" placeholder="Name"/>
                            </Form.Field>
                            <Form.Field width={1}>
                                <Icon.Group size='big'>
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
            </Grid>
        )
    }
}


export default Home;

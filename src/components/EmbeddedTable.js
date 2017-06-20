import React from 'react';
import { Grid, Form, Select, Divider, Button,Table, Icon, Header } from 'semantic-ui-react';


class EmbeddedTable extends React.Component {
    // Add The Embedded obejct to the file
    addEmbedded(e) {
        console.log('test');
    }

    render() {
        const inObject = this.props.inObject;
        return (
            <Table celled>
              <Table.Header>
                    <Table.Row>
                          <Table.HeaderCell>Key</Table.HeaderCell>
                          <Table.HeaderCell>Value</Table.HeaderCell>
                          <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
              </Table.Header>

              <Table.Body>
                          {inObject.map((key,index) => {
                              return (<Table.Row key={index}>
                                  <Table.Cell>
                                      <Form.Field>
                                      <input type="text" placeholder="Key"/>
                                      </Form.Field>
                                  </Table.Cell>
                                  <Table.Cell>
                                      <input type="text" placeholder="Key"/>
                                  </Table.Cell>
                                  <Table.Cell><Header textAlign='center'><a><Icon name='add' onClick={(e) => this.addEmbedded(e)}/></a></Header></Table.Cell>
                              </Table.Row>)
                          })}
              </Table.Body>
            </Table>

        )
    }
}


export default EmbeddedTable;

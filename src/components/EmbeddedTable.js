import React from 'react';
import { Grid, Form, Select, Divider, Button,Table, Icon, Header } from 'semantic-ui-react';


class EmbeddedTable extends React.Component {

    render() {
        const inObject = this.props.inObject;
        const types = [
                        { key: 'int', value: 'int', text: 'Integer' },
                        { key: 'float', value: 'float', text: 'Number' },
                        { key: 'string', value: 'string', text: 'String' },
                      ];
        return (
            <Table celled>
              <Table.Header>
                    <Table.Row>
                          <Table.HeaderCell>Key</Table.HeaderCell>
                          <Table.HeaderCell>Value</Table.HeaderCell>
                          <Table.HeaderCell>Type</Table.HeaderCell>
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
                                  <Table.Cell>
                                      <Form.Field>
                                          <Select name='emtype' placeholder='Select type' options={types} onChange={(e, { value }) => this.emtype = value}/>
                                      </Form.Field>
                                  </Table.Cell>
                                  <Table.Cell><Header textAlign='center'><a><Icon name='add' onClick={this.props.addEmbeddedRow}/></a></Header></Table.Cell>
                              </Table.Row>)
                          })}
              </Table.Body>
            </Table>

        )
    }
}


export default EmbeddedTable;
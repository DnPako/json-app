import React from 'react';
import { Table, Header, Icon } from 'semantic-ui-react';


class FileTable extends React.Component {
    render() {
        const files = this.props.files;
        return (
            <Table celled>
              <Table.Header>
                    <Table.Row>
                          <Table.HeaderCell>File</Table.HeaderCell>
                          <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
              </Table.Header>

              <Table.Body>
                          {files.map((key,index) => {
                              return (<Table.Row key={index}>
                                  <Table.Cell>
                                    {key.replace(/file-/g,'')}
                                  </Table.Cell>
                                  <Table.Cell><Header textAlign='center'><a><Icon name='delete' onClick={() => this.props.deleteFile(key,index)}/></a></Header></Table.Cell>
                              </Table.Row>)
                          })}
              </Table.Body>
            </Table>
        )
    }
}


export default FileTable;

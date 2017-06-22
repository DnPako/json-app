import React from 'react';
import Home from './components/Home';
import File from './components/File';
import {render} from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Container, Grid} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const Root = () => {
    return(
        <Container fluid >
            <Grid>
                 <Grid.Column width={16}>
                    <Router>
                        <main>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route path="/file/new/:idFile" component={File}/>
                                <Route path="/file/edit/:idFile" component={File}/>
                            </Switch>
                        </main>
                    </Router>
                 </Grid.Column>
            </Grid>
        </Container>
    )
}

render(<Root/>, document.querySelector('#root'))

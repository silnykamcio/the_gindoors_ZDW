import React from 'react';
import {Button, ButtonToolbar, ControlLabel, FlexboxGrid, Form, FormControl, FormGroup, Panel} from "rsuite";


const ExampleComponent = (props) => {
    return (<>
            <FlexboxGrid justify="center" align="middle" style={{height: '100%'}}>
                <FlexboxGrid.Item colspan={12}>
                    <Panel header={<h3>Login</h3>} bordered>
                        <Form fluid>
                            <FormGroup>
                                <ControlLabel>Username or email address</ControlLabel>
                                <FormControl name="name"/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Password</ControlLabel>
                                <FormControl name="password" type="password"/>
                            </FormGroup>
                            <FormGroup>
                                <ButtonToolbar>
                                    <Button appearance="primary" onClick={() => {
                                        props.changeActualPage(0)
                                    }
                                    }>{props.actualPage}</Button>
                                    <Button appearance="link">Forgot password?</Button>
                                </ButtonToolbar>
                            </FormGroup>
                        </Form>
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </>

    )
};

export default ExampleComponent;

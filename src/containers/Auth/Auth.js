import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Aux from '../../hoc/Aux';
import * as  actions from '../../store/actions/index';
import classes from './Auth.module.css';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controls: {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    valid: false,
                    touched: false
                }
            },
            isSignup: true
        }
    }

    checkValidity = (value, validation) => {
        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }
        if (validation.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls})
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        })
    }

    authRender = (formContents) => {
        if(this.props.userId) {
            return (
                <Redirect to="/" />
            )
        }
        return (
            <div className={classes.AuthForm}>
                <div>User Authentication</div>
                <form onSubmit={this.submitHandler}>
                   {formContents}
                   <Button btnType="Success" >Submit</Button>
                   <Button 
                        btnType="Danger"
                        clicked={this.switchAuthModeHandler}
                        type="button"
                    >Switch to {this.state.isSignup ? 'Signin' : 'Signup'}</Button> 
                </form>
            </div>
        )
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formElement => {
            return (<Input 
                key={formElement.id}
                type={formElement.config.elementConfig.type}
                elementtype={formElement.config.elementConfig.elementType}
                value={formElement.config.value}
                invalid={(!formElement.config.valid).toString()}
                shouldvalidate={formElement.config.validation.required.toString()}
                touched={formElement.config.touched.toString()}
                placeholder={formElement.config.elementConfig.placeholder}
                onChange={(event) => this.inputChangedHandler(event, formElement.id)}
            />);
        })
        return (
            <Aux>
                {this.authRender(form)}
            </Aux>
        );
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
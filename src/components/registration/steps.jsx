/* eslint-disable react/no-multi-comp */
const bindAll = require('lodash.bindall');
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const omit = require('lodash.omit');
const PropTypes = require('prop-types');
const React = require('react');

const api = require('../../lib/api');
const countryData = require('../../lib/country-data');
const intl = require('../../lib/intl.jsx');

const Avatar = require('../../components/avatar/avatar.jsx');
const Button = require('../../components/forms/button.jsx');
const Captcha = require('../../components/captcha/captcha.jsx');
const Card = require('../../components/card/card.jsx');
const CharCount = require('../../components/forms/charcount.jsx');
const Checkbox = require('../../components/forms/checkbox.jsx');
const CheckboxGroup = require('../../components/forms/checkbox-group.jsx');
const Form = require('../../components/forms/form.jsx');
const GeneralError = require('../../components/forms/general-error.jsx');
const Input = require('../../components/forms/input.jsx');
const RadioGroup = require('../../components/forms/radio-group.jsx');
const Select = require('../../components/forms/select.jsx');
const Slide = require('../../components/slide/slide.jsx');
const Spinner = require('../../components/spinner/spinner.jsx');
const StepNavigation = require('../../components/stepnavigation/stepnavigation.jsx');
const TextArea = require('../../components/forms/textarea.jsx');
const Tooltip = require('../../components/tooltip/tooltip.jsx');
const ValidationMessage = require('../../components/forms/validation-message.jsx');

require('./steps.scss');

const DEFAULT_COUNTRY = 'us';

/**
 * Return a list of options to give to select
 * @param  {object} reactIntl      react-intl, used to localize strings
 * @return {object}                ordered set of county options formatted for select
 */
const getCountryOptions = reactIntl => (
    [
        {
            label: reactIntl.formatMessage({id: 'registration.selectCountry'}),
            disabled: true,
            value: ''
        },
        ...countryData.registrationCountryCodeOptions
    ]
);

const NextStepButton = props => (
    <Button
        className="card-button"
        disabled={props.waiting}
        type="submit"
        {...omit(props, ['text', 'waiting'])}
    >
        {props.waiting ?
            <Spinner /> :
            props.text
        }
    </Button>
);

NextStepButton.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    waiting: PropTypes.bool
};

NextStepButton.defaultProps = {
    waiting: false,
    text: 'Next Step'
};


/*
 * USERNAME STEP
 */
class UsernameStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChangeShowPassword',
            'handleUsernameBlur',
            'handleValidSubmit',
            'validateUsername',
            'handleFocus'
        ]);
        this.state = {
            showPassword: props.showPassword,
            waiting: false,
            showUsernameTip: true,
            validUsername: ''
        };
    }
    handleChangeShowPassword (field, value) {
        this.setState({showPassword: value});
    }
    validateUsername (username, callback) {
        callback = callback || function () {};

        if (!username) {
            this.form.formsy.updateInputsWithError({
                'user.username': this.props.intl.formatMessage({id: 'form.validationRequired'})
            });
            return callback(false);
        }

        api({
            uri: `/accounts/checkusername/${username}/`
        }, (err, body, res) => {
            if (err || res.statusCode !== 200) {
                err = err || this.props.intl.formatMessage({id: 'general.error'});
                this.form.formsy.updateInputsWithError({all: err});
                return callback(false);
            }
            // get the message in a way that will work for both scratchr2 and api
            // versions of the checkusername endpoint
            let msg = '';
            if (body && body.msg) msg = body.msg;
            else if (body && body[0]) msg = body[0].msg;

            switch (msg) {
            case 'valid username':
                this.setState({
                    validUsername: 'pass'
                });
                return callback(true);
            case 'username exists':
                this.form.formsy.updateInputsWithError({
                    'user.username': this.props.intl.formatMessage({
                        id: 'registration.validationUsernameExists'
                    })
                });
                return callback(false);
            case 'bad username':
                this.form.formsy.updateInputsWithError({
                    'user.username': this.props.intl.formatMessage({
                        id: 'registration.validationUsernameVulgar'
                    })
                });
                return callback(false);
            case 'invalid username':
            default:
                this.form.formsy.updateInputsWithError({
                    'user.username': this.props.intl.formatMessage({
                        id: 'registration.validationUsernameNotAllowed'
                    })
                });
                return callback(false);
            }
        });
    }
    handleUsernameBlur (name, value) {
        if (this.form.formsy.inputs[0].isValidValue(value)) {
            this.validateUsername(value);
        }
    }
    handleValidSubmit (formData) {
        this.setState({waiting: true});
        this.validateUsername(formData.user.username, isValid => {
            this.setState({waiting: false});
            if (isValid) return this.props.onNextStep(formData);
        });
    }
    handleFocus () {
        this.setState({showUsernameTip: false});
    }
    render () {
        return (
            <Slide className="registration-step username-step">
                <h2>
                    {this.props.title ? (
                        this.props.title
                    ) : (
                        <intl.FormattedMessage id="registration.usernameStepTitle" />
                    )}
                </h2>
                <p className="description">
                    {this.props.description ? (
                        this.props.description
                    ) : (
                        <span>
                            <intl.FormattedMessage id="registration.usernameStepDescription" />&nbsp;
                            <b>
                                <intl.FormattedMessage id="registration.usernameStepRealName" />
                            </b>
                        </span>
                    )}
                    {this.props.tooltip ? (
                        <Tooltip
                            tipContent={this.props.tooltip}
                            title={'?'}
                        />
                    ) : (
                        null
                    )}
                </p>
                <Card>
                    <Form
                        ref={form => {
                            this.form = form;
                        }}
                        onValidSubmit={this.handleValidSubmit}
                    >
                        <div className="form-group row">
                            <label className="username-label col-sm-3">
                                {this.props.intl.formatMessage({id: 'registration.createUsername'})}
                                {this.props.usernameHelp ? (
                                    <p className="help-text">{this.props.usernameHelp}</p>
                                ) : (
                                    null
                                )}
                            </label>
                            { this.state.showUsernameTip &&
                                <ValidationMessage
                                    className={'validation-full-width-input'}
                                    message={this.props.intl.formatMessage({id: 'registration.usernameAdviceShort'})}
                                    mode="info"
                                />
                            }
                            <Input
                                required
                                className={this.state.validUsername}
                                name="user.username"
                                type="text"
                                validationErrors={{
                                    matchRegexp: this.props.intl.formatMessage({
                                        id: 'registration.validationUsernameRegexp'
                                    }),
                                    minLength: this.props.intl.formatMessage({
                                        id: 'registration.validationUsernameMinLength'
                                    }),
                                    maxLength: this.props.intl.formatMessage({
                                        id: 'registration.validationUsernameMaxLength'
                                    })
                                }}
                                validations={{
                                    matchRegexp: /^[\w-]*$/,
                                    minLength: 3,
                                    maxLength: 20
                                }}
                                onBlur={this.handleUsernameBlur}
                                onFocus={this.handleFocus}
                            />
                        </div>
                        <Input
                            required
                            label={
                                this.props.intl.formatMessage({id: 'general.password'})
                            }
                            name="user.password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            validationErrors={{
                                minLength: this.props.intl.formatMessage({
                                    id: 'registration.validationPasswordLength'
                                }),
                                notEquals: this.props.intl.formatMessage({
                                    id: 'registration.validationPasswordNotEquals'
                                }),
                                notEqualsField: this.props.intl.formatMessage({
                                    id: 'registration.validationPasswordNotUsername'
                                })
                            }}
                            validations={{
                                minLength: 6,
                                notEquals: 'password',
                                notEqualsField: 'user.username'
                            }}
                        />

                        <Checkbox
                            help={null}
                            name="showPassword"
                            value={this.state.showPassword}
                            valueLabel={
                                this.props.intl.formatMessage({id: 'registration.showPassword'})
                            }
                            onChange={this.handleChangeShowPassword}
                        />
                        <GeneralError name="all" />
                        <NextStepButton
                            text={<intl.FormattedMessage id="registration.nextStep" />}
                            waiting={this.props.waiting || this.state.waiting}
                        />
                    </Form>
                </Card>
                <StepNavigation
                    active={this.props.activeStep}
                    steps={this.props.totalSteps - 1}
                />
            </Slide>
        );
    }
}

UsernameStep.propTypes = {
    activeStep: PropTypes.number,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    intl: intl.intlShape,
    onNextStep: PropTypes.func,
    showPassword: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    totalSteps: PropTypes.number,
    usernameHelp: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    waiting: PropTypes.bool
};

UsernameStep.defaultProps = {
    showPassword: false,
    waiting: false
};

const IntlUsernameStep = injectIntl(UsernameStep);


/*
 * PASSWORD STEP
 */
class ChoosePasswordStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChangeShowPassword'
        ]);
        this.state = {
            showPassword: props.showPassword
        };
    }
    handleChangeShowPassword (field, value) {
        this.setState({showPassword: value});
    }
    render () {
        return (
            <Slide className="registration-step choose-password-step">
                <h2>
                    {this.props.intl.formatMessage({id: 'registration.choosePasswordStepTitle'})}
                </h2>
                <p className="description">
                    <intl.FormattedMessage id="registration.choosePasswordStepDescription" />
                    <Tooltip
                        tipContent={
                            this.props.intl.formatMessage({id: 'registration.choosePasswordStepTooltip'})
                        }
                        title={'?'}
                    />
                </p>

                <Card>
                    <Form onValidSubmit={this.props.onNextStep}>
                        <Input
                            required
                            label={
                                this.props.intl.formatMessage({id: 'registration.newPassword'})
                            }
                            name="user.password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            validationErrors={{
                                minLength: this.props.intl.formatMessage({
                                    id: 'registration.validationPasswordLength'
                                }),
                                notEquals: this.props.intl.formatMessage({
                                    id: 'registration.validationPasswordNotEquals'
                                }),
                                notEqualsUsername: this.props.intl.formatMessage({
                                    id: 'registration.validationPasswordNotUsername'
                                })
                            }}
                            validations={{
                                minLength: 6,
                                notEquals: 'password',
                                notEqualsUsername: this.props.username
                            }}
                        />
                        <Checkbox
                            help={null}
                            name="showPassword"
                            value={this.state.showPassword}
                            valueLabel={
                                this.props.intl.formatMessage({id: 'registration.showPassword'})
                            }
                            onChange={this.handleChangeShowPassword}
                        />
                        <NextStepButton
                            text={<intl.FormattedMessage id="registration.nextStep" />}
                            waiting={this.props.waiting || this.state.waiting}
                        />
                    </Form>
                </Card>
                <StepNavigation
                    active={this.props.activeStep}
                    steps={this.props.totalSteps - 1}
                />
            </Slide>
        );
    }
}

ChoosePasswordStep.propTypes = {
    activeStep: PropTypes.number,
    intl: intlShape,
    onNextStep: PropTypes.func,
    showPassword: PropTypes.bool,
    totalSteps: PropTypes.number,
    username: PropTypes.string,
    waiting: PropTypes.bool
};

ChoosePasswordStep.defaultProps = {
    showPassword: false,
    username: null,
    waiting: false
};

const IntlChoosePasswordStep = injectIntl(ChoosePasswordStep);


/*
 * DEMOGRAPHICS STEP
 */
class DemographicsStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'birthDateValidator',
            'countryValidator',
            'getCountryName',
            'getMonthOptions',
            'getYearOptions',
            'handleChooseGender',
            'handleValidSubmit',
            'isValidBirthdate'
        ]);
        this.state = {
            otherDisabled: true
        };
    }
    getMonthOptions () {
        return [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ].map((label, id) => ({
            value: (id + 1).toString(),
            label: this.props.intl.formatMessage({id: `general.month${label}`})
        }));
    }
    getYearOptions () {
        return Array(...Array(100)).map((v, id) => {
            const year = (new Date().getFullYear() - (id + this.props.birthOffset)).toString();
            return {value: year, label: year};
        });
    }
    handleChooseGender (name, gender) {
        this.setState({otherDisabled: gender !== 'other'});
    }
    // look up country name using user's country code selection ('us' -> 'United States')
    getCountryName (values) {
        if (values.countryCode) {
            const countryInfo = countryData.lookupCountryByCode(values.countryCode);
            if (countryInfo) {
                return countryInfo.name;
            }
        }
        return null;
    }
    // look up country code from country label ('United States' -> 'us')
    // if `countryName` is not found, including if it's null or undefined, then this function will return undefined.
    getCountryCode (countryName) {
        const country = countryData.lookupCountryByName(countryName);
        return country && country.code;
    }
    handleValidSubmit (formData) {
        const countryName = this.getCountryName(formData);
        if (countryName && formData.user) {
            formData.user.country = countryName;
            return this.props.onNextStep(formData);
        }
        return false;
    }
    isValidBirthdate (year, month) {
        const birthdate = new Date(
            year,
            month - 1,
            1
        );
        return (((Date.now() - birthdate) / (24 * 3600 * 1000 * 365.25)) >= this.props.birthOffset);
    }
    birthDateValidator (values) {
        const isValid = this.isValidBirthdate(values['user.birth.year'], values['user.birth.month']);
        return isValid ? true : this.props.intl.formatMessage({id: 'teacherRegistration.validationAge'});
    }
    countryValidator (values) {
        const countryName = this.getCountryName(values);
        if (countryName) return true;
        return this.props.intl.formatMessage({id: 'general.invalidSelection'});
    }
    render () {
        const countryOptions = getCountryOptions(this.props.intl);
        return (
            <Slide className="registration-step demographics-step">
                <h2>
                    <intl.FormattedMessage id="registration.personalStepTitle" />
                </h2>
                <p className="description">
                    {this.props.description ?
                        this.props.description :
                        <intl.FormattedMessage id="registration.personalStepDescription" />
                    }
                    <Tooltip
                        tipContent={
                            this.props.intl.formatMessage({id: 'registration.nameStepTooltip'})
                        }
                        title={'?'}
                    />
                </p>
                <Card>
                    <Form onValidSubmit={this.handleValidSubmit}>
                        <Select
                            required
                            label={
                                this.props.intl.formatMessage({id: 'general.birthMonth'})
                            }
                            name="user.birth.month"
                            options={this.getMonthOptions()}
                            validations={{
                                birthDateVal: values => this.birthDateValidator(values)
                            }}
                        />
                        <Select
                            required
                            label={
                                this.props.intl.formatMessage({id: 'general.birthYear'})
                            }
                            name="user.birth.year"
                            options={this.getYearOptions()}
                        />
                        <RadioGroup
                            required
                            label={
                                this.props.intl.formatMessage({id: 'general.gender'})
                            }
                            name="user.gender"
                            options={[
                                {
                                    value: 'female',
                                    label: this.props.intl.formatMessage({id: 'general.female'})
                                },
                                {
                                    value: 'male',
                                    label: this.props.intl.formatMessage({id: 'general.male'})
                                },
                                {
                                    value: 'other',
                                    label: <Input
                                        className="demographics-step-input-other"
                                        disabled={this.state.otherDisabled}
                                        help={null}
                                        name="user.genderOther"
                                        required={!this.state.otherDisabled}
                                        type="text"
                                        validationErrors={{
                                            maxLength: this.props.intl.formatMessage({
                                                id: 'registration.validationMaxLength'
                                            })
                                        }}
                                        validations={{
                                            maxLength: 25
                                        }}
                                    />
                                }
                            ]}
                            onChange={this.handleChooseGender}
                        />
                        <Select
                            required
                            label={this.props.intl.formatMessage({id: 'general.country'})}
                            name="countryCode"
                            options={countryOptions}
                            validations={{
                                countryVal: values => this.countryValidator(values)
                            }}
                            value={this.getCountryCode(this.props.countryName) || countryOptions[0].value}
                        />
                        <Checkbox
                            className="demographics-checkbox-is-robot"
                            name="user.isRobot"
                            valueLabel="I'm a robot!"
                        />
                        <NextStepButton
                            text={<intl.FormattedMessage id="registration.nextStep" />}
                            waiting={this.props.waiting}
                        />
                    </Form>
                </Card>
                <StepNavigation
                    active={this.props.activeStep}
                    steps={this.props.totalSteps - 1}
                />
            </Slide>
        );
    }
}

DemographicsStep.propTypes = {
    activeStep: PropTypes.number,
    birthOffset: PropTypes.number,
    countryName: PropTypes.string, // like 'United States', not 'US' or 'United States of America'
    description: PropTypes.string,
    intl: intlShape,
    onNextStep: PropTypes.func,
    totalSteps: PropTypes.number,
    waiting: PropTypes.bool
};

DemographicsStep.defaultProps = {
    waiting: false,
    description: null,
    birthOffset: 0
};

const IntlDemographicsStep = injectIntl(DemographicsStep);


/*
 * NAME STEP
 */
const NameStep = props => (
    <Slide className="registration-step name-step">
        <h2>
            <intl.FormattedHTMLMessage id="teacherRegistration.nameStepTitle" />
        </h2>
        <p className="description">
            <intl.FormattedMessage id="teacherRegistration.nameStepDescription" />
            <Tooltip
                tipContent={
                    props.intl.formatMessage({id: 'registration.nameStepTooltip'})
                }
                title={'?'}
            />
        </p>
        <Card>
            <Form onValidSubmit={props.onNextStep}>
                <Input
                    required
                    label={
                        props.intl.formatMessage({id: 'teacherRegistration.firstName'})
                    }
                    name="user.name.first"
                    type="text"
                    validationErrors={{
                        maxLength: props.intl.formatMessage({
                            id: 'registration.validationMaxLength'
                        })
                    }}
                    validations={{
                        maxLength: 50
                    }}
                />
                <Input
                    required
                    label={
                        props.intl.formatMessage({id: 'teacherRegistration.lastName'})
                    }
                    name="user.name.last"
                    type="text"
                    validationErrors={{
                        maxLength: props.intl.formatMessage({
                            id: 'registration.validationMaxLength'
                        })
                    }}
                    validations={{
                        maxLength: 50
                    }}
                />
                <NextStepButton
                    text={<intl.FormattedMessage id="registration.nextStep" />}
                    waiting={props.waiting}
                />
            </Form>
        </Card>
        <StepNavigation
            active={props.activeStep}
            steps={props.totalSteps - 1}
        />
    </Slide>
);

NameStep.propTypes = {
    activeStep: PropTypes.number,
    intl: intlShape,
    onNextStep: PropTypes.func,
    totalSteps: PropTypes.number,
    waiting: PropTypes.bool
};

NameStep.defaultProps = {
    waiting: false
};

const IntlNameStep = injectIntl(NameStep);


/*
 * ORGANIZATION STEP
 */
const ORGANIZATION_L10N_STEMS = [
    'orgChoiceElementarySchool',
    'orgChoiceMiddleSchool',
    'orgChoiceHighSchool',
    'orgChoiceUniversity',
    'orgChoiceAfterschool',
    'orgChoiceMuseum',
    'orgChoiceLibrary',
    'orgChoiceCamp'
];

class OrganizationStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'getOrganizationOptions',
            'handleChooseOrganization'
        ]);
        this.state = {
            otherDisabled: true
        };
    }
    getOrganizationOptions () {
        const options = ORGANIZATION_L10N_STEMS.map((choice, id) => ({
            value: id.toString(),
            label: this.props.intl.formatMessage({
                id: `teacherRegistration.${choice}`
            })
        }));
        // Add "Other" option with empty string, since input field is used
        const otherId = options.length.toString();
        options.push({value: otherId, label: ' '});
        return options;
    }
    handleChooseOrganization (name, values) {
        this.setState({
            otherDisabled: values.indexOf(ORGANIZATION_L10N_STEMS.length.toString()) === -1
        });
    }
    render () {
        return (
            <Slide className="registration-step organization-step">
                <h2>
                    <intl.FormattedMessage id="teacherRegistration.organization" />
                </h2>
                <p className="description">
                    <intl.FormattedMessage id="teacherRegistration.privacyDescription" />
                    <Tooltip
                        tipContent={
                            this.props.intl.formatMessage({id: 'registration.nameStepTooltip'})
                        }
                        title={'?'}
                    />
                </p>
                <Card>
                    <Form onValidSubmit={this.props.onNextStep}>
                        <Input
                            required
                            label={
                                this.props.intl.formatMessage({id: 'teacherRegistration.organization'})
                            }
                            name="organization.name"
                            type="text"
                            validationErrors={{
                                maxLength: this.props.intl.formatMessage({
                                    id: 'registration.validationMaxLength'
                                })
                            }}
                            validations={{
                                maxLength: 50
                            }}
                        />
                        <Input
                            required
                            label={this.props.intl.formatMessage({id: 'teacherRegistration.orgTitle'})}
                            name="organization.title"
                            type="text"
                            validationErrors={{
                                maxLength: this.props.intl.formatMessage({
                                    id: 'registration.validationMaxLength'
                                })
                            }}
                            validations={{
                                maxLength: 50
                            }}
                        />
                        <div className="organization-type">
                            <b><intl.FormattedMessage id="teacherRegistration.orgType" /></b>
                            <p className="help-text">
                                <intl.FormattedMessage id="teacherRegistration.checkAll" />
                            </p>
                            <CheckboxGroup
                                required
                                name="organization.type"
                                options={this.getOrganizationOptions()}
                                validationErrors={{
                                    minLength: this.props.intl.formatMessage({
                                        id: 'form.validationRequired'
                                    })
                                }}
                                validations={{
                                    minLength: 1
                                }}
                                value={[]}
                                onChange={this.handleChooseOrganization}
                            />
                        </div>
                        <div className="other-input">
                            <Input
                                disabled={this.state.otherDisabled}
                                help={null}
                                name="organization.other"
                                placeholder={
                                    this.props.intl.formatMessage({id: 'general.other'})
                                }
                                required={!this.state.otherDisabled}
                                type="text"
                                validationErrors={{
                                    maxLength: this.props.intl.formatMessage({
                                        id: 'registration.validationMaxLength'
                                    })
                                }}
                                validations={{
                                    maxLength: 50
                                }}
                            />
                        </div>
                        <div className="url-input">
                            <b><intl.FormattedMessage id="general.website" /></b>
                            <p className="help-text">
                                <intl.FormattedMessage id="teacherRegistration.notRequired" />
                            </p>
                            <Input
                                name="organization.url"
                                placeholder={'http://'}
                                required="isFalse"
                                type="url"
                                validationErrors={{
                                    maxLength: this.props.intl.formatMessage({
                                        id: 'registration.validationMaxLength'
                                    })
                                }}
                                validations={{
                                    maxLength: 200
                                }}
                            />
                        </div>
                        <NextStepButton
                            text={<intl.FormattedMessage id="registration.nextStep" />}
                            waiting={this.props.waiting}
                        />
                    </Form>
                </Card>
                <StepNavigation
                    active={this.props.activeStep}
                    steps={this.props.totalSteps - 1}
                />
            </Slide>
        );
    }
}

OrganizationStep.propTypes = {
    activeStep: PropTypes.number,
    intl: intlShape,
    onNextStep: PropTypes.func,
    totalSteps: PropTypes.number,
    waiting: PropTypes.bool
};

OrganizationStep.defaultProps = {
    waiting: false
};

const IntlOrganizationStep = injectIntl(OrganizationStep);


/*
 * ADDRESS STEP
 */
class AddressStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChangeCountry'
        ]);
        this.state = {
            countryChoice: props.defaultCountry,
            waiting: false
        };
    }
    handleChangeCountry (field, choice) {
        this.setState({countryChoice: choice});
    }
    render () {
        let stateOptions = countryData.subdivisionOptions[this.state.countryChoice];
        stateOptions = [{}].concat(stateOptions);
        const countryOptions = getCountryOptions(this.props.intl);
        return (
            <Slide className="registration-step address-step">
                <h2>
                    <intl.FormattedMessage id="teacherRegistration.addressStepTitle" />
                </h2>
                <p className="description">
                    <intl.FormattedMessage id="teacherRegistration.privacyDescription" />
                    <Tooltip
                        tipContent={
                            this.props.intl.formatMessage({id: 'registration.nameStepTooltip'})
                        }
                        title={'?'}
                    />
                </p>
                <Card>
                    <Form onValidSubmit={this.props.onNextStep}>
                        <Select
                            required
                            label={
                                this.props.intl.formatMessage({id: 'general.country'})
                            }
                            name="address.country"
                            options={countryOptions}
                            value={this.props.defaultCountry}
                            onChange={this.handleChangeCountry}
                        />
                        <Input
                            required
                            label={
                                this.props.intl.formatMessage({id: 'teacherRegistration.addressLine1'})
                            }
                            name="address.line1"
                            type="text"
                            validationErrors={{
                                maxLength: this.props.intl.formatMessage({
                                    id: 'registration.validationMaxLength'
                                })
                            }}
                            validations={{
                                maxLength: 100
                            }}
                        />
                        <Input
                            label={
                                this.props.intl.formatMessage({id: 'teacherRegistration.addressLine2'})
                            }
                            name="address.line2"
                            required="isFalse"
                            type="text"
                            validationErrors={{
                                maxLength: this.props.intl.formatMessage({
                                    id: 'registration.validationMaxLength'
                                })
                            }}
                            validations={{
                                maxLength: 100
                            }}
                        />
                        <Input
                            required
                            label={
                                this.props.intl.formatMessage({id: 'teacherRegistration.city'})
                            }
                            name="address.city"
                            type="text"
                            validationErrors={{
                                maxLength: this.props.intl.formatMessage({
                                    id: 'registration.validationMaxLength'
                                })
                            }}
                            validations={{
                                maxLength: 50
                            }}
                        />
                        {stateOptions.length > 2 ?
                            <Select
                                label={
                                    this.props.intl.formatMessage({id: 'teacherRegistration.stateProvince'})
                                }
                                name="address.state"
                                options={stateOptions}
                                required={(this.state.countryChoice === 'us')}
                            /> : []
                        }
                        <b className="row-label">
                            <intl.FormattedMessage id="teacherRegistration.zipCode" />
                        </b>
                        {this.state.countryChoice === 'us' ? [] : <p className="help-text">
                            <intl.FormattedMessage id="teacherRegistration.notRequired" />
                        </p>}
                        <Input
                            name="address.zip"
                            required={(this.state.countryChoice === 'us') ? true : 'isFalse'}
                            type="text"
                            validationErrors={{
                                maxLength: this.props.intl.formatMessage({
                                    id: 'registration.validationMaxLength'
                                })
                            }}
                            validations={{
                                maxLength: 10
                            }}
                        />
                        <GeneralError name="all" />
                        <NextStepButton
                            text={<intl.FormattedMessage id="registration.nextStep" />}
                            waiting={this.props.waiting || this.state.waiting}
                        />
                    </Form>
                </Card>
                <StepNavigation
                    active={this.props.activeStep}
                    steps={this.props.totalSteps - 1}
                />
            </Slide>
        );
    }
}

AddressStep.propTypes = {
    activeStep: PropTypes.number,
    defaultCountry: PropTypes.string,
    intl: intlShape,
    onNextStep: PropTypes.func,
    totalSteps: PropTypes.number,
    waiting: PropTypes.bool
};

AddressStep.defaultProps = {
    defaultCountry: DEFAULT_COUNTRY,
    waiting: false
};

const IntlAddressStep = injectIntl(AddressStep);


/*
 * USE SCRATCH STEP
 */
class UseScratchStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleTyping'
        ]);
        this.state = {
            characterCount: 0
        };
    }
    handleTyping (name, value) {
        this.setState({
            characterCount: value.length
        });
    }
    render () {
        const textAreaClass = (this.state.characterCount > this.props.maxCharacters) ? 'fail' : '';
        return (
            <Slide className="registration-step usescratch-step">
                <h2>
                    <intl.FormattedMessage id="teacherRegistration.useScratchStepTitle" />
                </h2>
                <p className="description">
                    <intl.FormattedMessage id="teacherRegistration.useScratchStepDescription" />
                    <Tooltip
                        tipContent={
                            this.props.intl.formatMessage({id: 'registration.nameStepTooltip'})
                        }
                        title={'?'}
                    />
                </p>
                <Card>
                    <Form onValidSubmit={this.props.onNextStep}>
                        <TextArea
                            required
                            changeDebounceInterval={0}
                            className={textAreaClass}
                            label={
                                this.props.intl.formatMessage({id: 'teacherRegistration.howUseScratch'})
                            }
                            name="useScratch"
                            validationErrors={{
                                maxLength: this.props.intl.formatMessage({
                                    id: 'teacherRegistration.useScratchMaxLength'
                                })
                            }}
                            validations={{
                                maxLength: this.props.maxCharacters
                            }}
                            onChange={this.handleTyping}
                        />
                        <CharCount
                            currentCharacters={this.state.characterCount}
                            maxCharacters={this.props.maxCharacters}
                        />
                        <NextStepButton
                            text={<intl.FormattedMessage id="registration.nextStep" />}
                            waiting={this.props.waiting}
                        />
                    </Form>
                </Card>
                <StepNavigation
                    active={this.props.activeStep}
                    steps={this.props.totalSteps - 1}
                />
            </Slide>
        );
    }
}

UseScratchStep.propTypes = {
    activeStep: PropTypes.number,
    intl: intlShape,
    maxCharacters: PropTypes.number,
    onNextStep: PropTypes.func,
    totalSteps: PropTypes.number,
    waiting: PropTypes.bool
};

UseScratchStep.defaultProps = {
    maxCharacters: 300,
    waiting: false
};

const IntlUseScratchStep = injectIntl(UseScratchStep);


/*
 * EMAIL STEP
 */
class EmailStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCaptchaError',
            'handleCaptchaLoad',
            'handleCaptchaSolved',
            'handleValidSubmit',
            'setCaptchaRef'
        ]);
        this.state = {
            waiting: false
        };
    }
    handleCaptchaLoad () {
        this.setState({
            waiting: true
        });
    }
    handleCaptchaSolved (token) {
        this.setState({
            waiting: false
        });
        this.formData['g-recaptcha-response'] = token;
        this.setState({'g-recaptcha-response': token});
        this.props.onNextStep(this.formData);
    }
    handleCaptchaError () {
        this.props.setRegistrationError(
            this.props.intl.formatMessage({id: 'registration.errorCaptcha'}));
    }
    setCaptchaRef (ref) {
        this.captchaRef = ref;
    }
    handleValidSubmit (formData, reset, invalidate) {
        this.setState({waiting: true});
        api({
            host: '',
            uri: '/accounts/check_email/',
            params: {email: formData.user.email}
        }, (err, res) => {
            this.setState({
                waiting: false
            });

            if (err) return invalidate({all: err});
            res = res[0];
            switch (res.msg) {
            case 'valid email':
                this.formData = formData;
                return this.captchaRef.executeCaptcha();
            default:
                return invalidate({'user.email': res.msg});
            }
        });
    }
    render () {
        return (
            <Slide className="registration-step email-step">
                <h2>
                    <intl.FormattedMessage id="teacherRegistration.emailStepTitle" />
                </h2>
                <p className="description">
                    <intl.FormattedMessage id="teacherRegistration.emailStepDescription" />
                    <Tooltip
                        tipContent={
                            this.props.intl.formatMessage({id: 'registration.nameStepTooltip'})
                        }
                        title={'?'}
                    />
                </p>
                <Card>
                    <Form onValidSubmit={this.handleValidSubmit}>
                        <Input
                            required
                            label={
                                this.props.intl.formatMessage({id: 'general.emailAddress'})
                            }
                            name="user.email"
                            type="text"
                            validationError={
                                this.props.intl.formatMessage({id: 'general.validationEmail'})
                            }
                            validations="isEmail"
                        />
                        <Input
                            required
                            label={this.props.intl.formatMessage({id: 'general.confirmEmail'})}
                            name="confirmEmail"
                            type="text"
                            validationErrors={{
                                equalsField: this.props.intl.formatMessage({id: 'general.validationEmailMatch'})
                            }}
                            validations="equalsField:user.email"
                        />
                        <Checkbox
                            help={null}
                            name="subscribe"
                            value={false}
                            valueLabel={
                                this.props.intl.formatMessage({id: 'registration.optIn'})
                            }
                        />
                        <GeneralError name="all" />
                        <NextStepButton
                            text={<intl.FormattedMessage id="registration.nextStep" />}
                            waiting={this.props.waiting}
                        />
                    </Form>
                </Card>
                <StepNavigation
                    active={this.props.activeStep}
                    steps={this.props.totalSteps - 1}
                />
                <Captcha
                    ref={this.setCaptchaRef}
                    onCaptchaError={this.handleCaptchaError}
                    onCaptchaLoad={this.handleCaptchaLoad}
                    onCaptchaSolved={this.handleCaptchaSolved}
                />
            </Slide>
        );
    }
}

EmailStep.propTypes = {
    activeStep: PropTypes.number,
    intl: intlShape,
    onNextStep: PropTypes.func,
    setRegistrationError: PropTypes.func,
    totalSteps: PropTypes.number,
    waiting: PropTypes.bool
};

EmailStep.defaultProps = {
    waiting: false
};

const IntlEmailStep = injectIntl(EmailStep);


/*
 * TEACHER APPROVAL STEP
 */
const TeacherApprovalStep = props => (
    <Slide className="registration-step last-step">
        <h2>
            <intl.FormattedMessage id="registration.lastStepTitle" />
        </h2>
        <p className="description">
            <intl.FormattedMessage id="registration.lastStepDescription" />
        </p>
        {props.confirmed || !props.email ?
            [] : (
                <Card className="confirm">
                    <h4><intl.FormattedMessage id="registration.confirmYourEmail" /></h4>
                    <p>
                        <intl.FormattedMessage id="registration.confirmYourEmailDescription" /><br />
                        <strong>{props.email}</strong>
                    </p>
                </Card>
            )
        }
        {props.invited ?
            <Card className="wait">
                <h4><intl.FormattedMessage id="registration.waitForApproval" /></h4>
                <p>
                    <intl.FormattedMessage id="registration.waitForApprovalDescription" />
                </p>
            </Card> : []
        }
        <Card className="resources">
            <h4><intl.FormattedMessage id="registration.checkOutResources" /></h4>
            <p>
                <intl.FormattedHTMLMessage id="registration.checkOutResourcesDescription" />
            </p>
        </Card>
    </Slide>
);

TeacherApprovalStep.propTypes = {
    confirmed: PropTypes.bool,
    email: PropTypes.string,
    invited: PropTypes.bool
};

TeacherApprovalStep.defaultProps = {
    confirmed: false,
    email: null,
    invited: false
};

const IntlTeacherApprovalStep = injectIntl(TeacherApprovalStep);


/*
 * CLASS INVITE NEW STUDENT STEP
 */
class ClassInviteNewStudentStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleNextStep'
        ]);
    }
    handleNextStep () {
        return this.props.onNextStep();
    }
    render () {
        return (
            <Slide className="registration-step class-invite-step">
                {this.props.waiting ? [
                    <Spinner key="spinner" />
                ] : [
                    <Avatar
                        className="invite-avatar"
                        key="avatar"
                        src={this.props.classroom.educator.profile.images['50x50']}
                    />,
                    <h2 key="username">{this.props.classroom.educator.username}</h2>,
                    <p
                        className="description"
                        key="description"
                    >
                        {this.props.intl.formatMessage({id: 'registration.classroomInviteNewStudentStepDescription'})}
                    </p>,
                    <Card key="card">
                        <div className="contents">
                            <h3>{this.props.classroom.title}</h3>
                            <img
                                className="class-image"
                                src={this.props.classroom.images['250x150']}
                            />
                        </div>
                        <NextStepButton
                            text={this.props.intl.formatMessage({id: 'general.getStarted'})}
                            waiting={this.props.waiting}
                            onClick={this.handleNextStep}
                        />
                    </Card>,
                    <StepNavigation
                        active={this.props.activeStep}
                        key="step"
                        steps={this.props.totalSteps - 1}
                    />
                ]}
            </Slide>
        );
    }
}

ClassInviteNewStudentStep.propTypes = {
    activeStep: PropTypes.number,
    classroom: PropTypes.shape({
        educator: PropTypes.shape({
            profile: PropTypes.object,
            username: PropTypes.string
        }),
        images: PropTypes.object,
        title: PropTypes.string
    }),
    intl: intlShape,
    onNextStep: PropTypes.func,
    totalSteps: PropTypes.number,
    waiting: PropTypes.bool
};

ClassInviteNewStudentStep.defaultProps = {
    waiting: false
};

const IntlClassInviteNewStudentStep = injectIntl(ClassInviteNewStudentStep);


/*
 * CLASS INVITE EXISTING STUDENT STEP
 */
class ClassInviteExistingStudentStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleNextStep'
        ]);
    }
    handleNextStep () {
        return this.props.onNextStep();
    }
    render () {
        return (
            <Slide className="registration-step class-invite-step">
                {this.props.waiting ? [
                    <Spinner key="spinner" />
                ] : [
                    <h2 key="username">{this.props.studentUsername}</h2>,
                    <p
                        className="description"
                        key="description"
                    >
                        {this.props.intl.formatMessage({
                            id: 'registration.classroomInviteExistingStudentStepDescription'
                        })}
                    </p>,
                    <Card key="card">
                        <div className="contents">
                            <h3>{this.props.classroom.title}</h3>
                            <img
                                className="class-image"
                                src={this.props.classroom.images['250x150']}
                            />
                            <p>{this.props.intl.formatMessage({id: 'registration.invitedBy'})}</p>
                            <p><strong>{this.props.classroom.educator.username}</strong></p>
                        </div>
                        <NextStepButton
                            text={this.props.intl.formatMessage({id: 'general.getStarted'})}
                            waiting={this.props.waiting}
                            onClick={this.handleNextStep}
                        />
                    </Card>,
                    <p key="logout">
                        <a onClick={this.props.onHandleLogOut}>
                            {this.props.intl.formatMessage({id: 'registration.notYou'})}
                        </a>
                    </p>,
                    <StepNavigation
                        active={this.props.activeStep}
                        key="step"
                        steps={this.props.totalSteps - 1}
                    />
                ]}
            </Slide>
        );
    }
}

ClassInviteExistingStudentStep.propTypes = {
    activeStep: PropTypes.number,
    classroom: PropTypes.shape({
        educator: PropTypes.shape({
            profile: PropTypes.object,
            username: PropTypes.string
        }),
        images: PropTypes.object,
        title: PropTypes.string
    }),
    intl: intlShape,
    onHandleLogOut: PropTypes.func,
    onNextStep: PropTypes.func,
    studentUsername: PropTypes.string,
    totalSteps: PropTypes.number,
    waiting: PropTypes.bool
};

ClassInviteExistingStudentStep.defaultProps = {
    classroom: null,
    onHandleLogOut: () => {},
    studentUsername: null,
    waiting: false
};

const IntlClassInviteExistingStudentStep = injectIntl(ClassInviteExistingStudentStep);


/*
 * CLASS WELCOME STEP
 */
const ClassWelcomeStep = props => (
    <Slide className="registration-step class-welcome-step">
        {props.waiting ? [
            <Spinner key="spinner" />
        ] : [
            <h2 key="title">
                {props.intl.formatMessage({id: 'registration.welcomeStepTitle'})}
            </h2>,
            <p
                className="description"
                key="description"
            >
                {props.intl.formatMessage({id: 'registration.welcomeStepDescription'})}
            </p>,
            <Card key="card">
                {props.classroom ? (
                    <div className="contents">
                        <h3>{props.classroom.title}</h3>
                        <img
                            className="class-image"
                            src={props.classroom.images['250x150']}
                        />
                        <p>{props.intl.formatMessage({id: 'registration.welcomeStepPrompt'})}</p>
                    </div>
                ) : (
                    null
                )}
                <NextStepButton
                    text={
                        props.intl.formatMessage({id: 'registration.goToClass'})
                    }
                    waiting={props.waiting}
                    onClick={props.onNextStep}
                />
            </Card>
        ]}
    </Slide>
);

ClassWelcomeStep.propTypes = {
    classroom: PropTypes.shape({
        educator: PropTypes.shape({
            profile: PropTypes.object,
            username: PropTypes.string
        }),
        images: PropTypes.object,
        title: PropTypes.string
    }),
    intl: intlShape,
    onNextStep: PropTypes.func,
    waiting: PropTypes.bool
};

ClassWelcomeStep.defaultProps = {
    waiting: false
};

const IntlClassWelcomeStep = injectIntl(ClassWelcomeStep);


/*
 * REGISTRATION ERROR STEP
 */
const RegistrationError = props => (
    <Slide className="registration-step error-step">
        <h2>Something went wrong</h2>
        <Card>
            <h4>There was an error while processing your registration</h4>
            <p>
                {props.children}
            </p>
        </Card>
    </Slide>
);

RegistrationError.propTypes = {
    children: PropTypes.node
};

const IntlRegistrationError = injectIntl(RegistrationError);

module.exports.DEFAULT_COUNTRY = DEFAULT_COUNTRY;
module.exports.NextStepButton = NextStepButton;
module.exports.UsernameStep = IntlUsernameStep;
module.exports.ChoosePasswordStep = IntlChoosePasswordStep;
module.exports.DemographicsStep = IntlDemographicsStep;
module.exports.NameStep = IntlNameStep;
module.exports.OrganizationStep = IntlOrganizationStep;
module.exports.AddressStep = IntlAddressStep;
module.exports.UseScratchStep = IntlUseScratchStep;
module.exports.EmailStep = IntlEmailStep;
module.exports.TeacherApprovalStep = IntlTeacherApprovalStep;
module.exports.ClassInviteNewStudentStep = IntlClassInviteNewStudentStep;
module.exports.ClassInviteExistingStudentStep = IntlClassInviteExistingStudentStep;
module.exports.ClassWelcomeStep = IntlClassWelcomeStep;
module.exports.RegistrationError = IntlRegistrationError;

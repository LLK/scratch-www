const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
import {Formik} from 'formik';
const {injectIntl, intlShape} = require('react-intl');
const emailValidator = require('email-validator');
const FormattedMessage = require('react-intl').FormattedMessage;

const JoinFlowStep = require('./join-flow-step.jsx');
const FormikInput = require('../../components/formik-forms/formik-input.jsx');
const FormikCheckbox = require('../../components/formik-forms/formik-checkbox.jsx');

require('./join-flow-steps.scss');

class EmailStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleValidSubmit',
            'validateEmailIfPresent',
            'validateForm',
            'setCaptchaRef',
            'captchaSolved'
        ]);
    }

    componentDidMount () {
        this.grecaptcha = window.grecaptcha;
        if (!this.grecaptcha) {
            // Captcha doesn't exist on the window. There must have been a
            // problem downloading the script. There isn't much we can do about it though.
            // TODO: put up the error screen when we have it.
            return;
        }
        // TODO: Add in error callback for this once we have an error screen.
        this.widgetId = this.grecaptcha.render(this.captchaRef,
            {
                callback: this.captchaSolved,
                sitekey: ''
            },
            true);
    }

    validateEmailIfPresent (email) {
        if (!email) return null; // skip validation if email is blank; null indicates valid
        const isValidLocally = emailValidator.validate(email);
        if (isValidLocally) {
            return null; // TODO: validate email address remotely
        }
        return this.props.intl.formatMessage({id: 'registration.validationEmailInvalid'});
    }
    validateForm () {
        return {};
    }
    handleValidSubmit (formData, formikBag) {
        this.formData = formData;
        this.formikBag = formikBag;
        this.grecaptcha.execute(this.widgetId);
    }
    captchaSolved (token) {
        this.formData['g-recaptcha-response'] = token;
        this.formikBag.setSubmitting(false);
        this.props.onNextStep(this.formData);
    }
    setCaptchaRef (ref) {
        this.captchaRef = ref;
    }
    render () {
        return (
            <Formik
                initialValues={{
                    email: '',
                    subscribe: false
                }}
                validate={this.validateForm}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={this.handleValidSubmit}
            >
                {props => {
                    const {
                        errors,
                        handleSubmit,
                        isSubmitting,
                        setFieldError,
                        validateField
                    } = props;
                    return (
                        <JoinFlowStep
                            description={this.props.intl.formatMessage({id: 'registration.emailStepDescription'})}
                            footerContent={(
                                <FormattedMessage
                                    id="registration.acceptTermsOfUse"
                                    values={{
                                        touLink: (
                                            <a
                                                className="join-flow-link"
                                                href="/terms_of_use"
                                                target="_blank"
                                            >
                                                <FormattedMessage id="general.termsOfUse" />
                                            </a>
                                        )
                                    }}
                                />
                            )}
                            headerImgSrc="/images/join-flow/email-header.png"
                            innerClassName="join-flow-inner-email-step"
                            nextButton={this.props.intl.formatMessage({id: 'registration.createAccount'})}
                            title={this.props.intl.formatMessage({id: 'registration.emailStepTitle'})}
                            waiting={this.props.waiting || isSubmitting}
                            onSubmit={handleSubmit}
                        >
                            <FormikInput
                                className={classNames(
                                    'join-flow-input',
                                    'join-flow-input-tall',
                                    {fail: errors.email}
                                )}
                                error={errors.email}
                                id="email"
                                name="email"
                                placeholder={this.props.intl.formatMessage({id: 'general.emailAddress'})}
                                validate={this.validateEmail}
                                validationClassName="validation-full-width-input"
                                /* eslint-disable react/jsx-no-bind */
                                onBlur={() => validateField('email')}
                                onFocus={() => setFieldError('email', null)}
                                /* eslint-enable react/jsx-no-bind */
                            />
                            <div className="join-flow-email-checkbox-row">
                                <FormikCheckbox
                                    id="subscribeCheckbox"
                                    label={this.props.intl.formatMessage({id: 'registration.receiveEmails'})}
                                    name="subscribe"
                                />
                            </div>
                            <div
                                className="g-recaptcha"
                                data-badge="inline"
                                data-sitekey=""
                                data-size="invisible"
                                ref={this.setCaptchaRef}
                            />
                        </JoinFlowStep>
                    );
                }}
            </Formik>
        );
    }
}

EmailStep.propTypes = {
    intl: intlShape,
    onNextStep: PropTypes.func,
    waiting: PropTypes.bool
};


module.exports = injectIntl(EmailStep);

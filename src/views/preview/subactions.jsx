const FormattedDate = require('react-intl').FormattedDate;
const PropTypes = require('prop-types');
const React = require('react');
const FlexRow = require('../../components/flex-row/flex-row.jsx');

const Button = require('../../components/forms/button.jsx');
const AddToStudioModal = require('../../components/modal/addtostudio/container.jsx');
const ReportModal = require('../../components/modal/report/modal.jsx');

require('./subactions.scss');

const Subactions = props => (
    <FlexRow className="subactions">
        <div className="share-date">
            <div className="copyleft">&copy;</div>
            {' '}
            {/*  eslint-disable react/jsx-sort-props */}
            {props.shareDate === null ?
                'Unshared' :
                <FormattedDate
                    value={Date.parse(props.shareDate)}
                    day="2-digit"
                    month="short"
                    year="numeric"
                />
            }
            {/*  eslint-enable react/jsx-sort-props */}
        </div>
        <FlexRow className="action-buttons">
            {props.canAddToStudio &&
                <React.Fragment>
                    <Button
                        className="action-button studio-button"
                        key="add-to-studio-button"
                        onClick={props.onAddToStudioClicked}
                    >
                        Add to Studio
                    </Button>,
                    <AddToStudioModal
                        isOpen={props.addToStudioOpen}
                        key="add-to-studio-modal"
                        studios={props.studios}
                        onRequestClose={props.onAddToStudioClosed}
                        onToggleStudio={props.onToggleStudio}
                    />
                </React.Fragment>
            }
            <Button className="action-button copy-link-button">
              Copy Link
            </Button>
            {(props.canReport) &&
            <React.Fragment>
                <Button
                    className="action-button report-button"
                    key="report-button"
                    onClick={props.onReportClicked}
                >
                    Report
                </Button>,
                <ReportModal
                    isOpen={props.reportOpen}
                    key="report-modal"
                    type="project"
                    onReport={props.onReportSubmit}
                    onRequestClose={props.onReportClose}
                />
            </React.Fragment>
            }
        </FlexRow>
    </FlexRow>
);

Subactions.propTypes = {
    addToStudioOpen: PropTypes.bool,
    canAddToStudio: PropTypes.bool,
    canReport: PropTypes.bool,
    onAddToStudioClicked: PropTypes.func,
    onAddToStudioClosed: PropTypes.func,
    onReportClicked: PropTypes.func.isRequired,
    onReportClose: PropTypes.func.isRequired,
    onReportSubmit: PropTypes.func.isRequired,
    onToggleStudio: PropTypes.func,
    reportOpen: PropTypes.bool,
    shareDate: PropTypes.string,
    studios: PropTypes.arrayOf(PropTypes.object)
};

module.exports = Subactions;

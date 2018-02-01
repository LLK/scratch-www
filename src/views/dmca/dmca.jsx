const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const InformationPage = require('../../components/informationpage/informationpage.jsx');

const Dmca = () => (
    <InformationPage title={'DMCA'}>
        <div className="inner info-inner">
            <p><FormattedMessage id="dmca.intro" /></p>
            <p>
                Copyright Agent / Mitchel Resnick<br />
                MIT Media Laboratory<br />
                77 Massachusetts Ave<br />
                Room E14-445A<br />
                Cambridge, MA 02139<br />
                Tel: (617) 253-9783
            </p>
            <p><FormattedMessage id="dmca.llkresponse" /></p>
            <p><FormattedMessage id="dmca.assessment" /></p>
            <p><FormattedMessage id="dmca.eyetoeye" /></p>
            <p><FormattedMessage id="dmca.afterfiling" /></p>
        </div>
    </InformationPage>
);

render(<Page><Dmca /></Page>, document.getElementById('app'));

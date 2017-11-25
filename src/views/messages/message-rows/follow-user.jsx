import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import React from 'react';

import SocialMessage from '../../../components/social-message/social-message.jsx';

var FollowUserMessage = React.createClass({
    type: 'FollowUserMessage',
    propTypes: {
        followerUsername: React.PropTypes.string.isRequired,
        followDateTime: React.PropTypes.string.isRequired
    },
    render: function () {
        var profileLink = '/users/' + this.props.followerUsername; + '/';
        
        var classes = classNames(
            'mod-follow-user',
            this.props.className
        );
        return (
            <SocialMessage
                className={classes}
                datetime={this.props.followDateTime}
                iconSrc="/svgs/messages/follow.svg"
                iconAlt="follow notification image"
            >
                <FormattedMessage
                    id='messages.followText'
                    values={{
                        profileLink: <a
                            href={profileLink}
                            className="social-messages-profile-link"
                        >
                            {this.props.followerUsername}
                        </a>
                    }}
                />
            </SocialMessage>
        );
    }
});

export default FollowUserMessage;

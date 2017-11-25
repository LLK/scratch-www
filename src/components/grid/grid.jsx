import classNames from 'classnames';
import React from 'react';

import Thumbnail from '../thumbnail/thumbnail.jsx';
import FlexRow from '../flex-row/flex-row.jsx';

require('./grid.scss');

var Grid = React.createClass({
    type: 'Grid',
    getDefaultProps: function () {
        return {
            items: require('./grid.json'),
            itemType: 'projects',
            showLoves: false,
            showFavorites: false,
            showRemixes: false,
            showViews: false,
            showAvatar: false
        };
    },
    render: function () {
        var classes = classNames(
            'grid',
            this.props.className
        );
        return (
            <div className={classes}>
                <FlexRow>
                    {this.props.items.map(function (item, key) {
                        var href = '/' + this.props.itemType + '/' + item.id + '/';

                        if (this.props.itemType == 'projects') {
                            return (
                                <Thumbnail key={key}
                                           showLoves={this.props.showLoves}
                                           showFavorites={this.props.showFavorites}
                                           showRemixes={this.props.showRemixes}
                                           showViews={this.props.showViews}
                                           showAvatar={this.props.showAvatar}
                                           type={'project'}
                                           href={href}
                                           title={item.title}
                                           src={item.image}
                                           avatar={'https://cdn2.scratch.mit.edu/get_image/user/'
                                               + item.author.id + '_32x32.png'}
                                           creator={item.author.username}
                                           loves={item.stats.loves}
                                           favorites={item.stats.favorites}
                                           remixes={item.stats.remixes}
                                           views={item.stats.views}  />
                            );
                        }
                        else {
                            return (
                                <Thumbnail key={key}
                                           type={'gallery'}
                                           href={href}
                                           title={item.title}
                                           src={item.image}
                                           owner={item.owner}  />
                            );
                        }
                    }.bind(this))}
                </FlexRow>
            </div>
        );
    }
});

export default Grid;

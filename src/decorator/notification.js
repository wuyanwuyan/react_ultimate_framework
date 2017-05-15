import React from 'react';
import NotificationSystem from 'react-notification-system';

const notification = Component =>
    class NotificationComponent extends React.Component {

        _addNotification = (message, level = 'success') => {
          this._notificationSystem.addNotification({
            message,
            level,
            autoDismiss: 3,
          });
        }

        render() {
            const props = this.props;

            return (
                <div>
                    <NotificationSystem ref={ref => this._notificationSystem = ref} />
                    <Component
                        {...props}
                        addNotification={this._addNotification} />
                </div>
            )
        }
    }

export default notification;

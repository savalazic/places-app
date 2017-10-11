import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

class AdminSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'events',
    };
  }

  render() {
    return (
      <div className="admin-sidebar">
        <h3>Dashboard</h3>
        <FlatButton
          label="Events"
          fullWidth
          // className={`sidebar-btn ${this.state.active === 'events' ? 'active' : ''}`}
          onClick={this.props.getEventsView}
        />
        <FlatButton
          label="Places"
          fullWidth
          // className={`sidebar-btn ${this.state.active === 'places' ? 'active' : ''}`}
          onClick={this.props.getPlacesView}
        />
      </div>
    );
  }
}

export default AdminSidebar;

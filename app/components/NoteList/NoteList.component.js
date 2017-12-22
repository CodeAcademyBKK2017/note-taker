import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './NoteList.style.js';
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

class NoteList extends Component {
  keyExtractor = (item) => item.uuid;
  renderItem = ({item}) => <TouchableOpacity onPress={this.showAlert(item)}><View><Text style={styles.title}>{item.title}</Text><Text style={styles.content}>{item.content}</Text></View></TouchableOpacity>;
  showAlert = (item) => () => Alert.alert(item.title, item.content)

  render () {
    return (
      <FlatList data={this.props.notes}
        extraData={this.props.state}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.array,
  state: PropTypes.object
};
NoteList.defaultProps = {
  notes: [],
  state: {}
};

export default NoteList;
import { Text, StyleSheet } from 'react-native';

const AppText = ({  title }) => {
  return <Text style={styles.text}>{title}</Text>;


}

const styles = StyleSheet.create({
  text: {
    color: '#fff', 
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default AppText;
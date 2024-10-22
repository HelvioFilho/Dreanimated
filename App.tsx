import {StyleSheet, View} from 'react-native';
import {Sentence} from './src/component/Sentence';

export default function App() {
  return (
    <View style={styles.container}>
      <Sentence style={styles.sentence}>
        This is an awesome Live streaming session
      </Sentence>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentence: {
    fontSize: 52,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});

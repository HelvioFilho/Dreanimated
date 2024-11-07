import {StyleSheet, View} from 'react-native';
import {Sentences} from '../components/Sentences';
import {useState} from 'react';

const randomSentences = [
  'Hello, world!',
  'I love React Native!',
  'I love TypeScript!',
  `I'm a good javascript developer!`,
  'What do you think about React Native?',
  'I love React Native Reanimated and this is a live stream!',
];

async function wait(time: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export function AnimatedSentences() {
  const [index, setIndex] = useState(0);
  const [sentence, setSentence] = useState(randomSentences[index]);

  return (
    <View style={styles.container}>
      <Sentences
        style={{
          fontSize: 52,
          lineHeight: 52 * 1.1,
          fontWeight: '900',
          textTransform: 'uppercase',
          letterSpacing: -2,
        }}
        onEnterFinish={async wordCount => {
          await wait((60 * 1000 * wordCount) / 200);
          setSentence('');
        }}
        onExitFinish={async () => {
          const nextIndex = (index + 1) % randomSentences.length;
          setIndex(nextIndex);
          await wait(1000);
          setSentence(randomSentences[nextIndex]);
        }}>
        {sentence}
      </Sentences>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
});

import {TextProps, View} from 'react-native';
import Animated, {SlideInDown, FadeOut} from 'react-native-reanimated';

export function Sentence({children, ...rest}: TextProps) {
  if (typeof children !== 'string') {
    throw new Error('Sentence component only accepts string');
  }

  const words = children.split(' ');
  const fontSize = rest.style?.fontSize ?? 16;
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 4}}>
      {words.map((word, index) => (
        <Animated.Text
          key={`word-${word}-index-${index}`}
          entering={SlideInDown.springify().damping(80).stiffness(200)}
          exiting={FadeOut.springify().damping(80).stiffness(200)}
          {...rest}>
          {word}
        </Animated.Text>
      ))}
    </View>
  );
}

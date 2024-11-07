import {memo} from 'react';
import {StyleSheet, TextProps, View} from 'react-native';
import Animated, {FadeOut, runOnJS, SlideInDown} from 'react-native-reanimated';

type SentencesProps = TextProps & {
  children: React.ReactNode;
  stagger?: number;
  onEnterFinish?: (wordCount: number) => void;
  onExitFinish?: () => void;
};

export const Sentences = memo(
  ({
    children,
    stagger = 100,
    onEnterFinish,
    onExitFinish,
    ...rest
  }: SentencesProps) => {
    if (typeof children !== 'string') {
      throw new Error('O componente sentences deve receber uma string');
    }

    const words = children.split(' ');
    const fontSize = rest.style?.fontSize ?? 16;
    // const fontSize = 10;

    return (
      <View style={styles.container} key={children}>
        {words.map((word, index) => (
          <View
            key={`word-${word}-${index}`}
            style={{
              height: fontSize,
              overflow: 'hidden',
            }}>
            <Animated.Text
              entering={SlideInDown.springify()
                .damping(80)
                .stiffness(200)
                .delay(index * stagger)
                .withInitialValues({originY: fontSize * 1.2})
                .withCallback(finished => {
                  if (
                    finished &&
                    index === words.length - 1 &&
                    onEnterFinish &&
                    children !== ''
                  ) {
                    runOnJS(onEnterFinish)(words.length);
                  }
                })}
              exiting={FadeOut.springify()
                .damping(80)
                .stiffness(200)
                .withCallback(finished => {
                  if (
                    finished &&
                    index === words.length - 1 &&
                    onExitFinish &&
                    children !== ''
                  ) {
                    runOnJS(onExitFinish)();
                  }
                })}
              {...rest}>
              {word}
            </Animated.Text>
          </View>
        ))}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
});

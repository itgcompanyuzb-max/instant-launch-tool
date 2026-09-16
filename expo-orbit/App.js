import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
  PanResponder,
  SafeAreaView,
  Easing,
} from 'react-native';
import * as Haptics from 'expo-haptics';

const TRACK_PADDING = 6;
const THUMB = 56;

export default function App() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [trackWidth, setTrackWidth] = useState(300);

  const dragX = useRef(new Animated.Value(0)).current;
  const shake = useRef(new Animated.Value(0)).current;
  const jitter = useRef(new Animated.Value(0)).current;
  const lastTickRef = useRef(0);
  const jitterLoopRef = useRef(null);

  const maxDrag = Math.max(trackWidth - THUMB - TRACK_PADDING * 2, 80);

  const isValid = () =>
    login.trim().toLowerCase() === 'sardor' &&
    password.trim().toLowerCase() === 'sardor';

  // "trrrrrrr" — iPhone budilnik vaqtini surgandagidek: har 6px da mayda tick
  const dragTick = (x) => {
    if (Math.abs(x - lastTickRef.current) >= 6) {
      lastTickRef.current = x;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  // "tk-tk-tk-tk" xato vibratsiyasi
  const errorHaptic = async () => {
    for (let i = 0; i < 4; i++) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      await new Promise((r) => setTimeout(r, 70));
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const startJitter = () => {
    jitterLoopRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(jitter, { toValue: 1, duration: 45, useNativeDriver: true }),
        Animated.timing(jitter, { toValue: -1, duration: 45, useNativeDriver: true }),
      ])
    );
    jitterLoopRef.current.start();
  };

  const stopJitter = () => {
    jitterLoopRef.current?.stop();
    jitter.setValue(0);
  };

  const failAnimation = () => {
    startJitter();
    Animated.sequence([
      Animated.timing(shake, { toValue: 1, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -1, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 1, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
    Animated.timing(dragX, {
      toValue: 0,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setError('');
      stopJitter();
    }, 1600);
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        lastTickRef.current = 0;
        Haptics.selectionAsync();
      },
      onPanResponderMove: (_, g) => {
        const x = Math.max(0, Math.min(g.dx, maxDrag));
        dragX.setValue(x);
        dragTick(x);
      },
      onPanResponderRelease: (_, g) => {
        const x = Math.max(0, Math.min(g.dx, maxDrag));
        if (x >= maxDrag * 0.85) {
          if (isValid()) {
            Animated.timing(dragX, {
              toValue: maxDrag,
              duration: 120,
              useNativeDriver: true,
            }).start();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setDone(true);
          } else {
            setError('Login yoki parol xato');
            errorHaptic();
            failAnimation();
          }
        } else {
          Animated.spring(dragX, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  const shakeX = shake.interpolate({ inputRange: [-1, 1], outputRange: [-10, 10] });
  const jitterX = jitter.interpolate({ inputRange: [-1, 1], outputRange: [-3, 3] });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.card}>
        <Text style={styles.title}>Orbit LMS</Text>
        <Text style={styles.subtitle}>Vibratsiya demo (Expo Go)</Text>

        <TextInput
          style={styles.input}
          placeholder="Login (masalan: sardor)"
          placeholderTextColor="#8b93a7"
          autoCapitalize="none"
          value={login}
          onChangeText={setLogin}
        />
        <TextInput
          style={styles.input}
          placeholder="Parol (masalan: sardor)"
          placeholderTextColor="#8b93a7"
          autoCapitalize="none"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Animated.View
          onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
          style={[
            styles.track,
            error && styles.trackError,
            done && styles.trackDone,
            { transform: [{ translateX: shakeX }] },
          ]}
        >
          <Text style={styles.trackLabel}>
            {done ? 'Kirildi' : "Boshlash uchun o'ngga suring"}
          </Text>
          <Animated.View
            {...pan.panHandlers}
            style={[
              styles.thumb,
              error && styles.thumbError,
              done && styles.thumbDone,
              {
                transform: [
                  { translateX: Animated.add(dragX, error ? jitterX : 0) },
                ],
              },
            ]}
          >
            <Text style={styles.thumbText}>{error ? '✕' : done ? '✓' : '›'}</Text>
          </Animated.View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0b1020', justifyContent: 'center' },
  card: { paddingHorizontal: 24 },
  title: { color: '#fff', fontSize: 30, fontWeight: '800', marginBottom: 4 },
  subtitle: { color: '#8b93a7', fontSize: 14, marginBottom: 24 },
  input: {
    backgroundColor: '#151b31',
    color: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    fontSize: 16,
  },
  error: { color: '#ff5a5a', marginBottom: 12, fontWeight: '600' },
  track: {
    height: THUMB + TRACK_PADDING * 2,
    borderRadius: 40,
    backgroundColor: '#151b31',
    borderWidth: 1,
    borderColor: '#242c48',
    justifyContent: 'center',
    padding: TRACK_PADDING,
  },
  trackError: { borderColor: '#ff5a5a', backgroundColor: '#2a1220' },
  trackDone: { borderColor: '#22c55e' },
  trackLabel: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#8b93a7',
    fontSize: 15,
  },
  thumb: {
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
    backgroundColor: '#4f7cff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbError: { backgroundColor: '#ff3b30' },
  thumbDone: { backgroundColor: '#22c55e' },
  thumbText: { color: '#fff', fontSize: 24, fontWeight: '700' },
});

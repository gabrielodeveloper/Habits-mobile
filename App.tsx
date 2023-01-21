import './src/lib/dayjs';

import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter';
import { Loading } from './src/components/Loding';
import { Home } from './src/screens/Home';

export default function App() {
  const [fontsLoded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  if (!fontsLoded) {
    return <Loading />
  }

  return (
    <>
      <Home />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </>
  );
}


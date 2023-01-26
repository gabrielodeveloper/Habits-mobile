import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import colors from "tailwindcss/colors";
import Animated, { ZoomOut, ZoomIn } from "react-native-reanimated";

interface Props extends TouchableOpacityProps {
  checked?: boolean;
  title: string;
}

export function CheckBox({ title, checked = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      {
        checked ?
          <Animated.View 
          className="w-8 h-8 bg-green-600 rounded-lg items-center justify-center"
            entering={ZoomIn}
            exiting={ZoomOut}
          >
            <Feather
              name="check"
              size={20}
              color={colors.white}
            />
          </Animated.View>
          :
          <View className="w-8 h-8 rounded-lg bg-zinc-900" />
      }

      <Text className=" font-semibold text-white text-base ml-3 text:line-through">
        {title}
      </Text> 
    </TouchableOpacity>
  )
}
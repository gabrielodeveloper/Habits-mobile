import { ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";

interface Params {
  date: string;
}

export function Habit() {
  const route = useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const dayOfweek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="font-semibold text-zinc-400 text-base mt-4 mb-2 lowercase">
          {dayOfweek}
        </Text>

        <Text className="font-extrabold text-white mb-4 text-[32px]">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={75} />

        <View className="mt-6">
        <CheckBox 
        title="Estudar 2h por dia"
        checked 
        />

        <CheckBox 
          title="Beber Água" 
        />

          
        </View>

      </ScrollView>
    </View>
  )
}
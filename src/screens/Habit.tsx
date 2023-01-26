import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import dayjs from "dayjs";
import clsx from "clsx";

import { api } from "../lib/axios";

import { HabitsEmpty } from "../components/HabitsEmpty";
import { ProgressBar } from "../components/ProgressBar";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { Loading } from "../components/Loading";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";

interface Params {
  date: string;
}

interface HabitsInfo {
  completedHabits: string[];
  possibleHabits: {
    id: string;
    title: string;
  }[]
}

export function Habit() {
  const [loading, setLoading] = useState(true);
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo | null>(null);
  const [completedHabits, setCompletedHabits ] = useState<string[]>([]);

  const route = useRoute();
  const { date } = route.params as Params;
  const parsedDate = dayjs(date);
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date());
  
  const dayOfweek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  const habitsProgress = habitsInfo?.possibleHabits.length ? generateProgressPercentage(habitsInfo.possibleHabits.length, completedHabits.length) : 0;

  async function fetchHabits() {
    try {
      setLoading(true);

      const response = await api.get('day', { params: { date } });
      setHabitsInfo(response.data);
      setCompletedHabits(response.data.completedHabits);

    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não foi possível carregar os hábitos.');
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleHabits(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`);

      if(completedHabits.includes(habitId)) {
        setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId));
      }else {
        setCompletedHabits(prevState => [...prevState, habitId]);
      } 
      
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não foi possível atualizar o status do hábito.')
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) {
    return (
      <Loading />
    )
  }

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
        <ProgressBar progress={habitsProgress} />

        <View className={clsx("mt-6", {
          ['opacity-50']: isDateInPast
        })}>
          {
            habitsInfo?.possibleHabits ? 
            habitsInfo?.possibleHabits.map(habit => (
              <CheckBox
                key={habit.id}
                title={habit.title}
                checked={completedHabits.includes(habit.id)}
                onPress={() => handleToggleHabits(habit.id)}
                disabled={isDateInPast}
              />
            )) : <HabitsEmpty />
          }

        </View>
            {
              isDateInPast && (
                <Text className="text-zinc-400 text-base  mt-10 text-center">
                  Você não pode editar hábitos em datas passada.
                </Text>
              )
            }
      </ScrollView>
    </View>
  )
}
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";

import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";

import { api } from "../lib/axios";

import colors from "tailwindcss/colors";

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export function New() {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDays(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex]);
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        return Alert.alert('Novo Hábito', 'Informe o nome do hábito e escolha a periodicidade.');
      }

      await api.post('/habits', { title, weekDays });

      setTitle('');
      setWeekDays([]);

      Alert.alert('Novo hábito', 'Hábito criado com sucesso!');
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível criar o novo hábito!');
      console.log(error);
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <BackButton />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput
          onChangeText={setTitle}
          value={title}
          placeholder="Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 focus:border-zinc-800"
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrêcia?
        </Text>

        {
          availableWeekDays.map((weekDay, index) => (
            <CheckBox
              key={weekDay}
              title={weekDay}
              checked={weekDays.includes(index)}
              onPress={() => handleToggleWeekDays(index)}
            />
          ))
        }

        <TouchableOpacity
          onPress={handleCreateNewHabit}
          className="w-full h-14 flex-row mt-6 bg-green-600 rounded-lg items-center justify-center"
          activeOpacity={0.7}
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />

          <Text className="font-semibold text-base text-white ml-3">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
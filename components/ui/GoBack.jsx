import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import tw from "../../utils/tailwind";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../utils/constants";

const GoBack = ({ style }) => {
  const router = useRouter();
  return (
    <TouchableOpacity style={tw.style(" items-center justify-center ")} onPress={router.back}>
      <Feather name="chevron-left" size={32} color={COLORS.borderbgColor} />
    </TouchableOpacity>
  );
};

export default GoBack;

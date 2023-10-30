import { Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../utils/constants";
import tw from "../../utils/tailwind";

const Button = ({ onPress, text, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={tw`elevation w-full h-12 bg-[${COLORS.buttonbgColor}] items-center justify-center`}
    >
      <Text style={tw`text-base text-[${COLORS.bgWhite}]`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

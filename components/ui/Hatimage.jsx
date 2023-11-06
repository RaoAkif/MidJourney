import { Image } from "react-native";
import hat1 from "../../assets/thinking_cap1.png";
import hat2 from "../../assets/thinking_cap2.png";
import hat3 from "../../assets/thinking_cap3.png";
import hat4 from "../../assets/thinking_cap4.png";
import hat5 from "../../assets/thinking_cap5.png";
import hat6 from "../../assets/thinking_cap6.png";

const hats = [0, hat1, hat2, hat3, hat4, hat5, hat6];

const Hatimage = ({ style, hat }) => {
  return <Image style={style} source={hats[hat]} />;
};

export default Hatimage;

import { View, Text } from "react-native";
import React from "react";
import { Modal } from "react-native";
import { ActivityIndicator } from "react-native";
import { useGetStoriesByUserId } from "../../utils/api/storiesHook";
import tw from "../../utils/tailwind";

const UserModal = ({ userId, visible, modelControl }) => {
  if (userId == 0) {
    return;
  }
  const { data: user, error, isLoading } = useGetStoriesByUserId(userId);

  return (
    <Modal animationType="fade" visible={visible} transparent={true} statusBarTranslucent={true}>
      <View style={tw.style("flex-1 justify-center items-center bg-opacity-25 bg-black ")}>
        <View style={tw.style("w-52 py-4 m-5 bg-white rounded-md justify-center items-center elevation")}>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : error ? (
            <Text>An error occurred: {error.message}</Text>
          ) : (
            <>
              <View style={tw`flex-1 w-full justify-center items-center`}>
                <View>
                  <Text>{user?.pseudonym}</Text>
                </View>
                <View>
                  <View>
                    {/* <Text>{user?._count.prompt}</Text> */}
                    <Text onPress={() => navigation.navigate("myStories")}>Stories Created</Text>
                  </View>
                  <View>
                    {/* <Text>{user?._count.response}</Text> */}
                    <Text onPress={() => navigation.navigate("myCollaborations")}>Stories Collaborated</Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default UserModal;

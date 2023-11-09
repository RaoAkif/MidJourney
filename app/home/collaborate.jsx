import { View, Text, TextInput, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";
import tw from "../../utils/tailwind";
import TopHatContainer from "../../components/ui/TopHatContainer";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import GoBack from "../../components/ui/GoBack";
import { Controller, useForm } from "react-hook-form";
import { useCreateCollaboration } from "../../utils/api/collaborationHook";
import { useGetStory } from "../../utils/api/storiesHook";
import { ActivityIndicator } from "react-native";
import LodingModal from "../../components/ui/LodingModal";

export default function Collaborate() {
  const params = useLocalSearchParams();
  const { id: userId } = useSelector((state) => state.auth.userInfo);
  const { mutate: addCollaboration, data, error, isPending } = useCreateCollaboration();

  const { data: selectedStory, isLoading: isLoadingStory } = useGetStory(params.storyId);
  let storyDescription = selectedStory?.description;
  selectedStory?.response?.map((resp) => (storyDescription = storyDescription + " " + resp.description));

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors: formError },
  } = useForm({
    defaultValues: {
      description: "",
      promptId: "",
      userId: "",
    },
  });
  const descriptionChars = watch("description").length;

  const minus = 1000 - storyDescription?.length;
  const maxColabChar = minus > 150 ? 150 : minus;

  const onSubmit = (data) => {
    addCollaboration({
      description: data.description,
      promptId: parseInt(selectedStory.id),
      userId: parseInt(userId),
    });

    reset();
  };

  return (
    <Container>
      <View style={tw`flex-row justify-center items-center`}>
        <GoBack />
        <TopHatContainer style={tw`flex-1 items-center -inset-x-4`} />
      </View>
      <View style={tw`flex-1 mt-3 mx-2 w-full`}>
        <ScrollView style={tw`w-full`} showsVerticalScrollIndicator={false}>
          <View style={tw`flex-1 w-full justify-center items-center mb-32 px-6`}>
            {isLoadingStory ? (
              <ActivityIndicator size="large" />
            ) : (
              selectedStory && (
                <>
                  <Card>
                    <View style={tw`w-full  p-1`}>
                      <Text style={tw` text-base text-[#333332] font-bold mb-2`}>{selectedStory.title}</Text>
                      <Text style={tw` text-base text-[#333332]`}>{storyDescription}</Text>
                      <Text style={tw` w-full text-right mt-2`}>{`${storyDescription.length}/1000`}</Text>
                    </View>
                  </Card>

                  <Card>
                    <View style={tw`w-full`}>
                      <Controller
                        name="description"
                        control={control}
                        rules={{
                          required: "Please write something to collaborate.",
                          maxLength: {
                            value: maxColabChar,
                            message: `Story should have max ${maxColabChar} characters`,
                          },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            style={tw`text-base pt-1 text-[#333332]`}
                            placeholderTextColor="#727272"
                            placeholder="Collaborate on the story above"
                            textAlignVertical="top"
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                      />
                      <Text style={tw` w-full text-right mt-2`}>{`${descriptionChars}/${maxColabChar}`}</Text>
                    </View>
                  </Card>
                  {formError.description && <Text style={tw`text-error mt-3`}>{formError.description.message}</Text>}
                  <Button onPress={handleSubmit(onSubmit)} text={"Collaborate"} />
                </>
              )
            )}
          </View>
        </ScrollView>
      </View>
      <LodingModal visible={isPending} text={"Collaborating"} />
    </Container>
  );
}

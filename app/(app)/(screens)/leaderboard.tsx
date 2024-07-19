// import { useAppSelector } from "../hooks/store";
import React from "react";
import InProgressBlock from "@/components/InProgressBlock/InProgressBlock";
// import InProgressBlock from "../components/InProgressBlock/InProgressBlock";
// import { View, Dimensions, ScrollView, Text, Image } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { AntDesign } from "@expo/vector-icons";
// import progressBarStyle from "./ModalLeaderboardScreenStyle";
// import LeaderboardScene from "../components/Leaderboard/SceneBlock/LeaderboardScene";

export default function Leaderboard(): React.JSX.Element {
    // const data = [
    //   {
    //     rank: 4,
    //     name: "John",
    //     surname: "Doe",
    //     school: "webtech",
    //     year: "N1",
    //     status: "up",
    //   },
    //   {
    //     rank: 5,
    //     name: "Jane",
    //     surname: "Smith",
    //     school: "escen",
    //     year: "N2",
    //     status: "down",
    //   },
    //   {
    //     rank: 6,
    //     name: "Bob",
    //     surname: "Johnson",
    //     school: "bachelor",
    //     year: "N3",
    //     status: "stay",
    //   },
    //   {
    //     rank: 7,
    //     name: "Amy",
    //     surname: "Williams",
    //     school: "atlas",
    //     year: "N4",
    //     status: "up",
    //   },
    //   {
    //     rank: 8,
    //     name: "Amy",
    //     surname: "Williams",
    //     school: "atlas",
    //     year: "N4",
    //     status: "up",
    //   },
    //   {
    //     rank: 9,
    //     name: "Amy",
    //     surname: "Williams",
    //     school: "atlas",
    //     year: "N4",
    //     status: "up",
    //   },
    //   {
    //     rank: 10,
    //     name: "Amy",
    //     surname: "Williams",
    //     school: "atlas",
    //     year: "N4",
    //     status: "up",
    //   },
    // ];

    // const userInfos = useAppSelector((state) => state.userInfos);
    // const urlImage =
    //   process.env.EXPO_PUBLIC_API_URL +
    //   "api/avatar-viewer/" +
    //   userInfos._id +
    //   "/" +
    //   userInfos.accessToken;
    // <Image style={progressBarStyle.firstAvatarImage} source={{ uri: urlImage }} />

    return (
        <>
            <InProgressBlock/>
            {/* <SafeAreaView edges={["bottom", "left", "right"]} style={progressBarStyle.container}>
        <LeaderboardScene />
        <View
          style={[
            progressBarStyle.containerBck,
            {
              height: (Dimensions.get("window").height * 3.5) / 7,
            },
          ]}
        >
          <View style={progressBarStyle.leaderBottom}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                marginHorizontal: Dimensions.get("window").width * 0.07,
                paddingVertical: Dimensions.get("window").width * 0.07,
              }}
            >
              {data.map((item, index) => (
                <View
                  style={[
                    progressBarStyle.containerItem,
                    index > 0 ? { marginTop: Dimensions.get("window").width * 0.07 } : {},
                    {
                      paddingVertical: Dimensions.get("window").width * 0.03,
                      paddingHorizontal: Dimensions.get("window").width * 0.03,
                    },
                  ]}
                  key={index}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View style={progressBarStyle.rank}>
                      <Text style={progressBarStyle.rankText}>{item.rank}</Text>
                      <View style={[progressBarStyle.rankPlace, progressBarStyle[`rankPlace__${item.status}`]]}>
                        {item.status === "stay" ? (
                          <AntDesign name="minus" size={15} color="black" style={progressBarStyle.textInfo} />
                        ) : item.status === "up" ? (
                          <AntDesign name="up" size={15} color="black" style={progressBarStyle.textInfo} />
                        ) : (
                          <AntDesign name="down" size={15} color="black" style={progressBarStyle.textInfo} />
                        )}
                      </View>
                    </View>
                    <View style={progressBarStyle.generalInfo}>
                      <Text style={[progressBarStyle.userName, progressBarStyle.textInfo]}>
                        {item.name} {item.surname}
                      </Text>
                      <Text style={[progressBarStyle.userInfo, progressBarStyle.textInfo]}>
                        {item.school} - {item.year}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text style={[progressBarStyle.userLevel, progressBarStyle.textInfo]}>lvl 10</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView> */}
        </>
    );
}

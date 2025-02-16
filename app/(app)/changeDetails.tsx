import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/libs/supabase";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function ChangeDetails() {
  const { user, userDetails, loading } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [fullname, setFullname] = useState(userDetails?.fullname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | null>(
    userDetails?.profile_photo || null
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpdate = async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      let profilePhotoUrl = userDetails?.profile_photo_url;

      if (image && image !== userDetails?.profile_photo) {
        const fileExt = image.split(".").pop();
        // Create folder structure with user ID
        const filePath = `${user.id}/${Math.random()}.${fileExt}`;

        const formData = new FormData();
        formData.append("file", {
          uri: image,
          name: filePath,
          type: `image/${fileExt}`,
        } as any);

        // Upload to the correct bucket
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("user_profile_photos")
          .upload(filePath, formData);

        if (uploadError) throw uploadError;

        // Get the public URL
        const { data } = await supabase.storage
          .from("user_profile_photos")
          .getPublicUrl(filePath);

        profilePhotoUrl = data.publicUrl;
      }

      // Update user details
      const updates = {
        ...(fullname ? { fullname } : {}),
        ...(profilePhotoUrl
          ? {
              profile_photo: profilePhotoUrl.split("/").pop(),
              profile_photo_url: profilePhotoUrl,
            }
          : {}),
      };

      const { error: updateError } = await supabase
        .from("users")
        .update(updates)
        .eq("id", user.id);

      if (updateError) throw updateError;

      // Update auth email/password if changed
      if (email !== user.email || password) {
        const { error: authError } = await supabase.auth.updateUser({
          ...(email !== user.email ? { email } : {}),
          ...(password ? { password } : {}),
        });

        if (authError) throw authError;
      }

      Alert.alert("Success", "Profile updated successfully");
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-6">Change Details</Text>

      <TouchableOpacity onPress={pickImage} className="items-center mb-6">
        {image ? (
          <Image source={{ uri: image }} className="w-24 h-24 rounded-full" />
        ) : (
          <View className="w-24 h-24 rounded-full bg-gray-200 items-center justify-center">
            <Text>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <View className="space-y-4">
        <View>
          <Text className="text-gray-600 mb-1">Full Name</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3"
            placeholder="Enter full name"
            value={fullname}
            onChangeText={setFullname}
          />
        </View>

        <View>
          <Text className="text-gray-600 mb-1">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3"
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View>
          <Text className="text-gray-600 mb-1">New Password</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3"
            placeholder="Enter new password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          onPress={handleUpdate}
          disabled={isLoading}
          className={`rounded-lg p-3 ${
            isLoading ? "bg-gray-400" : "bg-purple-600"
          }`}
        >
          <Text className="text-white text-center font-semibold">
            {isLoading ? "Updating..." : "Update Details"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

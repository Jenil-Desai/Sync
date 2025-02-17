import { User } from "@supabase/supabase-js";
import { supabase } from "@/libs/supabase";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserDetails {
  id: string;
  fullname: string;
  profile_photo: string;
  profile_photo_url: string;
  email: string;
}

type LoadingState = {
  user: null;
  userDetails: null;
  loading: true;
};

type LoadedState = {
  user: User;
  userDetails: UserDetails | null;
  loading: false;
};

type UserState = LoadingState | LoadedState;

const CACHE_KEY = "user_cache";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export const useUser = () => {
  const [state, setState] = useState<UserState>({
    user: null,
    userDetails: null,
    loading: true,
  });

  useEffect(() => {
    loadFromCache();
    fetchUserAndDetails();
    subscribeToUserChanges();

    return () => {
      supabase.channel("public:users").unsubscribe();
    };
  }, []);

  const loadFromCache = async () => {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const isExpired = Date.now() - timestamp > CACHE_DURATION;

        if (!isExpired && data.user) {
          setState({
            ...data,
            loading: false,
          });
        }
      }
    } catch (error) {
      console.error("Error loading from cache:", error);
    }
  };

  const updateCache = async (data: Omit<UserState, "loading">) => {
    try {
      await AsyncStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );
    } catch (error) {
      console.error("Error updating cache:", error);
    }
  };

  const fetchUserAndDetails = async () => {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        const newState = {
          user: null,
          userDetails: null,
          loading: true,
        } as LoadingState;
        setState(newState);
        await updateCache({ user: null, userDetails: null });
        return;
      }

      const { data: userDetails, error: detailsError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      const newState: LoadedState = {
        user,
        userDetails: detailsError ? null : userDetails,
        loading: false,
      };

      setState(newState);
      await updateCache({
        user,
        userDetails: detailsError ? null : userDetails,
      });
    } catch (error) {
      const newState: LoadingState = {
        user: null,
        userDetails: null,
        loading: true,
      };
      setState(newState);
      await updateCache({ user: null, userDetails: null });
    }
  };

  const subscribeToUserChanges = () => {
    supabase
      .channel("public:users")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "users",
          filter: `id=eq.${state.user?.id}`,
        },
        async (payload) => {
          if (payload.eventType === "UPDATE" && state.user) {
            const newState: LoadedState = {
              user: state.user,
              userDetails: payload.new as UserDetails,
              loading: false as const,
            };
            setState(newState);
            await updateCache({
              user: state.user,
              userDetails: payload.new as UserDetails,
            });
          }
        }
      )
      .subscribe();
  };

  return {
    ...state,
    refresh: fetchUserAndDetails,
  };
};

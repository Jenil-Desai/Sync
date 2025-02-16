import { User } from "@supabase/supabase-js";
import { supabase } from "@/libs/supabase";
import { useState, useEffect } from "react";

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

export const useUser = () => {
  const [state, setState] = useState<UserState>({
    user: null,
    userDetails: null,
    loading: true,
  });

  useEffect(() => {
    const fetchUserAndDetails = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          setState({ user: null, userDetails: null, loading: false });
          return;
        }

        const { data: userDetails, error: detailsError } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        setState({
          user,
          userDetails: detailsError ? null : userDetails,
          loading: false,
        });
      } catch (error) {
        setState({ user: null, userDetails: null, loading: false });
      }
    };

    fetchUserAndDetails();
  }, []);

  return state;
};

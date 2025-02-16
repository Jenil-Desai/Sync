import { User } from "@supabase/supabase-js";
import { supabase } from "@/libs/supabase";
import { useState, useEffect } from "react";

export const useUser = () => {
  type LoadingState = {
    user: null;
    loading: true;
  };

  type LoadedState = {
    user: User | null; // Changed to allow null for error cases
    loading: false;
  };

  type UserState = LoadingState | LoadedState;

  const [state, setState] = useState<UserState>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          setState({ user: null, loading: false });
          return;
        }

        setState({
          user: data.user,
          loading: false,
        });
      } catch (error) {
        setState({ user: null, loading: false });
      }
    };

    fetchUser();
  }, []);

  return state;
};

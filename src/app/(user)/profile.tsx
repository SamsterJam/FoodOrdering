import Button from '@/src/components/Button';
import { supabase } from '@/src/lib/supabase';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <Button
      text="Sign Out"
      onPress={() => {
        supabase.auth.signOut();
      }}
    />
  );
}

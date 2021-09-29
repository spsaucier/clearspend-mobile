import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, ActivityIndicator, Text, TextInput } from 'react-native'
import FetchOne from '@/Store/User/FetchOne'
import { useTranslation } from 'react-i18next'
import { UserState } from '@/Store/User'
import tw from '@/Styles/tailwind'
import { ProfileTabIcon } from '@/Assets/Icons'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileContainer = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const user = useSelector((state: { user: UserState }) => state.user.item)
  const fetchOneUserLoading = useSelector(
    (state: { user: UserState }) => state.user.fetchOne.loading,
  )
  const fetchOneUserError = useSelector(
    (state: { user: UserState }) => state.user.fetchOne.error,
  )

  const [userId, setUserId] = useState('1')

  const fetch = (id: string) => {
    setUserId(id)
    if (id) {
      dispatch(FetchOne.action(id))
    }
  }

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex p-5`}>
        <View style={tw`flex flex-col items-center`}>
          <ProfileTabIcon />
          {fetchOneUserLoading && <ActivityIndicator />}
          {fetchOneUserError ? (
            <Text style={tw`text-base text-error`}>
              {fetchOneUserError.message}
            </Text>
          ) : (
            <Text style={tw`text-base text-primary`}>
              {t('example.helloUser', { name: user.name })}
            </Text>
          )}
        </View>
        <View
          style={tw`flex-row items-center justify-center bg-primary px-3 my-3`}
        >
          <Text style={tw`flex px-3 text-white text-base`}>
            {t('example.labels.userId')}
          </Text>
          <TextInput
            onChangeText={text => fetch(text)}
            editable={!fetchOneUserLoading}
            keyboardType={'number-pad'}
            maxLength={1}
            value={userId}
            selectTextOnFocus
            style={tw`flex-1 border bg-white text-black h-8 text-center my-2`}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ProfileContainer

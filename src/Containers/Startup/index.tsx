import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import InitStartup from '@/Store/Startup/Init'
import { useTranslation } from 'react-i18next'
import { Brand } from '@/Components'
import tw from '@/Styles/tailwind'

const IndexStartupContainer = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(InitStartup.action())
  }, [dispatch])

  return (
    <View style={tw`flex-1 flex-col justify-center items-center bg-primary`}>
      <Brand />
      <ActivityIndicator size={'large'} style={tw`m-4`} />
      <Text style={tw`text-center text-white`}>{t('welcome')}</Text>
    </View>
  )
}

export default IndexStartupContainer

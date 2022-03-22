import React, { useRef, useState, useEffect } from 'react';
import { Image, useWindowDimensions, View, ViewToken } from 'react-native';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Pdf from 'react-native-pdf';
import tw from '@/Styles/tailwind';
import { DarkToLightGradient } from '@/Components/Svg/DarkToLightGradient';
import { ActivityIndicator } from '@/Components';
import { useReceiptUri } from '@/Queries';
import { detectMimeType, MediaType } from '@/Helpers/StringHelpers';

type CachedReceipt = {
  receiptId: string;
  image?: string;
  loading?: boolean;
};

type ViewReceiptCarouselProps = {
  receiptIds: string[];
  currentReceiptId: string;
  onCurrentReceiptChanged(id: string): void;
  onReceiptPress(): void;
};

const ViewReceiptCarousel = ({
  receiptIds,
  currentReceiptId,
  onCurrentReceiptChanged,
  onReceiptPress,
}: ViewReceiptCarouselProps) => {
  const dimens = useWindowDimensions();
  const { width: screenWidth, height: screenHeight } = dimens;

  const [localCurrentReceiptId, setCurrentReceiptId] = useState(currentReceiptId);
  const { data, status } = useReceiptUri('viewReceiptQuery', localCurrentReceiptId);

  const cachedInitialValue = receiptIds.map(
    (id: string) =>
      ({
        receiptId: id,
        image: undefined,
        loading: undefined,
      } as CachedReceipt),
  );
  const [cachedReceipts, setCachedReceipts] = useState<CachedReceipt[]>(cachedInitialValue);

  const onViewRef = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const nextItem = viewableItems.find((x) => x.isViewable);
    if (!nextItem) return;

    const nextId = nextItem.item.receiptId;

    setCurrentReceiptId(nextId);
    onCurrentReceiptChanged(nextId);
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  useEffect(() => {
    if (data && status === 'success') {
      const idx = cachedReceipts.findIndex((x) => x.receiptId === localCurrentReceiptId);
      const receipt = cachedReceipts[idx];
      if (!receipt.image) {
        const updated = { ...receipt, image: data, loading: false };
        cachedReceipts[idx] = updated;
        setCachedReceipts([...cachedReceipts]);
      }
    }
  }, [data, status, localCurrentReceiptId, cachedReceipts]);

  return (
    <View style={tw`absolute w-full h-full`}>
      <FlatList
        data={cachedReceipts}
        extraData={cachedReceipts}
        horizontal
        bounces={false}
        snapToInterval={screenWidth}
        snapToAlignment="center"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        canCancelContentTouches={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => {
              onReceiptPress();
            }}
            style={[
              tw`items-center justify-center`,
              {
                width: screenWidth,
                height: screenHeight,
              },
            ]}
          >
            {!item.image ? (
              <ActivityIndicator />
            ) : detectMimeType(item.image.contentType, item.image.data) === MediaType.image ? (
              <Image
                style={[tw`w-full h-full`, { resizeMode: 'contain' }]}
                source={{ uri: item.image.data }}
              />
            ) : (
              <Pdf
                source={{ uri: item.image.data }}
                style={{ flex: 1, width: dimens.width, height: dimens.height }}
              />
            )}
          </TouchableWithoutFeedback>
        )}
      />

      <DarkToLightGradient style={tw`absolute`} />
      <DarkToLightGradient style={tw`absolute bottom-0`} inverted />
      <View style={tw`mb-10 self-center flex-row absolute bottom-0`}>
        {receiptIds.length > 1 &&
          receiptIds?.map((rId: string) => (
            <View
              style={tw.style('rounded-full h-2, w-2 m-1', {
                backgroundColor: localCurrentReceiptId === rId ? 'white' : 'grey',
              })}
              key={rId}
            />
          ))}
      </View>
    </View>
  );
};

export default ViewReceiptCarousel;

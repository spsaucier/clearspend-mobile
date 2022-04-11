import React, { useRef, useState, useEffect } from 'react';
import { Image, useWindowDimensions, View, ViewToken } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Pdf from 'react-native-pdf';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  horizontalScrollEnabled: boolean;
};

const RenderReceiptItem = ({ item, gestureLocked }: any) => {
  const dimens = useWindowDimensions();
  const { width: screenWidth, height: screenHeight } = dimens;

  return (
    <View
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
        <View pointerEvents={gestureLocked ? 'none' : undefined}>
          <Pdf
            enableAntialiasing
            source={{ uri: item.image.data }}
            style={{
              flex: 1,
              width: screenWidth,
              height: screenHeight,
            }}
          />
        </View>
      )}
    </View>
  );
};

const ViewReceiptCarousel = ({
  receiptIds,
  currentReceiptId,
  onCurrentReceiptChanged,
  horizontalScrollEnabled,
}: ViewReceiptCarouselProps) => {
  const dimens = useWindowDimensions();
  const { width: screenWidth } = dimens;

  const [localCurrentReceiptId, setCurrentReceiptId] = useState(currentReceiptId);
  const { data, status } = useReceiptUri('viewReceiptQuery', localCurrentReceiptId);

  const pdfScrollHandler = useRef<any>();
  const horizontalScrollHandler = useRef<any>();

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
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50, minimumViewTime: 500 });

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
    <SafeAreaView style={tw`absolute w-full h-full`}>
      <FlatList
        data={cachedReceipts}
        extraData={cachedReceipts}
        horizontal
        removeClippedSubviews
        scrollEnabled={horizontalScrollEnabled}
        snapToInterval={screenWidth}
        snapToAlignment="center"
        decelerationRate="fast"
        keyExtractor={(value) => value.receiptId}
        showsHorizontalScrollIndicator={false}
        canCancelContentTouches={false}
        disableIntervalMomentum
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item }) => (
          <RenderReceiptItem item={item} gestureLocked={horizontalScrollEnabled} />
        )}
        simultaneousHandlers={pdfScrollHandler}
        ref={horizontalScrollHandler}
      />

      <DarkToLightGradient style={tw`absolute`} />
      <DarkToLightGradient style={tw`absolute bottom-0`} inverted />
      {horizontalScrollEnabled ? (
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
      ) : null}
    </SafeAreaView>
  );
};

export default ViewReceiptCarousel;

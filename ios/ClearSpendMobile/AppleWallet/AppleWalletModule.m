//
//  AppleWalletModule.h
//  ClearSpendMobile
//
//  Created by Rory O'Connor on 21/02/22.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(AppleWalletModule, RCTEventEmitter)

RCT_EXTERN_METHOD(supportedEvents)

RCT_EXTERN_METHOD(canAddPaymentPass: (NSString *)lastFour
                  resolver: (RCTPromiseResolveBlock *)resolve
                  rejecter:(RCTPromiseRejectBlock *)reject
                  )

RCT_EXTERN_METHOD(beginPushProvisioning: (NSDictionary *)options
                  accessToken:(NSString *)accessToken
                  cardId:(NSString *)cardId
                  )

@end
